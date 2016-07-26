var webpack = require('webpack');
var webpackHotDiddleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config.js');

var app = new (require('express'))();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));

app.use(webpackHotDiddleware(compiler));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(err) {
  if (err) {
    console.error(err);
  }
  console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
