const http = require("http");
const port = 5173;

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const url = req.url;
    if (url === "/about") {
      res.write("<h1>Ini halaman About</h1>");
      res.end();
    } else if (url === "/contact") {
      res.write("<h1>Ini halaman Contact</h1>");
      res.end();
    } else {
      res.write("Hello World!");
      res.end();
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
