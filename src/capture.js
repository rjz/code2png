const http = require('http');
const { resolve } = require('path');
const phantom = require('phantom');
const { Server } = require('node-static');

const PORT = 6632;

module.exports = async function ({
  path,
  imageFile,
  dir,
}) {
  const fileServer = new Server(dir);
  const server = http.createServer((req, res) => {
    req.addListener('end', () => fileServer.serve(req, res)).resume();
  }).listen(PORT);

  const instance = await phantom.create();
  const page = await instance.createPage();

  // Screen-capture will scroll as needed. Use a too-small viewport to fit
  // content to thumbnail
  page.property('viewportSize', {
    width: 100,
    height: 20,
  });

  await page.open(`http://localhost:${PORT}${path}`);
  await page.render(imageFile);
  instance.exit();
  server.close();
}
