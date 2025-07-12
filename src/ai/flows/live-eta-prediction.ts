'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting live ETAs for deliveries.
 *
 * It takes into account vehicle location, traffic, and potential delays to provide
 * continuously updating ETA predictions.
 *
 * @exports {
 *   predictLiveETA,
 *   LiveETAPredictionInput,
 *   LiveETAPredictionOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LiveETAPredictionInputSchema = z.object({
  vehicleLocation: z
    .object({
      latitude: z.number().describe('Latitude of the delivery vehicle.'),
      longitude: z.number().describe('Longitude of the delivery vehicle.'),
    })
    .describe('Current location of the delivery vehicle.'),
  destination: z
    .object({
      latitude: z.number().describe('Latitude of the delivery destination.'),
      longitude: z.number().describe('Longitude of the delivery destination.'),
    })
    .describe('Final destination of the delivery.'),
  trafficConditions: z
    .string()
    .describe(
      'Current traffic conditions along the route (e.g., heavy, moderate, light).'n    ),
  route: z.string().describe('The route the vehicle is taking'),
  unexpectedDelays: z
    .string()
    .describe(
      'Any unexpected delays encountered (e.g., accident, road closure).'n    ),
  orderPriority: z.string().describe('The priority of the order being delivered'),
  timeOfOrder: z
    .string()
    .describe('the time the order was placed at (ISO format)'),
});
export type LiveETAPredictionInput = z.infer<
  typeof LiveETAPredictionInputSchema
>;

const LiveETAPredictionOutputSchema = z.object({
  estimatedArrivalTime: z
    .string()
    .describe('Estimated time of arrival (ISO format).'),
  confidenceLevel: z
    .string()
    .describe(
      'Confidence level of the ETA prediction (e.g., high, medium, low).'n    ),
  reasoning: z
    .string()
    .describe('Explanation of factors affecting ETA prediction.'),
});
export type LiveETAPredictionOutput = z.infer<
  typeof LiveETAPredictionOutputSchema
>;

export async function predictLiveETA(
  input: LiveETAPredictionInput
): Promise<LiveETAPredictionOutput> {
  return liveETAPredictionFlow(input);
}

const liveETAPredictionPrompt = ai.definePrompt({
  name: 'liveETAPredictionPrompt',
  input: {schema: LiveETAPredictionInputSchema},
  output: {schema: LiveETAPredictionOutputSchema},
  prompt: `You are an expert delivery time estimator. Given the current
  location of the delivery vehicle, the destination, traffic conditions,
  any unexpected delays, the route, the order priority, and the time of
  the order, predict the estimated time of arrival. Also, provide
  confidence levels for the prediction based on the data you used for the
  calculations.

  Vehicle Location: Latitude: {{vehicleLocation.latitude}}, Longitude:
  {{vehicleLocation.longitude}}
  Destination: Latitude: {{destination.latitude}}, Longitude:
  {{destination.longitude}}
  Traffic Conditions: {{trafficConditions}}
  Route: {{route}}
  Unexpected Delays: {{unexpectedDelays}}
  Order Priority: {{orderPriority}}
  Time of Order: {{timeOfOrder}}

  Provide the estimated arrival time in ISO format, along with the
  confidence level (high, medium, low) and a brief explanation of the
  factors influencing your prediction.
  `,
});

const liveETAPredictionFlow = ai.defineFlow(
  {
    name: 'liveETAPredictionFlow',
    inputSchema: LiveETAPredictionInputSchema,
    outputSchema: LiveETAPredictionOutputSchema,
  },
  async input => {
    const {output} = await liveETAPredictionPrompt(input);
    return output!;
  }
);
