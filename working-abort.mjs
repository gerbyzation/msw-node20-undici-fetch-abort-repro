import { setupServer } from "msw/node";

const server = setupServer();
server.listen();

const url = "https://www.google.com/";

const controller = new AbortController();
setTimeout(() => controller.abort(), 10);
setTimeout(() => console.log(controller), 200);
let response;
try {
  response = await fetch(url, { signal: controller.signal });
  console.log("done");
  console.log(await response.json());
} catch (err) {
  console.error(err);
}

server.close();
