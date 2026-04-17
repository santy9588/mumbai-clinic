import Types "common";

module {
  public type ChatMessage = Types.ChatMessage;

  /// IC management canister HTTP request types
  public type HttpHeader = {
    name : Text;
    value : Text;
  };

  public type HttpMethod = { #get; #post; #head };

  public type HttpRequestArgs = {
    url : Text;
    max_response_bytes : ?Nat64;
    method : HttpMethod;
    headers : [HttpHeader];
    body : ?Blob;
    transform : ?TransformRawResponseFunction;
  };

  public type HttpResponsePayload = {
    status : Nat;
    headers : [HttpHeader];
    body : Blob;
  };

  public type TransformArgs = {
    response : HttpResponsePayload;
    context : Blob;
  };

  public type TransformRawResponseFunction = {
    function : shared query TransformArgs -> async HttpResponsePayload;
    context : Blob;
  };
};
