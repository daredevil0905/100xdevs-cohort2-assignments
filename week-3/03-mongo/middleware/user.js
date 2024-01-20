const { User } = require("../db")

// Middleware for handling auth
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const username = req.headers.username
    const password = req.headers.password

    User.findOne({ username, password })
    .then((val) => {
      if (val) {
        next()
      } else {
        res.status(403).send("User does not exist.")
      }
    })

}

module.exports = userMiddleware;