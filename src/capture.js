const http = require('http');
const phantom = require('phantom');

const PORT = 6632;
const FORMAT = 'PNG';
const QUALITY = 100; // Let others downsample

module.exports = async function (content) {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write(content);
    res.end();
  }).listen(PORT);

  const instance = await phantom.create();
  const page = await instance.createPage();

  // Screen-capture will scroll as needed. Use a too-small viewport to fit
  // content to thumbnail
  page.property('viewportSize', {
    width: 100,
    height: 20,
  });

  await page.open(`http://localhost:${PORT}/`);

  // `phantom` doesn't play nice with `.renderBuffer()`; we'll make our own.
  const encodedImage = await page.renderBase64(FORMAT, QUALITY);
  const buf = Buffer.from(encodedImage, 'base64');
  instance.exit();
  server.close();
  return buf;
};
