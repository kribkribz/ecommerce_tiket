// import { PrismaClient, User } from '@prisma/client';

// const prisma = new PrismaClient();

// export const createUser = async (email: string, password: string, name: string, role: string): Promise<User> => {
//     return prisma.users.create({
//         data: {
//             email,
//             password,
//             name,
//             role
//         }
//     });
// };

// export const getUserById = async (userId: string): Promise<User | null> => {
//     return prisma.user.findUnique({
//         where: { id: userId },
//     });
// };

// export const updateUser = async (userId: string, updateData: Partial<User>): Promise<User> => {
//     return prisma.user.update({
//         where: { id: userId },
//         data: updateData
//     });
// };

// export const findUserByEmail = async (email: string): Promise<User | null> => {
//     return prisma.user.findUnique({
//         where: { email }
//     });
// };

// export const updateUserRole = async (userId: string, role: string): Promise<User> => {
//     return prisma.user.update({
//         where: { id: userId },
//         data: { role }
//     });
// }

// export function verifyUserEmail(referralCode: string) {
//     throw new Error('Function not implemented.');
// }

