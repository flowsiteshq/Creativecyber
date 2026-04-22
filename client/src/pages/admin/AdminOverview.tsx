import AdminLayout, { AdminPageHeader, StatCard, StatusBadge } from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Link } from "wouter";

export default function AdminOverview() {
  const { data: stats, isLoading: statsLoading } = trpc.admin.getStats.useQuery();
  const { data: appointments, isLoading: apptLoading } = trpc.admin.getAppointments.useQuery();
  const { data: contacts, isLoading: contactsLoading } = trpc.admin.getContacts.useQuery();

  // Get the 5 most recent appointments
  const recentAppointments = appointments
    ? [...appointments]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
    : [];

  // Get the 3 most recent contacts
  const recentContacts = contacts
    ? [...contacts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)
    : [];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Dashboard Overview"
        subtitle={`Welcome back — here's what's happening at Creative Cyber Management`}
        icon={Activity}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm animate-pulse">
              <div className="w-10 h-10 bg-gray-100 rounded-lg mb-4" />
              <div className="h-8 bg-gray-100 rounded w-16 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-24" />
            </div>
          ))
        ) : (
          <>
            <StatCard
              icon={Calendar}
              label="Total Appointments"
              value={stats?.totalAppointments ?? 0}
              color="navy"
            />
            <StatCard
              icon={Clock}
              label="Pending"
              value={stats?.pendingAppointments ?? 0}
              color="gold"
              subtitle="Awaiting confirmation"
            />
            <StatCard
              icon={CheckCircle2}
              label="Confirmed"
              value={stats?.confirmedAppointments ?? 0}
              color="green"
            />
            <StatCard
              icon={Mail}
              label="Contact Inquiries"
              value={stats?.totalContacts ?? 0}
              color="blue"
            />
          </>
        )}
      </div>

      {/* Two-column layout: Recent Appointments + Recent Contacts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Appointments — takes 2/3 width */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#1E6FD9]" />
              <h2 className="font-bold text-[#0B1E3D] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Recent Appointments
              </h2>
            </div>
            <Link href="/admin/appointments">
              <span className="text-[#1E6FD9] text-xs font-medium hover:underline cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                View all →
              </span>
            </Link>
          </div>

          {apptLoading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse flex gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-32" />
                    <div className="h-3 bg-gray-100 rounded w-48" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-5">
              <Calendar size={32} className="text-gray-200 mb-3" />
              <p className="text-gray-400 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                No appointments yet
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentAppointments.map((appt) => (
                <div key={appt.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[#0B1E3D]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#0B1E3D] font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {appt.firstName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-[#0B1E3D] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {appt.firstName} {appt.lastName}
                      </span>
                      <StatusBadge status={appt.status} />
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {appt.service} · {appt.appointmentDate} at {appt.appointmentTime}
                    </div>
                  </div>
                  <div className="text-gray-300 text-xs shrink-0 hidden sm:block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {new Date(appt.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contacts — takes 1/3 width */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#1E6FD9]" />
              <h2 className="font-bold text-[#0B1E3D] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Recent Inquiries
              </h2>
            </div>
            <Link href="/admin/contacts">
              <span className="text-[#1E6FD9] text-xs font-medium hover:underline cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                View all →
              </span>
            </Link>
          </div>

          {contactsLoading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-28" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
              ))}
            </div>
          ) : recentContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-5">
              <Mail size={32} className="text-gray-200 mb-3" />
              <p className="text-gray-400 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                No inquiries yet
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="font-semibold text-[#0B1E3D] text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {contact.firstName} {contact.lastName}
                  </div>
                  <div className="text-[#1E6FD9] text-xs mb-2 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {contact.email}
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {contact.message}
                  </p>
                  <div className="text-gray-300 text-xs mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Bar */}
      {!statsLoading && stats && (
        <div className="mt-6 bg-[#0B1E3D] rounded-xl p-5 flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-[#D4A843]" />
            <span className="text-white/70 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Appointment completion rate:
            </span>
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {stats.totalAppointments > 0
                ? Math.round((stats.confirmedAppointments / stats.totalAppointments) * 100)
                : 0}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-red-400" />
            <span className="text-white/70 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Cancelled:
            </span>
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {stats.cancelledAppointments}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-[#1E6FD9]" />
            <span className="text-white/70 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Total inquiries:
            </span>
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {stats.totalContacts}
            </span>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
