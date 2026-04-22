import AdminLayout, { AdminPageHeader } from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import {
  Building2,
  Mail,
  MessageSquare,
  Search,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useState, useMemo } from "react";

export default function AdminContacts() {
  const { data: contacts, isLoading } = trpc.admin.getContacts.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!contacts) return [];
    let result = [...contacts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.company ?? "").toLowerCase().includes(q) ||
          c.message.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return result;
  }, [contacts, searchQuery, sortOrder]);

  const selectedContact = contacts?.find((c) => c.id === selectedId) ?? null;

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Contact Submissions"
        subtitle={`${contacts?.length ?? 0} total inquiries from the contact form`}
        icon={Mail}
      />

      <div className="flex flex-col xl:flex-row gap-5">
        {/* Left: List */}
        <div className="xl:w-[420px] shrink-0">
          {/* Search & Sort */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
            <div className="relative mb-3">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 focus:border-[#1E6FD9] transition-all"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              />
            </div>
            <div className="relative">
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                className="w-full pl-3 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/30 appearance-none bg-white cursor-pointer"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Contact List */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-5 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-32" />
                    <div className="h-3 bg-gray-100 rounded w-48" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-5">
                <Mail size={36} className="text-gray-200 mb-3" />
                <p className="text-gray-400 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  No contact submissions found
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedId(selectedId === contact.id ? null : contact.id)}
                    className={`w-full text-left px-4 py-4 hover:bg-gray-50/50 transition-colors ${
                      selectedId === contact.id ? "bg-[#1E6FD9]/5 border-l-2 border-[#1E6FD9]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0B1E3D]/10 flex items-center justify-center shrink-0">
                          <span className="text-[#0B1E3D] font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {contact.firstName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-[#0B1E3D] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {contact.firstName} {contact.lastName}
                          </div>
                          {contact.company && (
                            <div className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                              <Building2 size={10} />
                              {contact.company}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-gray-300 text-xs shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2 pl-12 line-clamp-2 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {contact.message}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {!isLoading && filtered.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {filtered.length} of {contacts?.length ?? 0} submissions
              </div>
            )}
          </div>
        </div>

        {/* Right: Detail View */}
        <div className="flex-1">
          {selectedContact ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-[#0B1E3D] to-[#1E6FD9]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {selectedContact.firstName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {selectedContact.firstName} {selectedContact.lastName}
                      </h2>
                      {selectedContact.company && (
                        <p className="text-white/70 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {selectedContact.company}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-white/50 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1E6FD9]/10 flex items-center justify-center shrink-0">
                      <Mail size={15} className="text-[#1E6FD9]" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Email</div>
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-[#0B1E3D] text-sm font-medium hover:text-[#1E6FD9] transition-colors flex items-center gap-1"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {selectedContact.email}
                        <ExternalLink size={11} className="text-gray-400" />
                      </a>
                    </div>
                  </div>
                  {selectedContact.company && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#D4A843]/10 flex items-center justify-center shrink-0">
                        <Building2 size={15} className="text-[#D4A843]" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px] uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Organization</div>
                        <span className="text-[#0B1E3D] text-sm font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                          {selectedContact.company}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare size={15} className="text-[#1E6FD9]" />
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Message
                  </h3>
                </div>
                <div className="bg-[#F8F9FC] rounded-xl p-5 border border-gray-100">
                  <p className="text-[#0B1E3D] text-sm leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {selectedContact.message}
                  </p>
                </div>

                {/* Reply CTA */}
                <div className="mt-5 flex gap-3">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: Your Inquiry to Creative Cyber Management&body=Dear ${selectedContact.firstName},%0D%0A%0D%0AThank you for reaching out to Creative Cyber Management.%0D%0A%0D%0A`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:brightness-110"
                    style={{ backgroundColor: "#0B1E3D", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <Mail size={14} />
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 text-center px-8 h-full min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-[#1E6FD9]/10 flex items-center justify-center mb-5">
                <MessageSquare size={28} className="text-[#1E6FD9]" />
              </div>
              <h3 className="text-[#0B1E3D] font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Select a Submission
              </h3>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Click on any contact submission from the list to view the full message and reply options.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
