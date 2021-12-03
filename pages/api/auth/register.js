import bcrypt from 'bcryptjs'
import db from '../../../libs/db'
export default async function handler (req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).end()

    console.log(req.body)

    const { email, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const passwordHas = bcrypt.hashSync(password, salt)

    const register = await db('users').insert({
      email,
      password: passwordHas
    })

    const registeredUser = await db('users')
      .where({ id: register })
      .first()

    res.status(200)
    res.json({
      message: 'User Registered successfully',
      data: registeredUser
    })
  } catch (error) {
    console.log(error)
  }
}
