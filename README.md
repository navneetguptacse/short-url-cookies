## Server Side Rendering

- There is some of templating engine: `ejs`, pug, handlebars, nunjucks, etc.

- But for this project, we are going to use `ejs`(Embedded JavaScript) templating engine.

- `ejs` is a simple templating language that lets you generate HTML markup with plain JavaScript.

- `ejs` is a template system. You define HTML pages in the EJS syntax and specify where various data will go in the page. Then you can use JavaScript to generate the data and HTML dynamically.

- We can use `ejs` to render HTML pages on the server side. This is called **server side rendering**.

- In server side rendering, the server generates the HTML markup and sends it to the browser as a response to an HTTP request.

- The browser receives the HTML and displays it to the user.

- The browser doesn't know or care whether the HTML was generated dynamically or not. It just displays the HTML.

## `<%= EJS %>` Syntax

- `<%= EJS %>` is used to inject JavaScript values into HTML.

- `<% EJS %>` is used to embed JavaScript logic into HTML.

- `<%- EJS %>` is used to render HTML templates.

- `<%# EJS %>` is used to add comments that are not included in the HTML rendered by your app.

- `<%% EJS %>` is used to output a literal `'<%'`.

- `%>` is used to end the EJS logic.

- `-%>` is used to end the EJS logic and omit the newline at the end of the line.

## How to use `ejs`?

- First, we need to install `ejs` package.

  ```bash
  npm install ejs
  ```

- Then, we need to set up `ejs` as the view engine for our Express app.

  ```js
  app.set("view engine", "ejs");
  ```

- Then, we need to create a view file with the `.ejs` extension.

  ```
  views/
      index.ejs
      ...
  ```

- Then, we need to render the view file using `res.render()` method.
  ```js
  app.get("/", (req, res) => {
    res.render("index");
  });
  ```

## How to pass data to the view? (Using `ejs`)

- We can pass data to the view using the second argument of `res.render()` method.

  ```js
  app.get("/", (req, res) => {
    res.render("index", { title: "My Express App", message: "Hello" });
  });
  ```

- Then, we can use the data in the view file.
  ```html
  <h1><%= title %></h1>
  <p><%= message %></p>
  ```
  - `<%= title %>` will be replaced with `My Express App`.
  - `<%= message %>` will be replaced with `Hello`.

## 🎉 Till now, what we have done in this project related to `ejs`?

- We have passed the data to the view file `home.ejs` in the `index.js` file.

  ```js
  const express = require("express");
  const path = require("path");
  const { connectToMongoDB } = require("./connect");
  const URL = require("./models/url");

  const app = express();
  const PORT = 8001;

  connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });

  app.set("view engine", "ejs"); // Setting up the view engine
  app.set("views", path.resolve("./views")); // Setting up the views directory

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/test", async (req, res) => {
    const allURLs = await URL.find({});
    return res.render("home", {
      // Rendering the home.ejs file
      urls: allURLs, // Passing the urls to the home.ejs file
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  ```

  - We have used `res.render()` method to render the view file `home.ejs` in the `app.get("/test")` route.

- We have created a view file `home.ejs` in the `views` folder.

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Home Page</title>
    </head>
    <body>
      <h1>Hey from server!</h1>
      <% urls.forEach(url => { %>
      <li>
        <%= `${url.redirectURL} - `%>
        <a href="<%= `http://localhost:8001/url/${url.shortID}` %>"
          ><%= url.shortID %></a
        >
        <%= ` - ${url.visitHistory.length}`%>
      </li>
      <% }) %>
    </body>
  </html>
  ```
