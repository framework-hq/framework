import { supabase, isDemoMode } from "./supabase";
import type { Contact, Note, Tag, ContactWithNotes } from "../types";
import { mockContacts, mockNotes, mockTags } from "./mock-data";

// ============================================
// CONTACTS
// ============================================

export async function getContacts(): Promise<Contact[]> {
  if (isDemoMode) {
    return mockContacts;
  }

  const { data, error } = await supabase!
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getContact(id: string): Promise<ContactWithNotes | null> {
  if (isDemoMode) {
    const contact = mockContacts.find((c) => c.id === id);
    if (!contact) return null;
    const notes = mockNotes.filter((n) => n.contact_id === id);
    return { ...contact, notes };
  }

  const { data: contact, error: contactError } = await supabase!
    .from("contacts")
    .select("*")
    .eq("id", id)
    .single();

  if (contactError) throw contactError;
  if (!contact) return null;

  const { data: notes, error: notesError } = await supabase!
    .from("notes")
    .select("*")
    .eq("contact_id", id)
    .order("created_at", { ascending: false });

  if (notesError) throw notesError;

  return { ...contact, notes: notes || [] };
}

export async function createContact(
  contact: Omit<Contact, "id" | "created_at" | "updated_at">
): Promise<Contact> {
  if (isDemoMode) {
    const newContact: Contact = {
      ...contact,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockContacts.unshift(newContact);
    return newContact;
  }

  const { data, error } = await supabase!
    .from("contacts")
    .insert(contact)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateContact(
  id: string,
  updates: Partial<Contact>
): Promise<Contact> {
  if (isDemoMode) {
    const index = mockContacts.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Contact not found");
    mockContacts[index] = {
      ...mockContacts[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return mockContacts[index];
  }

  const { data, error } = await supabase!
    .from("contacts")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteContact(id: string): Promise<void> {
  if (isDemoMode) {
    const index = mockContacts.findIndex((c) => c.id === id);
    if (index !== -1) mockContacts.splice(index, 1);
    return;
  }

  const { error } = await supabase!.from("contacts").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// NOTES
// ============================================

export async function createNote(
  contactId: string,
  content: string
): Promise<Note> {
  if (isDemoMode) {
    const newNote: Note = {
      id: crypto.randomUUID(),
      contact_id: contactId,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockNotes.unshift(newNote);
    return newNote;
  }

  const { data, error } = await supabase!
    .from("notes")
    .insert({ contact_id: contactId, content })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  if (isDemoMode) {
    const index = mockNotes.findIndex((n) => n.id === id);
    if (index !== -1) mockNotes.splice(index, 1);
    return;
  }

  const { error } = await supabase!.from("notes").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// TAGS
// ============================================

export async function getTags(): Promise<Tag[]> {
  if (isDemoMode) {
    return mockTags;
  }

  const { data, error } = await supabase!.from("tags").select("*");
  if (error) throw error;
  return data || [];
}

export async function createTag(name: string, color: string): Promise<Tag> {
  if (isDemoMode) {
    const newTag: Tag = { id: crypto.randomUUID(), name, color };
    mockTags.push(newTag);
    return newTag;
  }

  const { data, error } = await supabase!
    .from("tags")
    .insert({ name, color })
    .select()
    .single();

  if (error) throw error;
  return data;
}
