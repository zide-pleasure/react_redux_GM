const express = require('express')
const debug = require('debug')('server:server_main')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')

const server = express()
const paths = config.utils_paths

// ------------------------------------
// 应用Webpack HMR中间件
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('启用webpack dev和HMR(Hot Module Replacement (HRM) 又稱熱替換)中间件。')
  server.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: paths.client(),
      hot: true,
      quiet: config.compiler_quiet,
      noInfo: config.compiler_quiet,
      lazy: false,
      stats: config.compiler_stats
    })
  )
  server.use(require('webpack-hot-middleware')(compiler))

  // 开发模式下 静态目录指向 /Users/edward/workspaces/react-redux/src/static
  server.use(express.static(paths.client('static')))

  server.use('*', function(req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
      'only serve the compiled application bundle in ~/dist. Generally you ' +
      'do not need an application server for this and can instead use a web ' +
      'server such as nginx to serve your static files. See the "deployment" ' +
      'section in the README for more information on deployment strategies.'
  )

  // 生成环境下 直接指向静态目录的 /Users/edward/workspaces/react-redux/dist
  server.use(express.static(paths.dist()))
}

module.exports = server
