import { Outlet, Link, useLocation } from "react-router-dom";
import { FileText, Users, Settings, PlusCircle } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: FileText, label: "Invoices" },
    { path: "/clients", icon: Users, label: "Clients", disabled: true },
    { path: "/settings", icon: Settings, label: "Settings", disabled: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Invoices</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <Link
            to="/new"
            className="flex items-center gap-2 w-full px-4 py-2 mb-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            New Invoice
          </Link>

          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                {item.disabled ? (
                  <span className="flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed">
                    <item.icon className="w-5 h-5" />
                    {item.label}
                    <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded">Soon</span>
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <a
            href="https://github.com/framework-hq/framework"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Built with FrameWork
          </a>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
