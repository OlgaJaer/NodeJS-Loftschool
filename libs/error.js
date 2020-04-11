module.exports = async (req, res, next) => {
    try {
      await next()
      if (res.status === 404) {
        await res.render('error', {
          status: res.status,
          error: res.message,
        })
      }
    } catch (err) {
      // TODO: Must be logger
      console.log(err)
      res.status = err.statusCode || err.status || 500
      await res.render('error', {
        status: res.status,
        error: res.message,
      })
    }
  }