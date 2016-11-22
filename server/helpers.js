'use strict'

const R        = require('ramda')
const co       = require('co')
const path     = require('path')
const bluebird = require('bluebird')
const fs       = bluebird.promisifyAll( require('fs') )

// Accepts an asset path and returns a 'Content-Type'.
const getContentType =
  R.pipe(
    path.parse,
    R.prop('ext'),
    R.prop(
      R.__,
      {
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.html': 'text/html',
        '.css': 'text/css',
        '.ico': 'image/x-icon',
        '.png': 'image/png',
        '.jpg': 'image/jpg'
      }
    )
  )

const bodyReader = req =>
  new Promise( (resolve, reject) => {
    let body = []

    req.on('data', chunk => body.push(chunk) )

    req.on('end', _ => resolve(Buffer.concat(body).toString()) )

    return req.on('error', err => reject(err) )

  } )

const sendFile =
  path =>
    co.wrap(function* (req, res) {
      const data = yield fs.readFileAsync(path)
      const contentType = getContentType(path)
      res.writeHead(200, { 'Content-Type': contentType })
      return contentType.substring(0, 4) === 'text'
        ? res.end( data.toString() )
        : res.end( data, 'binary' )
    })

module.exports = {
  getContentType,
  sendFile,
  bodyReader
}
