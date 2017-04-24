import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

const express = require('express');
const parser = require('body-parser');
const route = require('./server/routes');

const port = process.env.PORT || 8080;

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}
app.get('/app/*', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use('/', route.userRouter);
app.use('/', route.rolesRouter);
app.use('/', route.docRoutes);
app.use('/', route.swagger);
app.use(express.static('server/public'));
app.use(express.static(path.join(__dirname, 'client/dist')));

app.listen(port, () => {
 console.log(`Server started on ${port}`);
});

module.exports = app;
