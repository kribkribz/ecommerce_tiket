// Handle Request & Response
import { Request, Response, NextFunction } from 'express';
import prisma from '../connection';
import { hashPassword, hashMatch } from '../utils/hashPassword';
import { jwtCreate } from '../utils/jwt';
import { transporterNodemailer } from '../utils/transportMailer';
import fs from 'fs';
import Handlebars from 'handlebars';
import generateUniqueReferralCode from '@/utils/generateReferalCode';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {username, email, password, referredBy } = req.body;
    console.log(referredBy)

    if (!email || !username || !password ) {
      throw { message: 'Data Not Complete!' };
    }

    // Generate a unique referral code
    const referralCode = generateUniqueReferralCode();

    // Hash the password
    const hashedPassword: string = await hashPassword(password);

    // Initialize discountEligible to 0 (not eligible)
    let discountEligible = 0;
    let referredById = null;

    // Check if the referral code is valid
    if (referredBy) {
      const referralOwner = await prisma.users.findUnique({
        where: { referralCode: referredBy },
      });
      referredById = referralOwner ? referralOwner.id : null;
      console.log(referredById)
      if (referredById) {
        // Set discountEligible to 1 (eligible) as they have a valid referrer
        discountEligible = 1;

        // Add referral rewards and update referrer's points
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 3);

        await prisma.users.update({
          where: { id: referredById },
          data: {
            totalPoints: { increment: 10000 },
          },
        });

        await prisma.referralRewards.create({
          data: {
            ownerId: referredById,
            points: 10000,
            expiresAt: expiryDate,
            redeemed: false,
          },
        });
      } else {
        throw { message: 'Invalid Referral Code' };
      }
    }

    // Create the new user
    const createUser = await prisma.users.create({
      data: {
        email,
        username,
        password: hashedPassword,
        referralCode: generateUniqueReferralCode(),
        referredBy: referredById,
        discountEligible, // Set the discountEligible flag
        role: 'USER',
      },
    });

    

    const token = await jwtCreate({ id: createUser.id, role: createUser.role });

    const template = fs.readFileSync('src/TemplateUser.html', 'utf-8');

    let compiledTemplate: any = await Handlebars.compile(template);
    compiledTemplate = compiledTemplate({ username, token });

    await transporterNodemailer.sendMail({
      from: 'masdefry20@gmail.com',
      to: email,
      subject: 'Welcome!',
      html: compiledTemplate,
    });

    res.status(200).send({
      error: false,
      message: 'Register Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { usernameOrEmail, password } = req.body;

    const users = await prisma.users.findFirst({
      where: {
        OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
    });

    if (users === null) throw { message: 'Username or Email Not Found' };

    const isCompare = await hashMatch(password, users.password);

    if (isCompare === false) throw { message: 'Password Doesn\'t Match' };

    const token = await jwtCreate({ id: users.id, role: users.role });

    res.status(200).send({
      error: false,
      message: 'Login Success',
      data: {
        username: users.username,
        token,
        role: users.role
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifiedAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const decodetoken = (req as any).payload;

  try {
    await prisma.users.update({
      where: {
        id: decodetoken.id,
      },
      data: {
        verified: 1,
      },
    });

    console.log("Verified Success");
    res.status(200).send({
      error: false,
      message: 'Verified Success',
      data: null,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};