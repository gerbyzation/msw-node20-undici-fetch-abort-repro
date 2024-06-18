import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer();
server.listen();

const url = "https://www.google.com/";

server.use(
  rest.get(url, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json({ success: true }));
  })
);

const controller = new AbortController();
setTimeout(() => controller.abort(), 10);
let response;
try {
  response = await fetch(url, { signal: controller.signal });
  console.log(await response.json());
  console.error("failure: expected abort error");
} catch (err) {
  if (err.message === "This operation was aborted") {
    console.log("success: received abort error");
  } else {
    console.error(err);
  }
}

server.close();
