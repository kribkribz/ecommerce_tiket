import crypto from 'crypto';

function generateUniqueReferralCode(prefix: string = 'REF'): string {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base36
  const randomCode = crypto.randomBytes(4).toString('hex').toUpperCase(); // Generate a random code
  const referralCode = `${prefix}-${timestamp}-${randomCode}`; // Combine the parts

  return referralCode;
}

export default generateUniqueReferralCode;
