module {
  /// A single chat message with a role (user or assistant) and text content
  public type ChatMessage = {
    role : Text;
    content : Text;
  };
};
