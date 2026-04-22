import AdminLayout, { AdminPageHeader, StatusBadge } from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Calendar,
  Check,
  ChevronDown,
  Filter,
  Mail,
  Phone,
  Search,
  X,
  Building2,
} from "lucide-react";
import { useState, useMemo } from "react";

type AppointmentStatus = "all" | "pending" | "confirmed" | "cancelled";

export default function AdminAppointments() {
  const utils = trpc.useUtils();
  const { data: appointments, isLoading } = trpc.admin.getAppointments.useQuery();
  const updateStatus = trpc.admin.updateAppointmentStatus.useMutation({
    onSuccess: () => {
      utils.admin.getAppointments.invalidate();
      utils.admin.getStats.invalidate();
      toast.success("Appointment status updated");
    },
    onError: () => {
      toast.error("Failed to update appointment status");
    },
  });

  const [statusFilter, setStatusFilter] = useState<AppointmentStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "date-asc" | "date-desc">("newest");

  const filtered = useMemo(() => {
    if (!appointments) return [];
    let result = [...appointments];

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((a) => a.status === statusFilter);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          `${a.firstName} ${a.lastName}`.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          (a.company ?? "").toLowerCase().includes(q) ||
          a.service.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortOrder === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortOrder === "date-asc") return a.appointmentDate.localeCompare(b.appointmentDate);
      if (sortOrder === "date-desc") return b.appointmentDate.localeCompare(a.appointmentDate);
      return 0;
    });

    return result;
  }, [appointments, statusFilter, searchQuery, sortOrder]);

  const counts = useMemo(() => {
    if (!appointments) return { all: 0, pending: 0, confirmed: 0, cancelled: 0 };
    return {
      all: appointments.length,
      pending: appointments.filter((a) => a.status === "pending").length,
      confirmed: appointments.filter((a) => a.status === "confirmed").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    };
  }, [appointments]);

  const handleStatusChange = (id: number, status: "pending" | "confirmed" | "cancelled") => {
    updateStatus.mutate({ id, status });
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Appointments"
        subtitle={`${counts.all} total · ${counts.pending} pending confirmation`}
        icon={Calendar}
      />

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, company, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
              className="pl-3 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 appearance-none bg-white cursor-pointer"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="date-asc">Appt Date ↑</option>
              <option value="date-desc">Appt Date ↓</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <Filter size={14} className="text-gray-400 self-center" />
          {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === s
                  ? "bg-[#0B1E3D] text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}{" "}
              <span className={statusFilter === s ? "text-white/60" : "text-gray-400"}>
                ({counts[s]})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse flex gap-4 items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-40" />
                  <div className="h-3 bg-gray-100 rounded w-56" />
                </div>
                <div className="h-6 bg-gray-100 rounded w-20" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-5">
            <Calendar size={40} className="text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              No appointments found
            </p>
            <p className="text-gray-400 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {searchQuery ? "Try adjusting your search query." : "No appointments match the selected filter."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table Header */}
            <div className="hidden lg:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 tracking-wide uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span>Client</span>
              <span>Service</span>
              <span>Appointment</span>
              <span>Status</span>
              <span>Booked</span>
              <span>Actions</span>
            </div>

            <div className="divide-y divide-gray-50">
              {filtered.map((appt) => (
                <div key={appt.id}>
                  {/* Main Row */}
                  <div
                    className="hidden lg:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === appt.id ? null : appt.id)}
                  >
                    <div>
                      <div className="font-semibold text-[#0B1E3D] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {appt.firstName} {appt.lastName}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                        <Mail size={10} />
                        {appt.email}
                      </div>
                    </div>
                    <div className="text-gray-600 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {appt.service}
                    </div>
                    <div>
                      <div className="text-[#0B1E3D] text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {appt.appointmentDate}
                      </div>
                      <div className="text-gray-400 text-xs">{appt.appointmentTime}</div>
                    </div>
                    <div>
                      <StatusBadge status={appt.status} />
                    </div>
                    <div className="text-gray-400 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {new Date(appt.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      {appt.status !== "confirmed" && (
                        <button
                          onClick={() => handleStatusChange(appt.id, "confirmed")}
                          disabled={updateStatus.isPending}
                          className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors disabled:opacity-50"
                          title="Confirm appointment"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      {appt.status !== "cancelled" && (
                        <button
                          onClick={() => handleStatusChange(appt.id, "cancelled")}
                          disabled={updateStatus.isPending}
                          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors disabled:opacity-50"
                          title="Cancel appointment"
                        >
                          <X size={14} />
                        </button>
                      )}
                      {appt.status !== "pending" && (
                        <button
                          onClick={() => handleStatusChange(appt.id, "pending")}
                          disabled={updateStatus.isPending}
                          className="w-8 h-8 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 flex items-center justify-center transition-colors disabled:opacity-50"
                          title="Reset to pending"
                        >
                          <Calendar size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div
                    className="lg:hidden px-4 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === appt.id ? null : appt.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0B1E3D]/10 flex items-center justify-center shrink-0">
                          <span className="text-[#0B1E3D] font-bold text-sm">{appt.firstName.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-[#0B1E3D] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {appt.firstName} {appt.lastName}
                          </div>
                          <div className="text-gray-400 text-xs">{appt.appointmentDate} · {appt.appointmentTime}</div>
                        </div>
                      </div>
                      <StatusBadge status={appt.status} />
                    </div>
                    <div className="mt-2 text-gray-500 text-xs pl-12" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {appt.service}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === appt.id && (
                    <div className="px-5 pb-5 pt-1 bg-[#F8F9FC] border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {appt.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={13} className="text-[#1E6FD9] shrink-0" />
                            <div>
                              <div className="text-gray-400 text-[10px] uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Email</div>
                              <a href={`mailto:${appt.email}`} className="text-[#0B1E3D] text-sm hover:text-[#1E6FD9] transition-colors" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                                {appt.email}
                              </a>
                            </div>
                          </div>
                        )}
                        {appt.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={13} className="text-[#1E6FD9] shrink-0" />
                            <div>
                              <div className="text-gray-400 text-[10px] uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Phone</div>
                              <a href={`tel:${appt.phone}`} className="text-[#0B1E3D] text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                                {appt.phone}
                              </a>
                            </div>
                          </div>
                        )}
                        {appt.company && (
                          <div className="flex items-center gap-2">
                            <Building2 size={13} className="text-[#1E6FD9] shrink-0" />
                            <div>
                              <div className="text-gray-400 text-[10px] uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Company</div>
                              <span className="text-[#0B1E3D] text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                                {appt.company}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      {appt.notes && (
                        <div className="bg-white rounded-lg p-3 border border-gray-100 mb-4">
                          <div className="text-gray-400 text-[10px] uppercase tracking-wide mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Notes</div>
                          <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                            {appt.notes}
                          </p>
                        </div>
                      )}
                      {/* Mobile action buttons */}
                      <div className="flex gap-2 lg:hidden" onClick={(e) => e.stopPropagation()}>
                        {appt.status !== "confirmed" && (
                          <button
                            onClick={() => handleStatusChange(appt.id, "confirmed")}
                            disabled={updateStatus.isPending}
                            className="flex-1 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            <Check size={14} /> Confirm
                          </button>
                        )}
                        {appt.status !== "cancelled" && (
                          <button
                            onClick={() => handleStatusChange(appt.id, "cancelled")}
                            disabled={updateStatus.isPending}
                            className="flex-1 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            <X size={14} /> Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer count */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Showing {filtered.length} of {counts.all} appointments
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
