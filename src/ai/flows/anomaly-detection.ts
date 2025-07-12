'use server';

/**
 * @fileOverview Anomaly detection AI agent for delivery data.
 *
 * - detectAnomalies - A function that handles anomaly detection in delivery data.
 * - AnomalyDetectionInput - The input type for the detectAnomalies function.
 * - AnomalyDetectionOutput - The return type for the detectAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnomalyDetectionInputSchema = z.object({
  deliveryData: z.string().describe('Delivery data including delivery times, route deviations, and driver behavior metrics.'),
});
export type AnomalyDetectionInput = z.infer<typeof AnomalyDetectionInputSchema>;

const AnomalyDetectionOutputSchema = z.object({
  hasAnomalies: z.boolean().describe('Whether anomalies were detected in the delivery data.'),
  anomalyReport: z.string().describe('A detailed report of any anomalies detected, including root cause analysis.'),
});
export type AnomalyDetectionOutput = z.infer<typeof AnomalyDetectionOutputSchema>;

export async function detectAnomalies(input: AnomalyDetectionInput): Promise<AnomalyDetectionOutput> {
  return detectAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'anomalyDetectionPrompt',
  input: {schema: AnomalyDetectionInputSchema},
  output: {schema: AnomalyDetectionOutputSchema},
  prompt: `You are an expert in logistics and delivery anomaly detection. Analyze the provided delivery data to identify any anomalies in delivery times, route deviations, or driver behavior. Provide a detailed report including root cause analysis.

Delivery Data: {{{deliveryData}}}

Based on the data, determine if there are any anomalies and provide a report.
`,
});

const detectAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectAnomaliesFlow',
    inputSchema: AnomalyDetectionInputSchema,
    outputSchema: AnomalyDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
