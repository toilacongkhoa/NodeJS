# NodeJS Learning Projects

This repository contains small projects created while learning Node.js.

## Node.js Basics

- Use `require()` to load modules, such as `const http = require('http')`.
- Assign a value, function, or object to `module.exports` to export it. Load a local module with a relative path, such as `require('./routes')`.
- To export multiple values in CommonJS, use `exports.name = value` for each value. `require()` returns an object containing these properties.
- The `http` module supports HTTP servers and clients.
- `http.createServer(handler)` creates a server. The handler receives the request (`req`) and response (`res`) objects.
- `server.listen(port)` starts listening for connections on the given port.
- `res.setHeader('Content-Type', 'text/html')` tells the browser to treat the response as HTML. Set headers before writing the body.
- `res.end()` finishes the response. Use `return res.end()` to exit the handler and prevent further writes.
- `===` compares values without type conversion; `==` may convert types before comparing.
- The unary `+` converts a value to a number. For example, `+'42'` returns `42`, while `+'abc'` returns `NaN`.
- The handler runs once for each request, with a separate response for that request.
- Each request entry in the browser's Network tab shows request and response details.
- The `fs` module reads, writes, and manages files and directories.
- A redirect status such as `302`, together with a `Location` header, tells the browser where to go next.
- Request bodies arrive as a stream of chunks. Collect them with `req.on('data', ...)`, then combine them in `req.on('end', ...)` using `Buffer.concat(body).toString()`.
- For `message=hello`, `parseBody.split('=')[1]` returns `hello`. Use `URLSearchParams` to correctly decode URL-encoded form data.
- `fs.writeFileSync()` blocks execution until the write finishes. `fs.writeFile()` writes asynchronously and calls a callback with an error, or `null` on success.

## npm Basics

```bash
npm init                        # Create a package.json file for the project.
npm install <package-name>      # Install and save to dependencies (same as npm install -S <package-name>).
npm install -D <package-name>   # Install and save to devDependencies(-D).
npm install -g <package-name>   # Install globally (-g), outside the project.
```

- By default, `npm install` installs both `dependencies` and `devDependencies`. It uses locked versions from `package-lock.json` if they satisfy `package.json`; otherwise, it updates the lockfile. Without a lockfile, it resolves versions allowed by `package.json`.

```bash
npm run <script-name>   # Run a script defined in package.json.
npm start               # Shortcut for npm run start.
npm test                # Shortcut for npm run test.
```

- Running `nodemon app.js` directly requires `nodemon` to be on the terminal's `PATH`, usually through a global installation. For a local installation, use `npx nodemon app.js` or an npm script. In this project, `npm start` runs `nodemon app.js`.

## Express Basics

- `app.use()` registers middleware. Matching middleware runs in registration order; call `next()` to pass control to the next matching middleware.
- `app.use(path, middleware)` accepts an optional mount path. The default is `/`, which matches all request paths. `/admin` matches `/admin` and `/admin/...`, but not `/administrator`.
- Register `bodyParser.urlencoded({ extended: false })` before routes that read `req.body`. It parses URL-encoded form data without nested objects. `express.urlencoded({ extended: false })` is a built-in alternative.
- `app.get(path, handler)` and `app.post(path, handler)` register routes for specific HTTP methods. Unlike `app.use()`, they do not automatically match every subpath.
- `express.Router()` creates a router. Add routes with `router.get()` or `router.post()`, export it with `module.exports = router`, then load and mount it with `app.use()`.
- `app.use('/admin', adminRoutes)` mounts a router at `/admin`. Express removes this prefix while matching routes inside the router, so `/add-product` handles `/admin/add-product`.
- `res.status(code)` sets the HTTP status and returns `res` for chaining, such as `res.status(404).send('Not found')`.
- `res.send(body)` sets appropriate response headers, sends the body, and ends the response.
- `res.sendFile(filePath)` sends a file to the browser. Use an absolute path, or a relative path with the `root` option.
- `express.static(directory)` serves static files from a directory. It does not provide file upload or write operations.
- `app.listen(port)` creates an HTTP server for the Express app and starts listening on the given port.

## File Paths

