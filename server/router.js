const router = require('express').Router();
const jwt = require('express-jwt');

const checkToken = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: process.env.AUTH0_CLIENT_SECRET,
  // Validate the audience and the issuer.
  // audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['HS256']
})

router.use('/api', checkToken, require('./api/index'));

module.exports = router;