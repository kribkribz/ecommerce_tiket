// Handle Request & Response
import {Request, Response, NextFunction} from 'express';
import prisma from '../connection';
import fs from 'fs';



export const createEvent = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    try {  
            await prisma.$transaction(async(tx) => {
                const {name, description, date, location, price, availableSeats, categoryId} = JSON.parse(req.body.data11)// kalo mau masukin data ke form data kita pake keynya namanya data11
                const organizerId = (req as any ).payload // dari token verify
                console.log ('>>>>>>>')
                console.log(organizerId)
                const {id} = await tx.events.create({
                    data: {
                        name, description, date:new Date(date), location, price, availableSeats, 
                        organizerId: organizerId.id
                    }
                })

                await tx.categoryOnEvents.create({
                    data: {
                        eventId:id,
                        categoryId
                    }
                })


                const createImages: any =[]


                //masukin gambar key dari formdata namanya = 'imageUpload'
                if(req.files){
                    let filesArray= Array.isArray(req.files) ? req.files : req.files['imageUpload']
                    console.log(filesArray)
                   filesArray.forEach(async(item: any) => {
                        createImages.push({url: item.filename, eventId: id})
                    })
                }

                await tx.eventImages.createMany({
                    data: createImages
                })
            })

            res.status(201).send({
                error: false, 
                message: 'Create Event Success!',
                data: null
            })
        } catch (error) {
            if(req.files){
                let filesArray=Array.isArray(req.files) ? req.files : req.files['imageUpload']
                filesArray.forEach(async(item: any) => {
                     fs.rmSync(item.path)
                 })
            }    
            console.log(error)
        } finally {
            prisma.$disconnect()
        }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { eventId } = req.params;

        await prisma.$transaction(async (tx) => {
            // Delete related records from dependent tables
            await tx.tickets.deleteMany({ where: { eventId } });
            await tx.categoryOnEvents.deleteMany({ where: { eventId } });
            await tx.reviews.deleteMany({ where: { eventId } });

            // Delete images associated with the event
            let imagesToDelete = await tx.eventImages.findMany({ where: { eventId } });
            await tx.eventImages.deleteMany({ where: { eventId } });

            // Delete the event
            await tx.events.delete({ where: { id: eventId } });

            // Delete image files from the filesystem
            imagesToDelete.forEach((item) => {
                fs.rmSync(`public/image/${item.url}`, { force: true });
            });
        });

        res.status(200).send({
            error: false, 
            message: 'Delete Event Success!', 
            data: null
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
};

export const findEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const events = await prisma.events.findMany({
            skip: skip,
            take: limit,
            include: { eventImages: true }
        });

        const totalEvents = await prisma.events.count();
        const totalPages = Math.ceil(totalEvents / limit);

        res.status(200).send({
            error: false,
            message: 'Get events success!',
            data: events,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching events' });
    }
};