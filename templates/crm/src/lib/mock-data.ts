import type { Contact, Note, Tag } from "../types";

// Mock data for demo mode (no Supabase connection)
export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@techcorp.com",
    phone: "+1 555-0123",
    company: "TechCorp",
    title: "CTO",
    tags: ["customer", "enterprise"],
    created_at: "2025-01-15T10:00:00Z",
    updated_at: "2025-02-20T14:30:00Z",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@startupxyz.io",
    phone: "+1 555-0456",
    company: "StartupXYZ",
    title: "Founder",
    tags: ["lead", "startup"],
    created_at: "2025-02-01T09:00:00Z",
    updated_at: "2025-02-25T11:00:00Z",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@scaleup.co",
    phone: "+1 555-0789",
    company: "ScaleUp",
    title: "Engineering Lead",
    tags: ["customer"],
    created_at: "2025-02-10T15:00:00Z",
    updated_at: "2025-02-24T16:45:00Z",
  },
  {
    id: "4",
    name: "Alex Kim",
    email: "alex@design.studio",
    company: "Design Studio",
    title: "Creative Director",
    tags: ["partner"],
    created_at: "2025-02-15T11:00:00Z",
    updated_at: "2025-02-15T11:00:00Z",
  },
  {
    id: "5",
    name: "Jordan Lee",
    email: "jordan@ventures.vc",
    phone: "+1 555-1234",
    company: "Ventures VC",
    title: "Partner",
    tags: ["investor", "vip"],
    created_at: "2025-02-18T08:00:00Z",
    updated_at: "2025-02-26T09:30:00Z",
  },
];

export const mockNotes: Note[] = [
  {
    id: "n1",
    contact_id: "1",
    content: "Great call today. Interested in enterprise plan. Follow up next week.",
    created_at: "2025-02-20T14:30:00Z",
    updated_at: "2025-02-20T14:30:00Z",
  },
  {
    id: "n2",
    contact_id: "1",
    content: "Sent proposal for 50 seats. Waiting for procurement approval.",
    created_at: "2025-02-18T10:00:00Z",
    updated_at: "2025-02-18T10:00:00Z",
  },
  {
    id: "n3",
    contact_id: "2",
    content: "Met at conference. Building a new product, could use our templates.",
    created_at: "2025-02-25T11:00:00Z",
    updated_at: "2025-02-25T11:00:00Z",
  },
  {
    id: "n4",
    contact_id: "5",
    content: "Discussed potential investment. Wants to see Q2 metrics.",
    created_at: "2025-02-26T09:30:00Z",
    updated_at: "2025-02-26T09:30:00Z",
  },
];

export const mockTags: Tag[] = [
  { id: "t1", name: "customer", color: "#22c55e" },
  { id: "t2", name: "lead", color: "#3b82f6" },
  { id: "t3", name: "enterprise", color: "#8b5cf6" },
  { id: "t4", name: "startup", color: "#f59e0b" },
  { id: "t5", name: "partner", color: "#ec4899" },
  { id: "t6", name: "investor", color: "#14b8a6" },
  { id: "t7", name: "vip", color: "#ef4444" },
];
