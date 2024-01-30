// TicketController.ts
import { Request, Response } from 'express';
import prisma from '../connection';
import { transporterNodemailer } from '../utils/transportMailer';
import fs from 'fs';
import Handlebars from 'handlebars';


// Purchase Ticket
export const purchaseTicket = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId, userId, quantity, usePoints } = req.body;
        
        

        // Validate if user exists
        const userExists = await prisma.users.findUnique({ where: { id: userId } });
        if (!userExists) {
            throw res.status(404).send({ message: 'User not found' });
        }

        // Fetch the event to check available tickets and ticket price
        const event = await prisma.events.findUnique({ where: { id: eventId } });
        if (!event) {
            throw res.status(404).send({ message: 'Event not found' });
        }

        // Check if there are enough tickets available
        if (event.availableSeats < quantity) {
            throw res.status(400).send({ message: 'Not enough tickets available' });
        }

        // Calculate total price
        let totalPrice = event.price * quantity;


        if (userExists.discountEligible) {
            totalPrice *= 0.9; // Apply a 10% discount
        }
        if (usePoints) {
            const userPoints = userExists.totalPoints ?? 0; // Use nullish coalescing operator
            const pointsToUse = Math.min(userPoints, totalPrice); // Ensure we don't use more points than the totalPrice
            totalPrice -= pointsToUse; // Apply points as a discount
        
            // Update user's points balance
            await prisma.users.update({
                where: { id: userId },
                data: { totalPoints: userPoints - pointsToUse }
            });
        }

        // Create the ticket(s)
        const ticket = await prisma.tickets.create({
            data: {
                eventId,
                userId,
                quantity,
                totalPrice,
            }
        });

        // Update available seats
        await prisma.events.update({
            where: { id: eventId },
            data: { availableSeats: { decrement: quantity } }
        });

        // Send ticket email
        const template = fs.readFileSync('src/templateTicket.html', 'utf-8');
        let compiledTemplate: any = await Handlebars.compile(template);
        compiledTemplate = compiledTemplate({ id: ticket.id, username: userExists.username, eventName: event.name, quantity, totalPrice });

        await transporterNodemailer.sendMail({
            from: 'masdefry20@gmail.com',
            to: userExists.email,
            subject: 'Welcome!',
            html: compiledTemplate,
        });

        res.status(200).send({ message: 'Tickets purchased successfully', totalPrice: totalPrice });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred during ticket purchase' });
    }
};

// View User Tickets
export const viewUserTickets = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const tickets = await prisma.tickets.findMany({ where: { userId } });
        res.status(200).send(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching user tickets' });
    }
};

// Organizer's Event Tickets Summary
export const eventSummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId } = req.params;

        // Fetch the event details
        const event = await prisma.events.findUnique({
            where: { id: eventId },
            include: { tickets: true }
        });

        if (!event) {
            throw res.status(404).send({ message: 'Event not found' });
        }

        // Calculate total tickets sold and total revenue
        let totalTicketsSold = 0;
        let totalRevenue = 0;
        event.tickets.forEach(ticket => {
            totalTicketsSold += ticket.quantity;
            totalRevenue += ticket.totalPrice;
        });

        // Prepare the summary data
        const summary = {
            eventId: eventId,
            eventName: event.name,
            totalTicketsSold: totalTicketsSold,
            totalRevenue: totalRevenue,
            availableSeats: event.availableSeats
            // Add more details as needed
        };

        res.status(200).send({ message: 'Event summary fetched successfully', data: summary });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching event summary' });
    }
};
