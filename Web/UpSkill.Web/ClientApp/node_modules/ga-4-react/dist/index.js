
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ga-4-react.cjs.production.min.js')
} else {
  module.exports = require('./ga-4-react.cjs.development.js')
}
