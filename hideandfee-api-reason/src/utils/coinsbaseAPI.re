type config = {
  baseApiURL: string,
  coinBaseApiKey: string,
  bittrexAPiKey: string
};

let config = {
  baseApiURL: "https://api.coinbase.com/v2/",
  coinBaseApiKey: "env.COINBASE_API_KEY",
  bittrexAPiKey: "env.BITTREX_API_KEY"
};

module Option = {
  let unwrapUnsafely = data =>
    switch data {
    | Some(v) => v
    | None => raise(Invalid_argument("unwrapUnsafely called on None"))
    };
};

let testAPI =
  Js.Promise.(
    Fetch.fetch(config.baseApiURL)
    |> then_(Fetch.Response.text)
    |> then_(text => print_endline(text) |> resolve)
  );

let _ =
  Js.Promise.(
    Fetch.fetchWithInit(
      "/api/hello",
      Fetch.RequestInit.make(~method_=Post, ())
    )
    |> then_(Fetch.Response.text)
    |> then_(text => print_endline(text) |> resolve)
  );

let _ =
  Js.Promise.(
    Fetch.fetch("/api/fruit")
    /* assume server returns `["apple", "banana", "pear", ...]` */
    |> then_(Fetch.Response.json)
    |> then_(json => Js.Json.decodeArray(json) |> resolve)
    |> then_(opt => Option.unwrapUnsafely(opt) |> resolve)
    |> then_(items =>
         items
         |> Js.Array.map(item =>
              item |> Js.Json.decodeString |> Option.unwrapUnsafely
            )
         |> resolve
       )
  );