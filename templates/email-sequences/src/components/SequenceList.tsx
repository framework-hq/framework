import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, GitBranch, Play, Pause, Users, ArrowRight } from "lucide-react";
import { getSequences, updateSequence } from "../lib/api";
import type { Sequence } from "../types";

export function SequenceList() {
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSequences();
  }, []);

  async function loadSequences() {
    const data = await getSequences();
    setSequences(data);
    setLoading(false);
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    await updateSequence(id, { status: newStatus });
    await loadSequences();
  }

  const statusConfig = {
    draft: { label: "Draft", color: "bg-gray-100 text-gray-600" },
    active: { label: "Active", color: "bg-green-100 text-green-700" },
    paused: { label: "Paused", color: "bg-yellow-100 text-yellow-700" },
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sequences</h1>
          <p className="text-gray-500">Automated email drip campaigns</p>
        </div>
        <Link
          to="/sequences/new"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          New Sequence
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : sequences.length === 0 ? (
        <div className="text-center py-12">
          <GitBranch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No sequences yet</p>
          <Link
            to="/sequences/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create your first sequence
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sequences.map((sequence) => {
            const status = statusConfig[sequence.status];
            return (
              <div
                key={sequence.id}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <GitBranch className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{sequence.name}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      {sequence.description && (
                        <p className="text-sm text-gray-500">{sequence.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span>{sequence.steps.length} steps</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {sequence.subscriberCount} subscribers
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {sequence.status !== "draft" && (
                      <button
                        onClick={() => toggleStatus(sequence.id, sequence.status)}
                        className={`p-2 rounded-lg ${
                          sequence.status === "active"
                            ? "text-yellow-600 hover:bg-yellow-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                        title={sequence.status === "active" ? "Pause" : "Activate"}
                      >
                        {sequence.status === "active" ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                    )}
                    <Link
                      to={`/sequences/${sequence.id}`}
                      className="flex items-center gap-1 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                    >
                      View <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
