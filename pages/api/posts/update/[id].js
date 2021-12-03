import db from '../../../../libs/db'
import authorization from '../../../../middlewares/authorization'
export default async function handler (req, res) {
  if (req.method !== 'PUT') return res.status(405).end()

  const auth = await authorization(req, res)

  const { id } = req.query
  const { title, content } = req.body

  const update = await db('post').where({ id })
    .update({
      title,
      content
    })

  const updateData = await db('post').where({ id }).first()
  //   console.log(data)

  res.status(200)
  res.json({
    message: 'Post updated',
    data: updateData
  })
}