- In CommonJS, `__dirname` is the absolute path to the current module's directory; `__filename` is the absolute path to the module file.
- The `path` module handles file paths. `path.join()` joins and normalizes path segments using the operating system's separator.
- For a CommonJS entry point, `require.main.filename` is the entry file's absolute path. `path.dirname(require.main.filename)` returns its directory. `process.mainModule` is deprecated; use `require.main` instead.

## HTML and CSS Basics

- `<header>` and `<main>` are semantic HTML elements that describe introductory content and the page's main content. Use CSS to control layout and appearance.
- BEM names CSS classes by block, element, and modifier. A block is independent, an element is part of a block, and a modifier represents a variation or state. A common format is `block__element--modifier`, such as `main-header__item--active`.

## Template Engines

- Template engines generate HTML from templates and data. Pug, Handlebars, and EJS are examples.
- `app.set(name, value)` stores an application setting.
- `app.set('view engine', 'pug')` selects Pug as the default engine when a view name has no extension.
- `app.set('views', directory)` sets the directory where Express looks for templates.
- `res.render('shop')` renders the `shop` template using the default engine and sends the generated HTML response.
- Pass template data as the second argument, such as `res.render('shop', { pageTitle: 'Shop' })`. The template can access `pageTitle` by name.

### Pug

- Pug uses indentation to define HTML structure and supports server-side expressions and logic.
- `#{expression}` inserts an HTML-escaped value into text. `= expression` outputs an HTML-escaped value after a tag, such as `h1= pageTitle`.

### Handlebars

- Register `express-handlebars` with `app.engine()` before using it. The registered extension, `view engine` setting, and template file extension should match:

```js
const { engine } = require('express-handlebars');

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
```

- `{{name}}` outputs the HTML-escaped value of `name` from the template data.

### EJS

- `<%= expression %>` outputs an HTML-escaped value. `<% code %>` runs JavaScript without directly outputting a value.
- `<%- include('includes/head.ejs') %>` inserts a reusable template relative to the current template. `<%- ... %>` outputs HTML without escaping it, so the included markup renders correctly.
- Pass data to an EJS partial as the second argument to `include()`. In `<%- include('../includes/add-to-cart.ejs', { product: product }) %>`, the key on the left is the name the partial uses, and the value on the right comes from the current template.

## MVC Basics

- MVC separates responsibilities: models manage data and business logic, views display content, and controllers handle requests and coordinate models and views.

## JavaScript Classes

- `static` defines a method on the class itself, rather than on its instances. Call it with `ClassName.method()` without creating an instance.

## Routes and Request Data

- A colon marks a named route parameter. In `/products/:productId`, `:productId` captures a single path segment. For `/products/42`, `req.params.productId` is `'42'`.
- Use `GET` to retrieve data. The requested operation should leave application state unchanged.
- Query parameters follow `?` in the URL as `key=value` pairs separated by `&`. For `?edit=true&tab=details`, read the values with `req.query.edit` and `req.query.tab`.

## MySQL Setup

With Node.js 22 or later, copy `.env.example` to `.env` in the project root and set `DB_PASSWORD` to your MySQL password. You can also set `DB_PASSWORD` in the environment before starting the app. Git ignores `.env`.

## Database Basics

| Relational database | Document database |
| --- | --- |
| Database | Database |
| Table | Collection |
| Row | Document |

- A relational table defines the columns shared by its rows. Documents in a collection can have different fields unless schema validation requires otherwise.
- Relational databases use foreign keys to represent relationships and `JOIN` to query related rows. Document databases often embed related data or duplicate selected fields for easier reads.
- A connection pool reuses database connections. MySQL2 pool methods borrow a connection for each query and release it when the query finishes.
- A Promise represents an asynchronous result. It starts `pending`, then becomes `fulfilled` with a value or `rejected` with a reason.

### MySQL2 Queries

```js
const [rows, fields] = await db.execute('SELECT * FROM products');
```

For a `SELECT` query, `rows` contains the results, and `fields` contains column metadata such as names and types. By default, each row is an object keyed by column name.

```js
await db.execute(
  'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
  [this.title, this.price, this.imageUrl, this.description]
);
```

`execute()` binds the values to the `?` placeholders in order. Pass values as the second argument to keep them separate from the SQL text.
