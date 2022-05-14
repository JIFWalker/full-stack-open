/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { ALL_AUTHORS, ALL_BOOKS, } from './queries'


const App = () => {
  const [token, setToken] = useState(null)
  const results = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  if (results.loading || books.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }



  if (!token) {
    return (
      <LoginForm show={page === 'login'} setToken={setToken} />
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} allAuthors={results.data.allAuthors} />

      <Books show={page === 'books'} allBooks={books.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
