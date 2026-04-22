import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  createAppointment: vi.fn().mockResolvedValue(undefined),
  getBookedSlots: vi.fn().mockResolvedValue(["09:00", "10:00"]),
  getAllAppointments: vi.fn().mockResolvedValue([]),
  saveChatMessage: vi.fn().mockResolvedValue(undefined),
  getChatHistory: vi.fn().mockResolvedValue([]),
  createContactSubmission: vi.fn().mockResolvedValue(undefined),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

// Mock LLM
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [{ message: { content: "Hello! How can I help you with cybersecurity?" } }],
  }),
}));

// Mock notifications
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("appointments.getAvailableSlots", () => {
  it("returns available slots excluding booked ones", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const slots = await caller.appointments.getAvailableSlots({ date: "2026-05-01" });
    // 09:00 and 10:00 are booked, should not appear
    expect(slots).not.toContain("09:00");
    expect(slots).not.toContain("10:00");
    // Other slots should be available
    expect(slots).toContain("09:30");
    expect(slots).toContain("14:00");
  });
});

describe("appointments.book", () => {
  it("books an appointment and returns success", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.appointments.book({
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      phone: "555-1234",
      company: "Acme Corp",
      service: "vCISO Program",
      appointmentDate: "2026-05-01",
      appointmentTime: "14:00",
      notes: "Need help with HIPAA compliance",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await expect(
      caller.appointments.book({
        firstName: "John",
        lastName: "Smith",
        email: "not-an-email",
        service: "vCISO Program",
        appointmentDate: "2026-05-01",
        appointmentTime: "14:00",
      })
    ).rejects.toThrow();
  });
});

describe("chat.sendMessage", () => {
  it("returns an AI reply", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.chat.sendMessage({
      sessionId: "test-session-123",
      message: "What services do you offer?",
    });
    expect(result.reply).toBeTruthy();
    expect(typeof result.reply).toBe("string");
  });

  it("rejects empty messages", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await expect(
      caller.chat.sendMessage({ sessionId: "test-session-123", message: "" })
    ).rejects.toThrow();
  });
});

describe("contact.submit", () => {
  it("submits a contact form and returns success", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.contact.submit({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      company: "Tech Corp",
      message: "I need help with cybersecurity for my business.",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects messages that are too short", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await expect(
      caller.contact.submit({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        message: "Hi",
      })
    ).rejects.toThrow();
  });
});
