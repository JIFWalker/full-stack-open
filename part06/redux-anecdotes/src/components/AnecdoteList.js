import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => 
        state.anecdotes.filter(anecdote => 
            anecdote.content.toLowerCase()
                .includes(state.filter.toLowerCase())))

    const dispatch = useDispatch()

    const sortedAnecdotes =  anecdotes.sort((a, b) => b.votes - a.votes)

    const voted = anecdote => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}`, 10))
    }

    return (
        <div>
        {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => voted(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList