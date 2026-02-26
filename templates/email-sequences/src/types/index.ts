export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  status: "active" | "unsubscribed" | "bounced";
  tags: string[];
  subscribedAt: string;
  lastEmailAt?: string;
  metadata?: Record<string, unknown>;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sequence {
  id: string;
  name: string;
  description?: string;
  status: "draft" | "active" | "paused";
  steps: SequenceStep[];
  subscriberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SequenceStep {
  id: string;
  sequenceId: string;
  order: number;
  delayDays: number;
  delayHours: number;
  templateId: string;
  template?: EmailTemplate;
}

export interface Email {
  id: string;
  subscriberId: string;
  subscriber?: Subscriber;
  templateId?: string;
  sequenceId?: string;
  subject: string;
  status: "queued" | "sent" | "delivered" | "opened" | "clicked" | "bounced" | "failed";
  sentAt?: string;
  openedAt?: string;
  clickedAt?: string;
}

export interface CampaignStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  openRate: number;
  clickRate: number;
}
