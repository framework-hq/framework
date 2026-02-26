import { Outlet, Link } from "react-router-dom";
import { Users, Settings, BarChart3 } from "lucide-react";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">MiniCRM</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="w-5 h-5" />
                Contacts
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-gray-400 rounded-lg cursor-not-allowed"
              >
                <BarChart3 className="w-5 h-5" />
                Reports
                <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded">Soon</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-gray-400 rounded-lg cursor-not-allowed"
              >
                <Settings className="w-5 h-5" />
                Settings
                <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded">Soon</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Footer */}
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

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
