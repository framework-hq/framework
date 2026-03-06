/**
 * Intent Parser using GPT-4o-mini
 * Converts natural language to structured CRM actions
 */

import { ParsedIntent, IntentType } from './types';
import { CRMSchema, schemaToPromptContext } from './schema';

const INTENT_SYSTEM_PROMPT = `You are a CRM voice assistant parser. Extract ALL relevant details from user speech.

Available actions:
- add_contact: Add a new contact/lead/prospect
- update_deal: Update a deal's stage, value, or details
- query_pipeline: Query the sales pipeline
- add_note: Add a note to a contact or deal
- set_reminder: Set a reminder for follow-up
- close_deal: Close a deal as won/lost
- unknown: Cannot determine intent

Extract ALL mentioned details into data:
- name: Contact/lead name
- company: Company name
- email, phone: Contact info
- dealValue: Deal size/value (number)
- dealStage: Stage (lead, prospect, qualified, proposal, negotiation, closed)
- meetingDate: Any mentioned meeting/call date
- closeWindow: Expected close timeline
- priority: High/medium/low if mentioned
- notes: Any other context or details

Respond ONLY with valid JSON:
{
  "type": "intent_type",
  "confidence": 0.0-1.0,
  "data": { ...all extracted fields... }
}

Examples:
"Add John Smith from Acme Corp" → {"type":"add_contact","confidence":0.95,"data":{"name":"John Smith","company":"Acme Corp"}}
"Add Barry as a prospect, $100k deal, meeting next Tuesday" → {"type":"add_contact","confidence":0.95,"data":{"name":"Barry","dealStage":"prospect","dealValue":100000,"meetingDate":"next Tuesday"}}
"Close the Morrison deal at 45k" → {"type":"close_deal","confidence":0.95,"data":{"dealName":"Morrison","dealValue":45000}}`;

export interface ParseOptions {
  apiKey: string;
  model?: string;
  schema?: CRMSchema;
}

/**
 * Parse natural language into a structured CRM intent
 */
export async function parseIntent(
  text: string,
  options: ParseOptions
): Promise<ParsedIntent> {
  const { apiKey, model = 'gpt-4o-mini', schema } = options;

  // Build system prompt with optional company schema
  let systemPrompt = INTENT_SYSTEM_PROMPT;
  if (schema) {
    const schemaContext = schemaToPromptContext(schema);
    systemPrompt += `\n\n--- COMPANY-SPECIFIC SCHEMA ---\n${schemaContext}`;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      temperature: 0.1,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Intent parsing error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No response from intent parser');
  }

  try {
    const parsed = JSON.parse(content);
    return {
      type: parsed.type as IntentType,
      confidence: parsed.confidence || 0.5,
      data: parsed.data || {},
      rawText: text,
    };
  } catch {
    // If JSON parsing fails, return unknown intent
    return {
      type: 'unknown',
      confidence: 0,
      data: {},
      rawText: text,
    };
  }
}

/**
 * Generate a human-readable confirmation message
 */
export function generateConfirmation(intent: ParsedIntent): string {
  switch (intent.type) {
    case 'add_contact': {
      const d = intent.data as Record<string, unknown>;
      let msg = `Adding ${d.dealStage || 'contact'}: ${d.name || 'Unknown'}`;
      if (d.company) msg += ` @ ${d.company}`;
      if (d.dealValue) msg += ` | $${Number(d.dealValue).toLocaleString()}`;
      if (d.meetingDate) msg += ` | Meeting: ${d.meetingDate}`;
      if (d.closeWindow) msg += ` | Close: ${d.closeWindow}`;
      if (d.priority) msg += ` | ${d.priority} priority`;
      return msg;
    }
    case 'update_deal': {
      const { dealName, stage, value } = intent.data as { dealName?: string; stage?: string; value?: number };
      let msg = `Updating deal ${dealName || 'unknown'}`;
      if (stage) msg += ` to stage ${stage}`;
      if (value) msg += ` with value $${value.toLocaleString()}`;
      return msg;
    }
    case 'query_pipeline': {
      const { filter, stage } = intent.data as { filter?: string; stage?: string };
      return `Querying pipeline${filter ? ` for ${filter}` : ''}${stage ? ` in ${stage}` : ''}`;
    }
    case 'add_note': {
      return `Adding note`;
    }
    case 'set_reminder': {
      const { date } = intent.data as { date: string };
      return `Setting reminder for ${date}`;
    }
    case 'close_deal': {
      const { dealName, value } = intent.data as { dealName?: string; value?: number };
      return `Closing ${dealName || 'deal'}${value ? ` at $${value.toLocaleString()}` : ''}`;
    }
    default:
      return `I didn't understand: "${intent.rawText}"`;
  }
}
