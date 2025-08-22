
'use server';
/**
 * @fileOverview A flow for calculating delivery fees based on distance.
 *
 * - calculateDeliveryFee - A function that calculates the delivery fee.
 * - CalculateDeliveryFeeInput - The input type for the calculateDeliveryFee function.
 * - CalculateDeliveryFeeOutput - The return type for the calculateDeliveryFee function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CalculateDeliveryFeeInputSchema = z.object({
  destinationAddress: z.string().describe('The full delivery address of the customer.'),
});
export type CalculateDeliveryFeeInput = z.infer<typeof CalculateDeliveryFeeInputSchema>;

const CalculateDeliveryFeeOutputSchema = z.object({
  fee: z.number().describe('The calculated delivery fee in Tanzanian Shillings (TZS).'),
  distanceKm: z.number().describe('The calculated distance in kilometers.'),
});
export type CalculateDeliveryFeeOutput = z.infer<typeof CalculateDeliveryFeeOutputSchema>;

export async function calculateDeliveryFee(input: CalculateDeliveryFeeInput): Promise<CalculateDeliveryFeeOutput> {
  return calculateDeliveryFeeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateDeliveryFeePrompt',
  input: { schema: z.object({ destination: z.string(), origin: z.string() }) },
  output: { schema: z.object({ distanceKm: z.number().describe("The driving distance in kilometers.") }) },
  prompt: `Calculate the driving distance in kilometers between the origin and the destination.
  Origin: {{{origin}}}
  Destination: {{{destination}}}
  Provide only the distance in your response.`,
});

const calculateDeliveryFeeFlow = ai.defineFlow(
  {
    name: 'calculateDeliveryFeeFlow',
    inputSchema: CalculateDeliveryFeeInputSchema,
    outputSchema: CalculateDeliveryFeeOutputSchema,
  },
  async (input) => {
    const farmAddress = "Mbuli's Feast Farm, Mbezi Beach, Dar es Salaam, Tanzania";

    const { output } = await prompt({
      origin: farmAddress,
      destination: input.destinationAddress,
    });
    
    if (!output) {
      throw new Error("Could not calculate distance.");
    }

    const distanceKm = output.distanceKm;

    // Pricing logic: 250 TZS per km, with a minimum of 1500 and a max of 6000 TZS.
    let fee = distanceKm * 250;
    if (fee < 1500) {
      fee = 1500;
    }
    if (fee > 6000) {
      fee = 6000;
    }
    
    // Round to the nearest 100 TZS
    fee = Math.round(fee / 100) * 100;

    return {
      fee,
      distanceKm,
    };
  }
);
