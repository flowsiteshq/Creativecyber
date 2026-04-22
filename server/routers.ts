import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import {
  createAppointment,
  getBookedSlots,
  saveChatMessage,
  getChatHistory,
  createContactSubmission,
} from "./db";

const CCM_SYSTEM_PROMPT = `You are the AI assistant for Creative Cyber Management, LLC — a premier cybersecurity and technology management firm based in Atlanta, GA. You help prospective and existing clients understand our services, pricing philosophy, and how to get started.

About Creative Cyber Management:
- Founded in 2010 by small business owners who experienced real cyber attacks firsthand
- Specializes in cybersecurity for small/medium businesses, non-profits, cultural institutions, and healthcare professionals
- CISA Best Practices Certified
- Certified Microsoft Partner (Microsoft 365, Azure AI, Copilot)
- Uses zero-trust security principles
- Contact: info@creativecybermanagement.com | Atlanta, GA | By Appointment Only

Our Core Services:
1. Virtual Chief Security Officer (vCISO) Program — Our premier service. Includes: cyber security policy creation, vendor management, employee education, MS365 hardening, Google Workspace management, cyber insurance assessments, social engineering testing, and endpoint security solutions.
2. Statutory Compliance Management — Compliance as a Service. Automates HIPAA, and other statutory compliance requirements. Real-time monitoring, audit-ready reports.
3. Network Security & Vulnerability Management — Deep-dive network assessments, comprehensive risk and vulnerability reports.

AI Solutions:
- Enterprise-grade AI implementation and strategy
- Microsoft Azure AI & Copilot integration
- AI-powered threat detection and response
- Intelligent compliance automation
- Secure AI governance frameworks

Founder: Burton Maben — "We don't try to dazzle you with techno-babble... we speak your language: the language of concerned business leaders wanting to protect their organizations from cyber thugs."

Scheduling: Clients can schedule a free consultation at /schedule on our website.

Tone: Professional, warm, clear, and jargon-free. Never use excessive technical jargon. Always encourage visitors to schedule a free consultation. If asked about pricing, explain that pricing is customized per organization and a free consultation is the best way to get a quote.

If asked something outside your knowledge about CCM, suggest the user contact info@creativecybermanagement.com or schedule a consultation.`;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  appointments: router({
    getAvailableSlots: publicProcedure
      .input(z.object({ date: z.string() }))
      .query(async ({ input }) => {
        const allSlots = [
          "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
          "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
        ];
        const bookedSlots = await getBookedSlots(input.date);
        return allSlots.filter(slot => !bookedSlots.includes(slot));
      }),

    book: publicProcedure
      .input(z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        service: z.string().min(1),
        appointmentDate: z.string(),
        appointmentTime: z.string(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createAppointment({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone ?? null,
          company: input.company ?? null,
          service: input.service,
          appointmentDate: input.appointmentDate,
          appointmentTime: input.appointmentTime,
          notes: input.notes ?? null,
          status: "pending",
        });
        await notifyOwner({
          title: `New Appointment: ${input.firstName} ${input.lastName}`,
          content: `Service: ${input.service}\nDate: ${input.appointmentDate} at ${input.appointmentTime}\nEmail: ${input.email}\nCompany: ${input.company ?? "N/A"}\nPhone: ${input.phone ?? "N/A"}\nNotes: ${input.notes ?? "None"}`,
        });
        return { success: true };
      }),
  }),

  chat: router({
    sendMessage: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        message: z.string().min(1).max(2000),
      }))
      .mutation(async ({ input }) => {
        const history = await getChatHistory(input.sessionId);
        await saveChatMessage({ sessionId: input.sessionId, role: "user", content: input.message });
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
          { role: "system", content: CCM_SYSTEM_PROMPT },
          ...history.slice(-10).map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
          { role: "user", content: input.message },
        ];
        const response = await invokeLLM({ messages });
        const rawContent = response.choices[0]?.message?.content;
        const assistantContent = typeof rawContent === "string" ? rawContent : "I'm sorry, I couldn't process your request. Please contact us at info@creativecybermanagement.com";
        await saveChatMessage({ sessionId: input.sessionId, role: "assistant", content: assistantContent });
        return { reply: assistantContent };
      }),

    getHistory: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => getChatHistory(input.sessionId)),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        company: z.string().optional(),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        await createContactSubmission({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          company: input.company ?? null,
          message: input.message,
        });
        await notifyOwner({
          title: `New Contact Form: ${input.firstName} ${input.lastName}`,
          content: `Email: ${input.email}\nCompany: ${input.company ?? "N/A"}\nMessage: ${input.message}`,
        });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
