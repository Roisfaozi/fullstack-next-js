import router from 'next/router'
import React, { useState } from 'react'
import Nav from '../../../components/nav'
import { authPage } from '../../../middlewares/authorizationPage'

export async function getServerSideProps (ctx) {
  const { token } = await authPage(ctx)

  const { id } = ctx.query

  const postReq = await fetch('http://localhost:3000/api/posts/detail/' + id, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  const res = await postReq.json()

  console.log(res)

  return {
    props: {
      token,
      post: res.data
    }
  }
}
export default function PostEdit (props) {
  const { post } = props

  const [fields, setFields] = useState({
    title: post.title,
    content: post.content
  })

  const [status, setStatus] = useState('normal')

  async function updateHandler (e) {
    e.preventDefault()

    setStatus('loading')
    const { token } = props

    const update = await fetch('/api/posts/update/' + post.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(fields)
    })

    if (!update.ok) return setStatus('Error')

    const res = await update.json()
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
      <h1>Edit a Post</h1>
      <Nav/>
      <p>Post ID : {post.id}</p>
            <form onSubmit={updateHandler.bind(this)}>
              <input
                  onChange={fieldsHandler.bind(this)}
                    type="text"
                    name="title"
          placeholder="title"
        defaultValue={post.title}
        />
              <br />

              <textarea
                  onChange={fieldsHandler.bind(this)}
                    type="text"
                    name="content"
          placeholder="content"
        defaultValue={post.content}

        >

                  </textarea>
                  <button type="submit">
                      Update Post
              </button>
              <div>Status: {status}</div>
            </form>
        </div>
  )
}
