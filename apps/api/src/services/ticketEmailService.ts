
import nodemailer from 'nodemailer';


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'masdefry20@gmail.com', // Email Sender
        pass: "jvsrafqdlisezrpf"
    },
});

export const sendTicketEmail = async (userEmail: string, ticket: any): Promise<void> => {
    const mailOptions = {
        from: 'masdefry20@gmail.com',
        to: userEmail,
        subject: `Your Ticket for${ticket.event.name}`,
        html: `<p>Here are your ticket details:</p>
               <p>id: ${ticket.id}</p>
               <p>Event: ${ticket.event.name}</p>
               <p>Date: ${ticket.event.date}</p>
               <p>Price: ${ticket.event.price}</p>`         
    };

    await transporter.sendMail(mailOptions);
};