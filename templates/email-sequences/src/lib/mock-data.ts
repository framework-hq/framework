import type { Subscriber, EmailTemplate, Sequence, Email, CampaignStats } from "../types";
import { subDays, format } from "date-fns";

export const mockSubscribers: Subscriber[] = [
  {
    id: "s1",
    email: "sarah@techcorp.com",
    name: "Sarah Chen",
    status: "active",
    tags: ["customer", "enterprise"],
    subscribedAt: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    lastEmailAt: format(subDays(new Date(), 2), "yyyy-MM-dd"),
  },
  {
    id: "s2",
    email: "marcus@startup.io",
    name: "Marcus Johnson",
    status: "active",
    tags: ["lead", "trial"],
    subscribedAt: format(subDays(new Date(), 14), "yyyy-MM-dd"),
    lastEmailAt: format(subDays(new Date(), 1), "yyyy-MM-dd"),
  },
  {
    id: "s3",
    email: "emily@scaleup.co",
    name: "Emily Rodriguez",
    status: "active",
    tags: ["customer"],
    subscribedAt: format(subDays(new Date(), 7), "yyyy-MM-dd"),
  },
  {
    id: "s4",
    email: "alex@design.studio",
    name: "Alex Kim",
    status: "unsubscribed",
    tags: ["lead"],
    subscribedAt: format(subDays(new Date(), 60), "yyyy-MM-dd"),
  },
  {
    id: "s5",
    email: "jordan@ventures.vc",
    name: "Jordan Lee",
    status: "active",
    tags: ["investor", "vip"],
    subscribedAt: format(subDays(new Date(), 3), "yyyy-MM-dd"),
  },
];

export const mockTemplates: EmailTemplate[] = [
  {
    id: "t1",
    name: "Welcome Email",
    subject: "Welcome to {{company}}! 🎉",
    body: `Hi {{name}},

Thanks for signing up! We're excited to have you on board.

Here's what you can do next:
- Complete your profile
- Explore our features
- Join our community

If you have any questions, just reply to this email.

Best,
The {{company}} Team`,
    createdAt: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    updatedAt: format(subDays(new Date(), 10), "yyyy-MM-dd"),
  },
  {
    id: "t2",
    name: "Feature Highlight",
    subject: "Did you know about this feature?",
    body: `Hi {{name}},

Many of our users don't know about this powerful feature...

[Feature description here]

Give it a try and let us know what you think!

Best,
The {{company}} Team`,
    createdAt: format(subDays(new Date(), 20), "yyyy-MM-dd"),
    updatedAt: format(subDays(new Date(), 20), "yyyy-MM-dd"),
  },
  {
    id: "t3",
    name: "Re-engagement",
    subject: "We miss you, {{name}}!",
    body: `Hi {{name}},

We noticed you haven't logged in for a while. Is everything okay?

Here's what's new since your last visit:
- New feature A
- Improved feature B
- Bug fixes

Come back and check it out!

Best,
The {{company}} Team`,
    createdAt: format(subDays(new Date(), 15), "yyyy-MM-dd"),
    updatedAt: format(subDays(new Date(), 5), "yyyy-MM-dd"),
  },
];

export const mockSequences: Sequence[] = [
  {
    id: "seq1",
    name: "Welcome Series",
    description: "Onboarding sequence for new subscribers",
    status: "active",
    steps: [
      { id: "step1", sequenceId: "seq1", order: 1, delayDays: 0, delayHours: 0, templateId: "t1" },
      { id: "step2", sequenceId: "seq1", order: 2, delayDays: 2, delayHours: 0, templateId: "t2" },
      { id: "step3", sequenceId: "seq1", order: 3, delayDays: 5, delayHours: 0, templateId: "t3" },
    ],
    subscriberCount: 156,
    createdAt: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    updatedAt: format(subDays(new Date(), 2), "yyyy-MM-dd"),
  },
  {
    id: "seq2",
    name: "Trial Conversion",
    description: "Convert trial users to paid customers",
    status: "active",
    steps: [
      { id: "step4", sequenceId: "seq2", order: 1, delayDays: 3, delayHours: 0, templateId: "t2" },
      { id: "step5", sequenceId: "seq2", order: 2, delayDays: 7, delayHours: 0, templateId: "t3" },
    ],
    subscriberCount: 42,
    createdAt: format(subDays(new Date(), 14), "yyyy-MM-dd"),
    updatedAt: format(subDays(new Date(), 1), "yyyy-MM-dd"),
  },
  {
    id: "seq3",
    name: "Re-engagement Campaign",
    description: "Win back inactive users",
    status: "paused",
    steps: [
      { id: "step6", sequenceId: "seq3", order: 1, delayDays: 0, delayHours: 0, templateId: "t3" },
    ],
    subscriberCount: 89,
    createdAt: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    updatedAt: format(subDays(new Date(), 7), "yyyy-MM-dd"),
  },
];

export const mockEmails: Email[] = [
  { id: "e1", subscriberId: "s1", templateId: "t1", subject: "Welcome to FrameWork! 🎉", status: "opened", sentAt: format(subDays(new Date(), 2), "yyyy-MM-dd"), openedAt: format(subDays(new Date(), 2), "yyyy-MM-dd") },
  { id: "e2", subscriberId: "s2", templateId: "t1", subject: "Welcome to FrameWork! 🎉", status: "clicked", sentAt: format(subDays(new Date(), 1), "yyyy-MM-dd"), openedAt: format(subDays(new Date(), 1), "yyyy-MM-dd"), clickedAt: format(subDays(new Date(), 1), "yyyy-MM-dd") },
  { id: "e3", subscriberId: "s3", templateId: "t2", subject: "Did you know about this feature?", status: "sent", sentAt: format(subDays(new Date(), 1), "yyyy-MM-dd") },
  { id: "e4", subscriberId: "s4", templateId: "t3", subject: "We miss you!", status: "bounced", sentAt: format(subDays(new Date(), 3), "yyyy-MM-dd") },
];

export const mockStats: CampaignStats = {
  sent: 1250,
  delivered: 1200,
  opened: 480,
  clicked: 96,
  bounced: 50,
  openRate: 40,
  clickRate: 8,
};
