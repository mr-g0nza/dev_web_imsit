'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing wheel recommendations based on car model and driving preferences.
 *
 * - getWheelRecommendations - A function that takes car model and driving preferences as input and returns wheel recommendations.
 * - WheelRecommendationInput - The input type for the getWheelRecommendations function.
 * - WheelRecommendationOutput - The output type for the getWheelRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WheelRecommendationInputSchema = z.object({
  carModel: z.string().describe('The model of the car.'),
  drivingPreferences: z.string().describe('The driving preferences of the user (e.g., sporty, comfortable, off-road).'),
});
export type WheelRecommendationInput = z.infer<typeof WheelRecommendationInputSchema>;

const WheelRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      brand: z.string().describe('The brand of the recommended wheel.'),
      model: z.string().describe('The model of the recommended wheel.'),
      size: z.string().describe('The size of the recommended wheel.'),
      type: z.string().describe('The type of the recommended wheel.'),
      price: z.number().describe('The price of the recommended wheel.'),
      reason: z.string().describe('The reason for recommending this wheel.'),
    })
  ).describe('A list of recommended wheels.'),
});
export type WheelRecommendationOutput = z.infer<typeof WheelRecommendationOutputSchema>;

export async function getWheelRecommendations(input: WheelRecommendationInput): Promise<WheelRecommendationOutput> {
  return wheelRecommendationFlow(input);
}

const wheelRecommendationPrompt = ai.definePrompt({
  name: 'wheelRecommendationPrompt',
  input: {schema: WheelRecommendationInputSchema},
  output: {schema: WheelRecommendationOutputSchema},
  prompt: `You are an expert in recommending wheels for cars.

  Based on the car model and driving preferences provided, recommend a list of wheels that would be suitable for the user.

  Car Model: {{{carModel}}}
  Driving Preferences: {{{drivingPreferences}}}

  Format your response as a JSON object with a "recommendations" field. Each recommendation should include the brand, model, size, type, price, and a brief reason for the recommendation.
  `,
});

const wheelRecommendationFlow = ai.defineFlow(
  {
    name: 'wheelRecommendationFlow',
    inputSchema: WheelRecommendationInputSchema,
    outputSchema: WheelRecommendationOutputSchema,
  },
  async input => {
    const {output} = await wheelRecommendationPrompt(input);
    return output!;
  }
);
