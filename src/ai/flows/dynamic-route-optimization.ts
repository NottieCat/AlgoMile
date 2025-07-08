'use server';

/**
 * @fileOverview Dynamic route optimization flow using Genkit.
 *
 * - optimizeRoute - A function that takes in shipment details, traffic, and weather conditions to optimize delivery routes in real-time.
 * - OptimizeRouteInput - The input type for the optimizeRoute function.
 * - OptimizeRouteOutput - The return type for the optimizeRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRouteInputSchema = z.object({
  shipmentDetails: z.string().describe('Details of the shipment including origin, destination, and any specific requirements.'),
  trafficConditions: z.string().describe('Current traffic conditions including congestion levels and estimated delays.'),
  weatherConditions: z.string().describe('Current weather conditions including rain, snow, or any other relevant weather phenomena.'),
});

export type OptimizeRouteInput = z.infer<typeof OptimizeRouteInputSchema>;

const OptimizeRouteOutputSchema = z.object({
  optimizedRoute: z.string().describe('The optimized delivery route considering traffic and weather conditions.'),
  estimatedTimeOfArrival: z.string().describe('The estimated time of arrival based on the optimized route.'),
  potentialDelays: z.string().describe('Any potential delays and their causes based on current conditions.'),
});

export type OptimizeRouteOutput = z.infer<typeof OptimizeRouteOutputSchema>;

export async function optimizeRoute(input: OptimizeRouteInput): Promise<OptimizeRouteOutput> {
  return optimizeRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeRoutePrompt',
  input: {schema: OptimizeRouteInputSchema},
  output: {schema: OptimizeRouteOutputSchema},
  prompt: `You are an expert logistics optimizer. Given the shipment details, traffic conditions, and weather conditions, determine the optimal delivery route.

Shipment Details: {{{shipmentDetails}}}
Traffic Conditions: {{{trafficConditions}}}
Weather Conditions: {{{weatherConditions}}}

Consider all factors to provide the fastest and most efficient route, along with an estimated time of arrival and any potential delays.

Optimize the route and estimate the arrival time, considering potential delays. Return all information in a clear and concise manner.`, 
});

const optimizeRouteFlow = ai.defineFlow(
  {
    name: 'optimizeRouteFlow',
    inputSchema: OptimizeRouteInputSchema,
    outputSchema: OptimizeRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
