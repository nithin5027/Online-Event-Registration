import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Menu, X, MessageSquare, Info, Layers, Mail, Plus } from 'lucide-react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Chat', icon: MessageSquare },
    { path: '/about', label: 'About', icon: Info },
    { path: '/services', label: 'Services', icon: Layers },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-[#343541] text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-[#202123] transition-all duration-300 flex flex-col overflow-hidden`}
      >
        <div className="p-3 border-b border-white/10">
          <button
            className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => {}}
          >
            <Plus size={18} />
            <span className="text-sm font-medium">New chat</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                  active
                    ? 'bg-[#343541] text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="px-3 py-2 text-xs text-gray-400">
            AI Assistant v1.0
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-14 border-b border-white/10 flex items-center px-4 gap-3 bg-[#343541]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-md transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-lg font-medium">
            {navItems.find((item) => isActive(item.path))?.label || 'Chat'}
          </h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
