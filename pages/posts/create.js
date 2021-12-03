import router from 'next/router'
import React, { useState } from 'react'
import Nav from '../../components/nav'
import { authPage } from '../../middlewares/authorizationPage'

export async function getServerSideProps (ctx) {
  const { token } = await authPage(ctx)

  return {
    props: {
      token
    }
  }
}
export default function PostCreate (props) {
  const [fields, setFields] = useState({
    title: '',
    content: ''
  })

  const [status, setStatus] = useState('normal')

  async function createHandler (e) {
    e.preventDefault()

    setStatus('loading')
    const { token } = props

    const create = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(fields)
    })

    if (!create.ok) return setStatus('Error')

    const res = await create.json()
    console.log(res)

    setStatus('success')

    router.push('/posts')
  }

  function fieldsHandler (e) {
    const name = e.target.getAttribute('name')

    setFields({
      ...fields,
      [name]: e.target.value
    })
  }

  return (
        <div>
          <h1>Create a Post</h1>
          <Nav/>
            <form onSubmit={createHandler.bind(this)}>
              <input
                  onChange={fieldsHandler.bind(this)}
                    type="text"
                    name="title"
                  placeholder="title" />
              <br />

              <textarea
                  onChange={fieldsHandler.bind(this)}
                    type="text"
                    name="content"
                  placeholder="content" >

                  </textarea>
                  <button type="submit">
                      Create Post
              </button>
              <div>Status: {status}</div>
            </form>
        </div>
  )
}
