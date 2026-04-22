import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  BarChart3,
  Calendar,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Shield,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const adminMenuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: Calendar, label: "Appointments", path: "/admin/appointments" },
  { icon: Mail, label: "Contact Submissions", path: "/admin/contacts" },
];

function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [location] = useLocation();
  const { user } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0B1E3D] z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1E6FD9, #D4A843)" }}>
              <Shield size={14} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                CCM Admin
              </div>
              <div className="text-white/40 text-[10px] mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Management Portal
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="text-white/30 text-[10px] font-semibold tracking-widest uppercase px-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Management
          </div>
          {adminMenuItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <span
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-[#1E6FD9] text-white shadow-lg shadow-[#1E6FD9]/25"
                      : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  onClick={onClose}
                >
                  <item.icon size={16} className={isActive ? "text-white" : "text-white/50"} />
                  {item.label}
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/10">
            <div className="text-white/30 text-[10px] font-semibold tracking-widest uppercase px-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quick Links
            </div>
            <Link href="/">
              <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <ExternalLink size={16} className="text-white/50" />
                View Website
              </span>
            </Link>
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-[#1E6FD9]/30 flex items-center justify-center shrink-0">
              <span className="text-[#1E6FD9] font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {user?.name?.charAt(0).toUpperCase() ?? "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {user?.name ?? "Admin"}
              </div>
              <div className="text-white/40 text-xs mt-0.5 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {user?.email ?? ""}
              </div>
            </div>
            <button
              onClick={() => logoutMutation.mutate()}
              className="text-white/40 hover:text-red-400 transition-colors p-1 rounded"
              title="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F2F7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#1E6FD9] border-t-transparent animate-spin" />
          <p className="text-[#0B1E3D]/60 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Loading admin portal...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B1E3D] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          {/* Logo */}
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0B1E3D, #1E6FD9)" }}>
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0B1E3D] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Admin Portal
          </h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            This area is restricted to authorized administrators of Creative Cyber Management. Please sign in with your admin account to continue.
          </p>
          <button
            onClick={() => { window.location.href = getLoginUrl(); }}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all hover:brightness-110 flex items-center justify-center gap-2"
            style={{ backgroundColor: "#0B1E3D", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Shield size={16} />
            Sign In to Admin Portal
          </button>
          <p className="text-gray-400 text-xs mt-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Only users with admin role can access this dashboard.
          </p>
          <Link href="/">
            <span className="text-[#1E6FD9] text-sm hover:underline cursor-pointer mt-4 inline-block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ← Back to website
            </span>
          </Link>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0B1E3D] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-red-50">
            <Shield size={28} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#0B1E3D] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Access Denied
          </h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Your account (<strong>{user.email}</strong>) does not have admin privileges. Please contact the site owner to request access.
          </p>
          <Link href="/">
            <span className="text-[#1E6FD9] text-sm hover:underline cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ← Back to website
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F7] flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area — offset by sidebar on desktop */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header className="lg:hidden h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#0B1E3D] p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#1E6FD9]" />
            <span className="font-bold text-[#0B1E3D] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              CCM Admin
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#1E6FD9]/20 flex items-center justify-center">
            <span className="text-[#1E6FD9] font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {user?.name?.charAt(0).toUpperCase() ?? "A"}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// Stat card used across admin pages
export function StatCard({
  icon: Icon,
  label,
  value,
  color = "blue",
  subtitle,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color?: "blue" | "gold" | "green" | "red" | "navy";
  subtitle?: string;
}) {
  const colorMap = {
    blue: { bg: "bg-[#1E6FD9]/10", icon: "text-[#1E6FD9]", value: "text-[#1E6FD9]" },
    gold: { bg: "bg-[#D4A843]/10", icon: "text-[#D4A843]", value: "text-[#D4A843]" },
    green: { bg: "bg-emerald-50", icon: "text-emerald-600", value: "text-emerald-600" },
    red: { bg: "bg-red-50", icon: "text-red-500", value: "text-red-500" },
    navy: { bg: "bg-[#0B1E3D]/10", icon: "text-[#0B1E3D]", value: "text-[#0B1E3D]" },
  };
  const c = colorMap[color];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
          <Icon size={18} className={c.icon} />
        </div>
      </div>
      <div className={`text-3xl font-bold mb-1 ${c.value}`} style={{ fontFamily: "'Playfair Display', serif" }}>
        {value}
      </div>
      <div className="text-gray-500 text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </div>
      {subtitle && (
        <div className="text-gray-400 text-xs mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

// Status badge used in tables
export function StatusBadge({ status }: { status: "pending" | "confirmed" | "cancelled" }) {
  const map = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[status]}`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// Page header used across admin pages
export function AdminPageHeader({
  title,
  subtitle,
  icon: Icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-6 sm:mb-8">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-[#0B1E3D] flex items-center justify-center shadow-md">
          <Icon size={20} className="text-[#D4A843]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0B1E3D]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
