export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  avatar_url?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  contact_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface ContactWithNotes extends Contact {
  notes: Note[];
}
