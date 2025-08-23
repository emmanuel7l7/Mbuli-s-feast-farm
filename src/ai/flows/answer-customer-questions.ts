'use server';

/**
 * @fileOverview A customer question answering AI agent for Mbuli's Feast Farm.
 *
 * - answerCustomerQuestions - A function that handles customer questions.
 * - AnswerCustomerQuestionsInput - The input type for the answerCustomerQuestions function.
 * - AnswerCustomerQuestionsOutput - The return type for the answerCustomerQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerCustomerQuestionsInputSchema = z.object({
  question: z.string().describe('The question asked by the customer.'),
});
export type AnswerCustomerQuestionsInput = z.infer<typeof AnswerCustomerQuestionsInputSchema>;

const AnswerCustomerQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the customer question.'),
});
export type AnswerCustomerQuestionsOutput = z.infer<typeof AnswerCustomerQuestionsOutputSchema>;

export async function answerCustomerQuestions(input: AnswerCustomerQuestionsInput): Promise<AnswerCustomerQuestionsOutput> {
  return answerCustomerQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerCustomerQuestionsPrompt',
  input: {schema: AnswerCustomerQuestionsInputSchema},
  output: {schema: AnswerCustomerQuestionsOutputSchema},
  prompt: `You are a customer service chatbot for Mbuli's Feast Farm, providing helpful and informative answers to customer questions about the company, its founder, and its products. Please provide concise and accurate responses dont forget to let them know of special offers every friday, for more details they should contact us on WhatsApp.

Question: {{{question}}}`,
});

const answerCustomerQuestionsFlow = ai.defineFlow(
  {
    name: 'answerCustomerQuestionsFlow',
    inputSchema: AnswerCustomerQuestionsInputSchema,
    outputSchema: AnswerCustomerQuestionsOutputSchema,
  },
  async input => {
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const {output} = await prompt(input);
        return output!;
      } catch (err) {
        lastError = err;
        // Wait a bit before retrying (exponential backoff)
        await new Promise(res => setTimeout(res, 500 * attempt));
      }
    }
    // If all attempts fail, throw the last error
    throw lastError;
  }
);
