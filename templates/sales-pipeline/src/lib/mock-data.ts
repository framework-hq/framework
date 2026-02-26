import type { Deal, Stage, Contact, Activity, PipelineStats } from "../types";
import { subDays, addDays, format } from "date-fns";

export const stages: Stage[] = [
  { id: "lead", name: "Lead", order: 1, color: "#6b7280", probability: 10 },
  { id: "qualified", name: "Qualified", order: 2, color: "#3b82f6", probability: 25 },
  { id: "proposal", name: "Proposal", order: 3, color: "#8b5cf6", probability: 50 },
  { id: "negotiation", name: "Negotiation", order: 4, color: "#f59e0b", probability: 75 },
  { id: "won", name: "Won", order: 5, color: "#22c55e", probability: 100 },
  { id: "lost", name: "Lost", order: 6, color: "#ef4444", probability: 0 },
];

export const mockContacts: Contact[] = [
  { id: "c1", name: "Sarah Chen", email: "sarah@techcorp.com", company: "TechCorp Inc", phone: "+1 555-0123" },
  { id: "c2", name: "Marcus Johnson", email: "marcus@startup.io", company: "Startup.io", phone: "+1 555-0456" },
  { id: "c3", name: "Emily Rodriguez", email: "emily@scaleup.co", company: "ScaleUp", phone: "+1 555-0789" },
  { id: "c4", name: "Alex Kim", email: "alex@design.studio", company: "Design Studio" },
  { id: "c5", name: "Jordan Lee", email: "jordan@ventures.vc", company: "Ventures VC" },
];

const today = new Date();

export const mockActivities: Activity[] = [
  { id: "a1", dealId: "d1", type: "call", description: "Discovery call - identified key pain points", completed: true, createdAt: format(subDays(today, 5), "yyyy-MM-dd") },
  { id: "a2", dealId: "d1", type: "email", description: "Sent product overview deck", completed: true, createdAt: format(subDays(today, 3), "yyyy-MM-dd") },
  { id: "a3", dealId: "d1", type: "meeting", description: "Demo scheduled with buying committee", dueDate: format(addDays(today, 2), "yyyy-MM-dd"), completed: false, createdAt: format(subDays(today, 1), "yyyy-MM-dd") },
  { id: "a4", dealId: "d2", type: "note", description: "Met at conference, very interested in enterprise plan", completed: true, createdAt: format(subDays(today, 7), "yyyy-MM-dd") },
  { id: "a5", dealId: "d3", type: "task", description: "Send revised proposal with volume discount", dueDate: format(addDays(today, 1), "yyyy-MM-dd"), completed: false, createdAt: format(today, "yyyy-MM-dd") },
];

export const mockDeals: Deal[] = [
  {
    id: "d1",
    name: "TechCorp Enterprise Deal",
    value: 48000,
    stage: stages[2], // Proposal
    contactId: "c1",
    contact: mockContacts[0],
    probability: 50,
    expectedCloseDate: format(addDays(today, 14), "yyyy-MM-dd"),
    notes: "50-seat enterprise deal. Competing with Salesforce.",
    activities: mockActivities.filter(a => a.dealId === "d1"),
    createdAt: format(subDays(today, 30), "yyyy-MM-dd"),
    updatedAt: format(subDays(today, 1), "yyyy-MM-dd"),
  },
  {
    id: "d2",
    name: "Startup.io Pilot",
    value: 12000,
    stage: stages[1], // Qualified
    contactId: "c2",
    contact: mockContacts[1],
    probability: 25,
    expectedCloseDate: format(addDays(today, 30), "yyyy-MM-dd"),
    activities: mockActivities.filter(a => a.dealId === "d2"),
    createdAt: format(subDays(today, 7), "yyyy-MM-dd"),
    updatedAt: format(subDays(today, 2), "yyyy-MM-dd"),
  },
  {
    id: "d3",
    name: "ScaleUp Annual Contract",
    value: 36000,
    stage: stages[3], // Negotiation
    contactId: "c3",
    contact: mockContacts[2],
    probability: 75,
    expectedCloseDate: format(addDays(today, 7), "yyyy-MM-dd"),
    notes: "Negotiating annual vs monthly pricing",
    activities: mockActivities.filter(a => a.dealId === "d3"),
    createdAt: format(subDays(today, 21), "yyyy-MM-dd"),
    updatedAt: format(today, "yyyy-MM-dd"),
  },
  {
    id: "d4",
    name: "Design Studio Pro Plan",
    value: 6000,
    stage: stages[0], // Lead
    contactId: "c4",
    contact: mockContacts[3],
    probability: 10,
    expectedCloseDate: format(addDays(today, 45), "yyyy-MM-dd"),
    activities: [],
    createdAt: format(subDays(today, 3), "yyyy-MM-dd"),
    updatedAt: format(subDays(today, 3), "yyyy-MM-dd"),
  },
  {
    id: "d5",
    name: "Ventures VC Platform License",
    value: 24000,
    stage: stages[4], // Won
    contactId: "c5",
    contact: mockContacts[4],
    probability: 100,
    expectedCloseDate: format(subDays(today, 5), "yyyy-MM-dd"),
    notes: "Closed! Starting onboarding next week.",
    activities: [],
    createdAt: format(subDays(today, 45), "yyyy-MM-dd"),
    updatedAt: format(subDays(today, 5), "yyyy-MM-dd"),
  },
];

export const mockStats: PipelineStats = {
  totalDeals: mockDeals.filter(d => d.stage.id !== "won" && d.stage.id !== "lost").length,
  totalValue: mockDeals.filter(d => d.stage.id !== "won" && d.stage.id !== "lost").reduce((sum, d) => sum + d.value, 0),
  weightedValue: mockDeals.filter(d => d.stage.id !== "won" && d.stage.id !== "lost").reduce((sum, d) => sum + (d.value * d.probability / 100), 0),
  wonThisMonth: mockDeals.filter(d => d.stage.id === "won").reduce((sum, d) => sum + d.value, 0),
  avgDealSize: 25200,
  conversionRate: 32,
};
