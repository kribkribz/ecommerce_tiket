
interface PaymentDetails {
    amount: number;
    currency: string;
    
}

/**
 * Dummy payment processor function.
 * Assumes success for all transactions.
 * 
 * @param {PaymentDetails} paymentDetails - The payment details.
 * @returns {Promise<Object>} - Simulated payment result.
 */
export const dummyPaymentProcessor = async (paymentDetails: PaymentDetails): Promise<Object> => {
    // Simulate some processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Optionally, you can log or use paymentDetails here if necessary
    console.log(`Processing payment for ${paymentDetails.amount} ${paymentDetails.currency}`);

    // Simulated response for successful payment
    return {
        success: true,
        message: 'Payment processed successfully',
        transactionId: 'dummy_transaction_' + Date.now()  // Simulated transaction ID
    };
};