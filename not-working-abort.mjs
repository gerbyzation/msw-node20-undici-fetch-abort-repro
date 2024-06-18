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
setTimeout(() => console.log(controller), 200);
let response;
try {
  response = await fetch(url, { signal: controller.signal });
  console.log(await response.json());
} catch (err) {
  console.error(err);
}

server.close();
