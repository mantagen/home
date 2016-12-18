'use strict'

const { node } = require('fluture')
const { pipe, prop, flip } = require('sanctuary')
const { parse } = require('path')
const { readFile } = require('fs')
const hl = require('highland')

// Accepts an asset path and returns a 'Content-Type'.
// String -> String
const getContentType =
  pipe([
    parse,
    prop('ext'),
    flip(prop)(
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
  ])

// Request -> Future Err Body
const bodyReader = req =>
  node( done => hl(req).toCallback(done) )

// String -> Future Err Response
const sendFile =
  path =>
    node(
      done =>
        readFile( path, done )
    )
    .map(
      content =>
        ({
          payload: content,
          contentType: getContentType(path),
          statusCode: 200
        })
    )

module.exports = {
  getContentType,
  sendFile,
  bodyReader
}
