'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing live ETA predictions during shipment.
 *
 * - liveEtaPrediction - A function that returns the live ETA prediction.
 * - LiveEtaPredictionInput - The input type for the liveEtaPrediction function.
 * - LiveEtaPredictionOutput - The return type for the liveEtaPrediction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LiveEtaPredictionInputSchema = z.object({
  shipmentId: z.string().describe('The ID of the shipment.'),
  currentLocation: z.object({
    latitude: z.number().describe('The current latitude of the shipment.'),
    longitude: z.number().describe('The current longitude of the shipment.'),
  }).describe('The current location of the shipment.'),
  destination: z.object({
    latitude: z.number().describe('The destination latitude of the shipment.'),
    longitude: z.number().describe('The destination longitude of the shipment.'),
  }).describe('The destination of the shipment.'),
  trafficConditions: z.string().describe('The current traffic conditions.'),
  weatherConditions: z.string().describe('The current weather conditions.'),
  orderPriorities: z.string().describe('The priorities of the order.'),
});

export type LiveEtaPredictionInput = z.infer<typeof LiveEtaPredictionInputSchema>;

const LiveEtaPredictionOutputSchema = z.object({
  estimatedArrivalTime: z.string().describe('The estimated time of arrival.'),
  confidenceLevel: z.string().describe('The confidence level of the ETA prediction.'),
  potentialDelays: z.string().describe('Any potential delays and their reasons.'),
});

export type LiveEtaPredictionOutput = z.infer<typeof LiveEtaPredictionOutputSchema>;

export async function liveEtaPrediction(input: LiveEtaPredictionInput): Promise<LiveEtaPredictionOutput> {
  return liveEtaPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'liveEtaPredictionPrompt',
  input: {schema: LiveEtaPredictionInputSchema},
  output: {schema: LiveEtaPredictionOutputSchema},
  prompt: `You are an AI assistant specializing in predicting live estimated times of arrival (ETAs) for shipments. 

  Based on the shipment's current location, destination, traffic conditions, weather conditions, and order priorities, provide an accurate ETA, a confidence level for the prediction, and any potential delays.

  Shipment ID: {{{shipmentId}}}
  Current Location: Latitude: {{{currentLocation.latitude}}}, Longitude: {{{currentLocation.longitude}}}
  Destination: Latitude: {{{destination.latitude}}}, Longitude: {{{destination.longitude}}}
  Traffic Conditions: {{{trafficConditions}}}
  Weather Conditions: {{{weatherConditions}}}
  Order Priorities: {{{orderPriorities}}}

  Provide the estimated arrival time, confidence level (High, Medium, Low), and any potential delays in the following format:

  Estimated Arrival Time: [estimated arrival time]
  Confidence Level: [confidence level]
  Potential Delays: [potential delays and reasons]`,
});

const liveEtaPredictionFlow = ai.defineFlow(
  {
    name: 'liveEtaPredictionFlow',
    inputSchema: LiveEtaPredictionInputSchema,
    outputSchema: LiveEtaPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
