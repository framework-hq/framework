import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, GripVertical } from "lucide-react";
import { getStages, getDealsByStage, moveDeal } from "../lib/api";
import type { Deal, Stage } from "../types";

export function Pipeline() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [dealsByStage, setDealsByStage] = useState<Record<string, Deal[]>>({});
  const [loading, setLoading] = useState(true);
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [s, d] = await Promise.all([getStages(), getDealsByStage()]);
    setStages(s);
    setDealsByStage(d);
    setLoading(false);
  }

  async function handleDrop(stageId: string) {
    if (!draggedDeal || draggedDeal.stage.id === stageId) {
      setDraggedDeal(null);
      return;
    }

    await moveDeal(draggedDeal.id, stageId);
    await loadData();
    setDraggedDeal(null);
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
          <p className="text-gray-500">Drag deals between stages</p>
        </div>
        <Link
          to="/deals/new"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          New Deal
        </Link>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = dealsByStage[stage.id] || [];
          const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={stage.id}
              className="flex-shrink-0 w-80"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(stage.id)}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="font-medium text-gray-900">{stage.name}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ${totalValue.toLocaleString()}
                </span>
              </div>

              {/* Deals Column */}
              <div className="bg-gray-100 rounded-lg p-2 min-h-[400px]">
                {stageDeals.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No deals
                  </div>
                ) : (
                  <div className="space-y-2">
                    {stageDeals.map((deal) => (
                      <DealCard
                        key={deal.id}
                        deal={deal}
                        onDragStart={() => setDraggedDeal(deal)}
                        isDragging={draggedDeal?.id === deal.id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DealCard({
  deal,
  onDragStart,
  isDragging,
}: {
  deal: Deal;
  onDragStart: () => void;
  isDragging: boolean;
}) {
  return (
    <Link
      to={`/deals/${deal.id}`}
      draggable
      onDragStart={onDragStart}
      className={`block bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{deal.name}</h4>
          <p className="text-sm text-gray-500 truncate">
            {deal.contact?.company || deal.contact?.name || "No contact"}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold text-gray-900">
              ${deal.value.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">{deal.probability}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
