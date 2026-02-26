import type { Subscriber, EmailTemplate, Sequence, Email, CampaignStats } from "../types";
import { mockSubscribers, mockTemplates, mockSequences, mockEmails, mockStats } from "./mock-data";

// In-memory store for demo
let subscribers = [...mockSubscribers];
let templates = [...mockTemplates];
let sequences = [...mockSequences];
let emails = [...mockEmails];

// Subscribers
export async function getSubscribers(): Promise<Subscriber[]> {
  return subscribers;
}

export async function getSubscriber(id: string): Promise<Subscriber | null> {
  return subscribers.find((s) => s.id === id) || null;
}

export async function createSubscriber(data: Omit<Subscriber, "id" | "subscribedAt">): Promise<Subscriber> {
  const subscriber: Subscriber = {
    ...data,
    id: crypto.randomUUID(),
    subscribedAt: new Date().toISOString(),
  };
  subscribers.unshift(subscriber);
  return subscriber;
}

export async function updateSubscriber(id: string, data: Partial<Subscriber>): Promise<Subscriber> {
  const index = subscribers.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Subscriber not found");
  subscribers[index] = { ...subscribers[index], ...data };
  return subscribers[index];
}

export async function deleteSubscriber(id: string): Promise<void> {
  subscribers = subscribers.filter((s) => s.id !== id);
}

// Templates
export async function getTemplates(): Promise<EmailTemplate[]> {
  return templates;
}

export async function getTemplate(id: string): Promise<EmailTemplate | null> {
  return templates.find((t) => t.id === id) || null;
}

export async function createTemplate(data: Omit<EmailTemplate, "id" | "createdAt" | "updatedAt">): Promise<EmailTemplate> {
  const template: EmailTemplate = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  templates.unshift(template);
  return template;
}

export async function updateTemplate(id: string, data: Partial<EmailTemplate>): Promise<EmailTemplate> {
  const index = templates.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Template not found");
  templates[index] = { ...templates[index], ...data, updatedAt: new Date().toISOString() };
  return templates[index];
}

export async function deleteTemplate(id: string): Promise<void> {
  templates = templates.filter((t) => t.id !== id);
}

// Sequences
export async function getSequences(): Promise<Sequence[]> {
  return sequences;
}

export async function getSequence(id: string): Promise<Sequence | null> {
  const sequence = sequences.find((s) => s.id === id);
  if (!sequence) return null;
  
  // Enrich steps with template data
  const enrichedSteps = sequence.steps.map((step) => ({
    ...step,
    template: templates.find((t) => t.id === step.templateId),
  }));
  
  return { ...sequence, steps: enrichedSteps };
}

export async function createSequence(data: Omit<Sequence, "id" | "createdAt" | "updatedAt" | "subscriberCount">): Promise<Sequence> {
  const sequence: Sequence = {
    ...data,
    id: crypto.randomUUID(),
    subscriberCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  sequences.unshift(sequence);
  return sequence;
}

export async function updateSequence(id: string, data: Partial<Sequence>): Promise<Sequence> {
  const index = sequences.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Sequence not found");
  sequences[index] = { ...sequences[index], ...data, updatedAt: new Date().toISOString() };
  return sequences[index];
}

export async function deleteSequence(id: string): Promise<void> {
  sequences = sequences.filter((s) => s.id !== id);
}

// Emails
export async function getEmails(): Promise<Email[]> {
  return emails.map((e) => ({
    ...e,
    subscriber: subscribers.find((s) => s.id === e.subscriberId),
  }));
}

export async function sendEmail(subscriberId: string, templateId: string, subject: string): Promise<Email> {
  const email: Email = {
    id: crypto.randomUUID(),
    subscriberId,
    templateId,
    subject,
    status: "sent",
    sentAt: new Date().toISOString(),
  };
  emails.unshift(email);
  return email;
}

// Stats
export async function getStats(): Promise<CampaignStats> {
  return mockStats;
}

export async function getSubscriberStats() {
  const total = subscribers.length;
  const active = subscribers.filter((s) => s.status === "active").length;
  const unsubscribed = subscribers.filter((s) => s.status === "unsubscribed").length;
  
  return { total, active, unsubscribed };
}
