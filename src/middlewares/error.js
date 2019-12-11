const codes = require('@config/error-codes')

const errorsHandling = (err, req, res, next) => {
  if (err.status === 500 || !err.status) {
    res.status(500).json({ code: [codes.global.UNEXPECTED_ERROR] })
    return next()
  }
  console.log('err', err)
  res.status(err.statusCode).json({
    code: typeof err.message !== typeof [] ? [err.message] : err.message
  })
}

module.exports = {
  errorsHandling
}
