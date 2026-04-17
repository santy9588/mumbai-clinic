import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  sendChatMessage: async (_messages) =>
    "Hello! I'm an AI assistant. How can I help you today?",
};
