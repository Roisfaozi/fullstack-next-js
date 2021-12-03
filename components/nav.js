import Cookies from 'js-cookie'
import Link from 'next/link'
import router from 'next/router'
import React from 'react'
export default function Nav () {
  function logoutHandler (e) {
    e.preventDefault()
    Cookies.remove('token')
    router.replace('/auth/login')
  }
  return (
      <div>
          <Link href="/posts">
          <a>Posts</a>
          </Link>
          &nbsp; | &nbsp;
          <Link href="/posts/create">
          <a>Create Post</a>
          </Link>
          &nbsp; | &nbsp;
          <a href="#" onClick={logoutHandler.bind(this)}>Log Out</a>
        </div>
  )
}
