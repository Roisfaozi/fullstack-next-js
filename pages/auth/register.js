import Link from 'next/link'
import React, { useState } from 'react'
import { unauthPage } from '../../middlewares/authorizationPage'

export async function getServerSideProps (ctx) {
  await unauthPage(ctx)

  return { props: {} }
}
export default function Register () {
  const [fields, setFields] = useState({
    email: '',
    password: ''
  })

  const [status, setStatus] = useState('normal')

  async function registerHandler (e) {
    e.preventDefault()

    setStatus('loading')

    const registerReq = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!registerReq.ok) return setStatus('error ' + registerReq.status)

    const registerRes = await registerReq.json()
    setStatus('success')
  }

  function fieldHandler (e) {
    const name = e.target.getAttribute('name')
    setFields({
      ...fields,
      [name]: e.target.value
    })
  }
  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={registerHandler.bind(this)}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={fieldHandler.bind(this)}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
        onChange={fieldHandler.bind(this)}
        />
        <button type="submit">Register</button>
        <div>{status}</div>

        <Link href="/auth/login"><a>Login</a></Link>

      </form>
    </div>
  )
}
