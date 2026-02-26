import { mockTags } from "../lib/mock-data";

interface TagBadgeProps {
  name: string;
}

const defaultColors: Record<string, string> = {
  customer: "#22c55e",
  lead: "#3b82f6",
  enterprise: "#8b5cf6",
  startup: "#f59e0b",
  partner: "#ec4899",
  investor: "#14b8a6",
  vip: "#ef4444",
};

export function TagBadge({ name }: TagBadgeProps) {
  const tag = mockTags.find((t) => t.name === name);
  const color = tag?.color || defaultColors[name] || "#6b7280";

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {name}
    </span>
  );
}
