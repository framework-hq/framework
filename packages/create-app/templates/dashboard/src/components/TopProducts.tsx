import { topProducts } from "../data/mock";

export function TopProducts() {
  const maxRevenue = Math.max(...topProducts.map((p) => p.revenue));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Products</h3>

      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-400 w-5">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {product.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">
                  ${product.revenue.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {product.sales} sales
                </span>
              </div>
            </div>
            <div className="ml-8">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${(product.revenue / maxRevenue) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
