'use strict'

const postcss = require('postcss')
const fs = require('fs')

const css = fs.readFileSync(`${__dirname}/src.css`)

postcss(
  [
    require('autoprefixer'),
    require('precss'),
    require('cssnano'),
    require('postcss-import')
  ]
)
.process(
  css,
  {
    from: `${__dirname}/src.css`
  }
)
.then( result => {
  fs.writeFileSync(`${__dirname}/../../public/main/bundle.css`, result.css)
  if ( result.map ) fs.writeFileSync('app.css.map', result.map)
})
.catch( console.log )
