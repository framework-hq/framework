import type { Deal, Stage, Contact, Activity, PipelineStats } from "../types";
import { mockDeals, mockContacts, mockActivities, stages, mockStats } from "./mock-data";

// In-memory store for demo
let deals = [...mockDeals];
let contacts = [...mockContacts];
let activities = [...mockActivities];

// Stages (fixed)
export async function getStages(): Promise<Stage[]> {
  return stages.filter(s => s.id !== "won" && s.id !== "lost");
}

export async function getAllStages(): Promise<Stage[]> {
  return stages;
}

// Deals
export async function getDeals(): Promise<Deal[]> {
  return deals.map(d => ({
    ...d,
    contact: contacts.find(c => c.id === d.contactId),
    activities: activities.filter(a => a.dealId === d.id),
  }));
}

export async function getDeal(id: string): Promise<Deal | null> {
  const deal = deals.find(d => d.id === id);
  if (!deal) return null;
  return {
    ...deal,
    contact: contacts.find(c => c.id === deal.contactId),
    activities: activities.filter(a => a.dealId === id),
  };
}

export async function createDeal(data: Omit<Deal, "id" | "createdAt" | "updatedAt" | "activities">): Promise<Deal> {
  const deal: Deal = {
    ...data,
    id: crypto.randomUUID(),
    activities: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  deals.unshift(deal);
  return deal;
}

export async function updateDeal(id: string, updates: Partial<Deal>): Promise<Deal> {
  const index = deals.findIndex(d => d.id === id);
  if (index === -1) throw new Error("Deal not found");
  deals[index] = { ...deals[index], ...updates, updatedAt: new Date().toISOString() };
  return deals[index];
}

export async function moveDeal(id: string, stageId: string): Promise<Deal> {
  const stage = stages.find(s => s.id === stageId);
  if (!stage) throw new Error("Stage not found");
  return updateDeal(id, { stage, probability: stage.probability });
}

export async function deleteDeal(id: string): Promise<void> {
  deals = deals.filter(d => d.id !== id);
  activities = activities.filter(a => a.dealId !== id);
}

// Contacts
export async function getContacts(): Promise<Contact[]> {
  return contacts;
}

export async function createContact(data: Omit<Contact, "id">): Promise<Contact> {
  const contact: Contact = {
    ...data,
    id: crypto.randomUUID(),
  };
  contacts.push(contact);
  return contact;
}

// Activities
export async function getActivities(dealId: string): Promise<Activity[]> {
  return activities.filter(a => a.dealId === dealId);
}

export async function createActivity(data: Omit<Activity, "id" | "createdAt">): Promise<Activity> {
  const activity: Activity = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  activities.unshift(activity);
  return activity;
}

export async function updateActivity(id: string, updates: Partial<Activity>): Promise<Activity> {
  const index = activities.findIndex(a => a.id === id);
  if (index === -1) throw new Error("Activity not found");
  activities[index] = { ...activities[index], ...updates };
  return activities[index];
}

export async function deleteActivity(id: string): Promise<void> {
  activities = activities.filter(a => a.id !== id);
}

// Stats
export async function getStats(): Promise<PipelineStats> {
  const activeDeals = deals.filter(d => d.stage.id !== "won" && d.stage.id !== "lost");
  const wonDeals = deals.filter(d => d.stage.id === "won");
  
  return {
    totalDeals: activeDeals.length,
    totalValue: activeDeals.reduce((sum, d) => sum + d.value, 0),
    weightedValue: activeDeals.reduce((sum, d) => sum + (d.value * d.probability / 100), 0),
    wonThisMonth: wonDeals.reduce((sum, d) => sum + d.value, 0),
    avgDealSize: activeDeals.length > 0 
      ? Math.round(activeDeals.reduce((sum, d) => sum + d.value, 0) / activeDeals.length)
      : 0,
    conversionRate: mockStats.conversionRate,
  };
}

// Pipeline by stage
export async function getDealsByStage(): Promise<Record<string, Deal[]>> {
  const dealsList = await getDeals();
  const byStage: Record<string, Deal[]> = {};
  
  for (const stage of stages) {
    if (stage.id !== "won" && stage.id !== "lost") {
      byStage[stage.id] = dealsList.filter(d => d.stage.id === stage.id);
    }
  }
  
  return byStage;
}
