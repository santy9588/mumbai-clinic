import Types "../types/chat";

mixin () {
  /// Send a list of chat messages to the LLM and return the assistant's reply.
  /// Returns an error string if the API call fails.
  public func sendChatMessage(messages : [Types.ChatMessage]) : async Text {
    Runtime.trap("not implemented");
  };
};
