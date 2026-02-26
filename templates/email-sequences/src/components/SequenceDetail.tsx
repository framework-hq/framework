import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, Plus, Mail, Clock, Trash2 } from "lucide-react";
import { getSequence, updateSequence, getTemplates } from "../lib/api";
import type { Sequence, EmailTemplate } from "../types";

export function SequenceDetail() {
  const { id } = useParams<{ id: string }>();
  const [sequence, setSequence] = useState<Sequence | null>(null);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && id !== "new") {
      loadSequence(id);
    } else {
      setLoading(false);
    }
    loadTemplates();
  }, [id]);

  async function loadSequence(seqId: string) {
    const data = await getSequence(seqId);
    setSequence(data);
    setLoading(false);
  }

  async function loadTemplates() {
    const data = await getTemplates();
    setTemplates(data);
  }

  async function toggleStatus() {
    if (!sequence || !id) return;
    const newStatus = sequence.status === "active" ? "paused" : "active";
    await updateSequence(id, { status: newStatus });
    await loadSequence(id);
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  if (!sequence && id !== "new") {
    return (
      <div className="p-6">
        <p className="text-gray-500">Sequence not found</p>
        <Link to="/sequences" className="text-indigo-600 hover:underline">
          Back to sequences
        </Link>
      </div>
    );
  }

  // New sequence form
  if (id === "new") {
    return <NewSequenceForm templates={templates} />;
  }

  const statusColors = {
    draft: "bg-gray-100 text-gray-600",
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-6 max-w-4xl">
      <Link
        to="/sequences"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to sequences
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{sequence!.name}</h1>
              <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[sequence!.status]}`}>
                {sequence!.status}
              </span>
            </div>
            {sequence!.description && (
              <p className="text-gray-500">{sequence!.description}</p>
            )}
            <p className="text-sm text-gray-400 mt-2">
              {sequence!.subscriberCount} subscribers enrolled
            </p>
          </div>
          <button
            onClick={toggleStatus}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              sequence!.status === "active"
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {sequence!.status === "active" ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Activate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Sequence Steps</h2>
          <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
            <Plus className="w-4 h-4" />
            Add Step
          </button>
        </div>

        {sequence!.steps.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            No steps yet. Add your first email step.
          </p>
        ) : (
          <div className="space-y-4">
            {sequence!.steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {index === 0
                        ? "Immediately"
                        : `Wait ${step.delayDays} day${step.delayDays !== 1 ? "s" : ""}${
                            step.delayHours > 0 ? ` ${step.delayHours}h` : ""
                          }`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <span className="font-medium text-gray-900">
                      {step.template?.name || "Unknown template"}
                    </span>
                  </div>
                  {step.template && (
                    <p className="text-sm text-gray-500 mt-1 ml-6">
                      Subject: {step.template.subject}
                    </p>
                  )}
                </div>
                <button className="p-2 text-gray-400 hover:text-red-600">
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

function NewSequenceForm({ templates: _templates }: { templates: EmailTemplate[] }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="p-6 max-w-2xl">
      <Link
        to="/sequences"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to sequences
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Sequence</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sequence Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Welcome Series"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Onboarding sequence for new subscribers"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Create Sequence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
