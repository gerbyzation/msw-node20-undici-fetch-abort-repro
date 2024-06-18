A repro demonstrating MSW@1.3 breaking request abortion on node 20.

```
❯ node --version
v20.6.1
❯ node working-abort.mjs
[MSW] Warning: captured a request without a matching request handler:

  • GET https://www.google.com/

If you still wish to intercept this unhandled request, please create a request handler for it.
Read more: https://mswjs.io/docs/getting-started/mocks
success: received abort error
❯ node not-working-abort.mjs
{ success: true }
failure: expected abort error
```
