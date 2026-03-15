Deno.serve(async (request) => {
  const url = new URL(request.url);
  const target = "http://38.45.91.216:8080" + url.pathname + url.search;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const resp = await fetch(target, {
    method: request.method,
    headers: headers,
    body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
  });

  const respHeaders = new Headers(resp.headers);
  respHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(resp.body, {
    status: resp.status,
    headers: respHeaders,
  });
});
