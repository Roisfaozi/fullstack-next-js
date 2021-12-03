import router from 'next/router'
import React, { useState } from 'react'
import Nav from '../../components/nav'
import { authPage } from '../../middlewares/authorizationPage'

export async function getServerSideProps (ctx) {
  const { token } = await authPage(ctx)

  const postReq = await fetch('http://localhost:3000/api/posts', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  const posts = await postReq.json()

  return {
    props: {
      token,
      posts: posts.data
    }
  }
}
export default function PostIndex (props) {
  const [posts, setPost] = useState(props.posts)

  async function deleteHandler (id, e) {
    e.preventDefault()

    const { token } = props
    console.log(token)
    const ask = confirm('Data ini akan dihapus')

    if (ask) {
      const deletePost = await fetch('/api/posts/delete/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      const response = await deletePost.json()

      const postFilter = posts.filter(post => {
        return post.id !== id && post
      })

      setPost(postFilter)
    }
  }

  function editHandler (id) {
    router.push('/posts/edit/' + id)
  }
  return (
        <div>
      <h1>Posts</h1>
      <Nav/>
      {
        posts.map(post => {
          return (

            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div>
                <button onClick={editHandler.bind(this, post.id)}>edit</button>
                <button onClick={deleteHandler.bind(this,
                  post.id
                )}>Delete</button>

              <hr />

              </div>
              </div>
          )
        }
        )
          }
        </div>
  )
}
