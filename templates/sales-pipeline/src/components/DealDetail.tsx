import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Building2, Calendar, DollarSign, Trash2, Plus, Check } from "lucide-react";
import { getDeal, deleteDeal, updateDeal, getAllStages, createActivity, updateActivity } from "../lib/api";
import type { Deal, Stage } from "../types";
import { format } from "date-fns";

export function DealDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newActivity, setNewActivity] = useState("");

  useEffect(() => {
    if (id && id !== "new") {
      loadDeal(id);
    } else {
      setLoading(false);
    }
    loadStages();
  }, [id]);

  async function loadDeal(dealId: string) {
    const data = await getDeal(dealId);
    setDeal(data);
    setLoading(false);
  }

  async function loadStages() {
    const data = await getAllStages();
    setStages(data);
  }

  async function handleDelete() {
    if (!id || !confirm("Delete this deal?")) return;
    await deleteDeal(id);
    navigate("/deals");
  }

  async function handleStageChange(stageId: string) {
    if (!id || !deal) return;
    const stage = stages.find((s) => s.id === stageId);
    if (!stage) return;
    await updateDeal(id, { stage, probability: stage.probability });
    await loadDeal(id);
  }

  async function handleAddActivity() {
    if (!id || !newActivity.trim()) return;
    await createActivity({
      dealId: id,
      type: "note",
      description: newActivity.trim(),
      completed: false,
    });
    setNewActivity("");
    await loadDeal(id);
  }

  async function toggleActivityComplete(activityId: string, completed: boolean) {
    await updateActivity(activityId, { completed: !completed });
    if (id) await loadDeal(id);
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  if (!deal && id !== "new") {
    return (
      <div className="p-6">
        <p className="text-gray-500">Deal not found</p>
        <Link to="/deals" className="text-indigo-600 hover:underline">
          Back to deals
        </Link>
      </div>
    );
  }

  if (id === "new") {
    return <NewDealForm stages={stages} />;
  }

  return (
    <div className="p-6 max-w-4xl">
      <Link
        to="/pipeline"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to pipeline
      </Link>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Deal Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{deal!.name}</h1>
                <p className="text-gray-500">{deal!.contact?.company || deal!.contact?.name}</p>
              </div>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-600">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <span className="font-semibold text-xl">${deal!.value.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Close: {format(new Date(deal!.expectedCloseDate), "MMM d, yyyy")}</span>
              </div>
            </div>

            {deal!.notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600">{deal!.notes}</p>
              </div>
            )}
          </div>

          {/* Activities */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activities</h2>

            {/* Add Activity */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                placeholder="Add a note or activity..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => e.key === "Enter" && handleAddActivity()}
              />
              <button
                onClick={handleAddActivity}
                disabled={!newActivity.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {deal!.activities.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No activities yet</p>
            ) : (
              <div className="space-y-3">
                {deal!.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <button
                      onClick={() => toggleActivityComplete(activity.id, activity.completed)}
                      className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center ${
                        activity.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-indigo-500"
                      }`}
                    >
                      {activity.completed && <Check className="w-3 h-3" />}
                    </button>
                    <div className="flex-1">
                      <p className={activity.completed ? "text-gray-400 line-through" : "text-gray-700"}>
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {format(new Date(activity.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stage */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Stage</h3>
            <select
              value={deal!.stage.id}
              onChange={(e) => handleStageChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.name}
                </option>
              ))}
            </select>
            <div className="mt-2 text-sm text-gray-500">
              Probability: {deal!.probability}%
            </div>
          </div>

          {/* Contact */}
          {deal!.contact && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Contact</h3>
              <p className="font-medium text-gray-900">{deal!.contact.name}</p>
              {deal!.contact.company && (
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Building2 className="w-4 h-4" />
                  {deal!.contact.company}
                </p>
              )}
              {deal!.contact.email && (
                <a
                  href={`mailto:${deal!.contact.email}`}
                  className="text-sm text-indigo-600 hover:underline flex items-center gap-1 mt-1"
                >
                  <Mail className="w-4 h-4" />
                  {deal!.contact.email}
                </a>
              )}
              {deal!.contact.phone && (
                <a
                  href={`tel:${deal!.contact.phone}`}
                  className="text-sm text-indigo-600 hover:underline flex items-center gap-1 mt-1"
                >
                  <Phone className="w-4 h-4" />
                  {deal!.contact.phone}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NewDealForm({ stages }: { stages: Stage[] }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [stageId, setStageId] = useState("lead");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In real app, would create deal via API
    navigate("/pipeline");
  }

  return (
    <div className="p-6 max-w-2xl">
      <Link
        to="/pipeline"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to pipeline
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Deal</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deal Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Acme Corp Enterprise Deal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
          <input
            type="number"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="10000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
          <select
            value={stageId}
            onChange={(e) => setStageId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {stages.filter(s => s.id !== "won" && s.id !== "lost").map((stage) => (
              <option key={stage.id} value={stage.id}>{stage.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Create Deal
        </button>
      </form>
    </div>
  );
}
