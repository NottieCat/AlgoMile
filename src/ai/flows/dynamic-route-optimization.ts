'use server';

/**
 * @fileOverview Dynamic route optimization AI agent.
 *
 * - optimizeRoute - A function that handles the route optimization process.
 * - OptimizeRouteInput - The input type for the optimizeRoute function.
 * - OptimizeRouteOutput - The return type for the optimizeRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRouteInputSchema = z.object({
  deliveryAddress: z.string().describe('The delivery address.'),
  optimizeFor: z.enum(['time', 'cost']).describe('Whether to optimize for time or cost.'),
  currentTrafficConditions: z.string().optional().describe('Current traffic conditions.'),
  currentWeatherConditions: z.string().optional().describe('Current weather conditions.'),
  orderPriority: z.string().optional().describe('The priority of the order.'),
});
export type OptimizeRouteInput = z.infer<typeof OptimizeRouteInputSchema>;

const OptimizeRouteOutputSchema = z.object({
  optimizedRoute: z.string().describe('The optimized delivery route.'),
  estimatedDeliveryTime: z.string().describe('The estimated delivery time.'),
  estimatedDeliveryCost: z.string().describe('The estimated delivery cost.'),
  routeSummary: z.string().describe('A summary of the optimized route.'),
});
export type OptimizeRouteOutput = z.infer<typeof OptimizeRouteOutputSchema>;

export async function optimizeRoute(input: OptimizeRouteInput): Promise<OptimizeRouteOutput> {
  return optimizeRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeRoutePrompt',
  input: {schema: OptimizeRouteInputSchema},
  output: {schema: OptimizeRouteOutputSchema},
  prompt: `You are an AI assistant specializing in optimizing delivery routes.

You will receive the delivery address, the optimization preference (time or cost), 
current traffic conditions, current weather conditions, and the order priority.

Based on this information, you will generate an optimized delivery route, estimate the delivery time and cost, and provide a summary of the route.

Delivery Address: {{{deliveryAddress}}}
Optimize For: {{{optimizeFor}}}
Current Traffic Conditions: {{{currentTrafficConditions}}}
Current Weather Conditions: {{{currentWeatherConditions}}}
Order Priority: {{{orderPriority}}}

Consider real-time factors such as traffic and weather to minimize either delivery time or cost based on the optimizeFor parameter. Always provide a routeSummary.
`,
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
