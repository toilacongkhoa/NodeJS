# NodeJS Learning Projects

This repository contains small projects created while learning Node.js.

## Run the Project

```bash
node app.js
```

## Node.js Basics

- Use `require()` to load modules, such as `const http = require('http')`.
- The `http` module supports HTTP servers and clients.
- `http.createServer(handler)` creates a server. The handler receives the request (`req`) and response (`res`) objects.
- `server.listen(port)` starts listening for connections on the given port.
- `res.setHeader('Content-Type', 'text/html')` tells the browser to treat the response as HTML. Set headers before writing the body.
- `res.end()` finishes the response. Use `return res.end()` to exit the handler and prevent further writes.
- `===` compares values without type conversion; `==` may convert types before comparing.
- The handler runs once for each request, with a separate response for that request.
- Each request entry in the browser's Network tab shows request and response details.
- The `fs` module reads, writes, and manages files and directories.
- A redirect status such as `302`, together with a `Location` header, tells the browser where to go next.
- Request bodies arrive as a stream of chunks. Collect them with `req.on('data', ...)`, then combine them in `req.on('end', ...)` using `Buffer.concat(body).toString()`.
- For `message=hello`, `bodyText.split('=')[1]` returns `hello`. Use `URLSearchParams` to correctly decode URL-encoded form data.
- `fs.writeFileSync()` blocks execution until the write finishes. `fs.writeFile()` writes asynchronously and calls a callback with an error, or `null` on success.
- Assign a value, function, or object to `module.exports` to export it. Load a local module with a relative path, such as `require('./routes')`.
