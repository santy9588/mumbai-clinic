import Types "../types/chat";

module {
  public type ChatMessage = Types.ChatMessage;
  public type HttpRequestArgs = Types.HttpRequestArgs;
  public type HttpResponsePayload = Types.HttpResponsePayload;

  /// Build the JSON body for an OpenAI-compatible chat completions request
  public func buildRequestBody(messages : [ChatMessage]) : Text {
    Runtime.trap("not implemented");
  };

  /// Parse the assistant's reply text from a raw JSON response body
  public func parseResponseContent(body : Text) : Text {
    Runtime.trap("not implemented");
  };
};
