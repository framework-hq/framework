import { useState, useEffect } from "react";
import { Search, Plus, Mail, Tag, MoreVertical, UserMinus } from "lucide-react";
import { getSubscribers, createSubscriber, deleteSubscriber, updateSubscriber } from "../lib/api";
import type { Subscriber } from "../types";

export function SubscriberList() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadSubscribers();
  }, []);

  async function loadSubscribers() {
    const data = await getSubscribers();
    setSubscribers(data);
    setLoading(false);
  }

  async function handleAdd(email: string, name: string) {
    await createSubscriber({ email, name, status: "active", tags: [] });
    await loadSubscribers();
    setShowAddModal(false);
  }

  async function handleUnsubscribe(id: string) {
    await updateSubscriber(id, { status: "unsubscribed" });
    await loadSubscribers();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this subscriber?")) return;
    await deleteSubscriber(id);
    await loadSubscribers();
  }

  const filtered = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.name?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    active: "bg-green-100 text-green-700",
    unsubscribed: "bg-gray-100 text-gray-600",
    bounced: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
          <p className="text-gray-500">{subscribers.length} total subscribers</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          Add Subscriber
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search subscribers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {search ? "No subscribers match your search" : "No subscribers yet"}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {filtered.map((subscriber) => (
            <div key={subscriber.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                  {(subscriber.name || subscriber.email).charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {subscriber.name || subscriber.email}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${statusColors[subscriber.status]}`}>
                      {subscriber.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    {subscriber.email}
                  </div>
                  {subscriber.tags.length > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <Tag className="w-3 h-3 text-gray-400" />
                      {subscriber.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {subscriber.status === "active" && (
                  <button
                    onClick={() => handleUnsubscribe(subscriber.id)}
                    className="p-2 text-gray-400 hover:text-orange-600 rounded"
                    title="Unsubscribe"
                  >
                    <UserMinus className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(subscriber.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded"
                  title="Delete"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddSubscriberModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}

function AddSubscriberModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (email: string, name: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    onAdd(email, name);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Subscriber</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John Doe"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
