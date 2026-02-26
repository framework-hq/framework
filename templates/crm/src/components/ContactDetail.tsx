import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Trash2,
  Edit2,
  Plus,
} from "lucide-react";
import type { ContactWithNotes } from "../types";
import { getContact, deleteContact, createNote, deleteNote } from "../lib/api";
import { TagBadge } from "./TagBadge";

export function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<ContactWithNotes | null>(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    if (id) loadContact(id);
  }, [id]);

  async function loadContact(contactId: string) {
    try {
      const data = await getContact(contactId);
      setContact(data);
    } catch (error) {
      console.error("Failed to load contact:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!id || !confirm("Are you sure you want to delete this contact?")) return;
    try {
      await deleteContact(id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  }

  async function handleAddNote() {
    if (!id || !newNote.trim()) return;
    setAddingNote(true);
    try {
      await createNote(id, newNote.trim());
      setNewNote("");
      await loadContact(id);
    } catch (error) {
      console.error("Failed to add note:", error);
    } finally {
      setAddingNote(false);
    }
  }

  async function handleDeleteNote(noteId: string) {
    if (!id || !confirm("Delete this note?")) return;
    try {
      await deleteNote(noteId);
      await loadContact(id);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading contact...</div>
    );
  }

  if (!contact) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">Contact not found</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          Back to contacts
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to contacts
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {contact.tags.map((tag) => (
                  <TagBadge key={tag} name={tag} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-5 h-5 text-gray-400" />
            <a href={`mailto:${contact.email}`} className="hover:text-indigo-600">
              {contact.email}
            </a>
          </div>
          {contact.phone && (
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5 text-gray-400" />
              <a href={`tel:${contact.phone}`} className="hover:text-indigo-600">
                {contact.phone}
              </a>
            </div>
          )}
          {contact.company && (
            <div className="flex items-center gap-3 text-gray-600">
              <Building2 className="w-5 h-5 text-gray-400" />
              {contact.company}
            </div>
          )}
          {contact.title && (
            <div className="flex items-center gap-3 text-gray-600">
              <Briefcase className="w-5 h-5 text-gray-400" />
              {contact.title}
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>

        {/* Add note */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
          />
          <button
            onClick={handleAddNote}
            disabled={addingNote || !newNote.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {addingNote ? "..." : <><Plus className="w-4 h-4" /> Add</>}
          </button>
        </div>

        {/* Notes list */}
        {contact.notes.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No notes yet</p>
        ) : (
          <div className="space-y-3">
            {contact.notes.map((note) => (
              <div
                key={note.id}
                className="p-3 bg-gray-50 rounded-lg group relative"
              >
                <p className="text-gray-700">{note.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(note.created_at).toLocaleDateString()} at{" "}
                  {new Date(note.created_at).toLocaleTimeString()}
                </p>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
