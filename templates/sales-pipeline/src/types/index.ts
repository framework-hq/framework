export interface Deal {
  id: string;
  name: string;
  value: number;
  stage: Stage;
  contactId?: string;
  contact?: Contact;
  probability: number;
  expectedCloseDate: string;
  notes?: string;
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
}

export interface Stage {
  id: string;
  name: string;
  order: number;
  color: string;
  probability: number; // Default probability for deals in this stage
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

export interface Activity {
  id: string;
  dealId: string;
  type: "call" | "email" | "meeting" | "note" | "task";
  description: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}

export interface PipelineStats {
  totalDeals: number;
  totalValue: number;
  weightedValue: number;
  wonThisMonth: number;
  avgDealSize: number;
  conversionRate: number;
}
