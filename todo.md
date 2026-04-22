# Creative Cyber Management - TODO

## Completed
- [x] Initial website build with Corporate Prestige design
- [x] Hero section with animated shield background
- [x] Stats band
- [x] Services section with 3 service cards
- [x] AI Solutions section with 3 option descriptions and Microsoft Partner badge
- [x] About section with founder story
- [x] Testimonials section
- [x] Partners section (Microsoft, CISA, Google)
- [x] CTA section
- [x] Navbar and Footer components
- [x] Upgrade to full-stack (web-db-user)

## Individual Pages
- [x] Services page (/services) - Full detailed services page
- [x] AI Solutions page (/ai-solutions) - Full AI services page
- [x] About page (/about) - Full about/team page
- [x] Contact page (/contact) - Standalone contact page with tRPC form

## Database Schema
- [x] appointments table (id, firstName, lastName, email, phone, company, service, appointmentDate, appointmentTime, status, notes)
- [x] chat_messages table (id, sessionId, role, content, createdAt)
- [x] contact_submissions table (id, firstName, lastName, email, company, message, createdAt)

## Backend (tRPC)
- [x] appointments.book procedure
- [x] appointments.getAvailableSlots procedure
- [x] chat.sendMessage procedure (LLM-powered with CCM system prompt)
- [x] chat.getHistory procedure
- [x] contact.submit procedure
- [x] Owner notification on new booking and contact submission

## Appointment Scheduler (/schedule)
- [x] Calendar date picker (no past dates)
- [x] Available time slots grid (booked slots disabled)
- [x] Service selection step
- [x] Booking form (name, email, phone, company, notes)
- [x] Confirmation screen
- [x] Owner notification on new booking

## AI Chatbot Widget
- [x] Floating chat button (bottom-right, all pages)
- [x] Chat window with message history
- [x] LLM integration with CCM-specific system prompt
- [x] Typing indicator
- [x] Markdown rendering for responses (Streamdown)
- [x] Quick-question chips for new conversations
- [x] Schedule CTA after 4+ messages

## Navigation Updates
- [x] Update Navbar links to point to individual pages
- [x] Update Home page CTAs to link to /schedule and /services
- [x] Add Schedule link to navbar (Free Consultation button)
- [x] Footer updated with proper page routes

## Tests
- [x] server/auth.logout.test.ts (1 test)
- [x] server/features.test.ts — appointments, chat, contact (7 tests)
- [x] All 8 tests passing

## Blog Feature
- [x] Write Article 1: HIPAA Compliance Tips for Small Healthcare Practices
- [x] Write Article 2: Zero-Trust Security — A Practical Guide for Business Owners
- [x] Write Article 3: AI Security in 2025 — What Every Business Needs to Know
- [x] Build Blog listing page (/blog) with article cards
- [x] Build individual article page (/blog/:slug) with full content
- [x] Add Blog link to Navbar
- [x] Add Blog link to Footer
- [x] Write vitest tests for blog data (11 tests)
