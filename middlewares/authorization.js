import jwt from 'jsonwebtoken'

export default function authorization (req, res) {
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers

    if (!authorization) return res.status(401).end()

    const authsplit = authorization.split(' ')
    const [authType, authToken] = [
      authsplit[0],
      authsplit[1],
    ]

    if (authType !== 'Bearer') return res.status(401).end()
    jwt.verify(authToken, process.env.JWT_SECRET, function (err, decoded) {
      if (err) return res.status(401).end()

      return resolve(decoded)
    })
  })
}
