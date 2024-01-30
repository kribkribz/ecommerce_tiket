import { Request, Response } from 'express';
import prisma from '../connection'; // Assuming you're using Prisma

// Submit a new review

// Submit a new review
export const submitReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId, userId, comment, rating } = req.body;

        // Check if the user has already reviewed this event
        const existingReview = await prisma.reviews.findFirst({
            where: {
                userId: userId,
                eventId: eventId
            }
        });

        if (existingReview) {
            res.status(400).send({ message: 'User has already reviewed this event' });
            return;
        }

        // Create a new review
        const newReview = await prisma.reviews.create({
            data: {
                userId,
                eventId,
                comment,
                rating,
            },
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error submitting review' });
    }
};

// Update an existing review
export const updateReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reviewId } = req.params;
        const { comment, rating } = req.body;
        const updatedReview = await prisma.reviews.update({
            where: { id: reviewId },
            data: { comment, rating },
        });
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating review' });
    }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reviewId } = req.params;
        await prisma.reviews.delete({
            where: { id: reviewId },
        });
        res.status(200).send({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error deleting review' });
    }
};

// Get reviews by event ID
export const getReviewsByEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId } = req.params;
        const reviews = await prisma.reviews.findMany({
            where: { eventId },
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching reviews' });
    }
};

// Get a specific review by ID
export const getReviewById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reviewId } = req.params;
        const review = await prisma.reviews.findUnique({
            where: { id: reviewId },
        });
        if (!review) {
            throw res.status(404).send({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching review' });
    }
};
