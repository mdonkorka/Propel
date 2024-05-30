const jwt = require('jsonwebtoken')

//verify the auth token exists and it's correct
async function tokenAuthentication (req, res, next) {
  if (req.cookies && req.cookies.authToken) {
    const authToken = req.cookies.authToken
    jwt.verify(authToken, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(400).json({error: 'AuthToken is invalid'});
      req.id = user.id
      next()
    })
  } else {
    return res.status(400).json({error: 'AuthToken missing'});
  }
}

module.exports = tokenAuthentication;



