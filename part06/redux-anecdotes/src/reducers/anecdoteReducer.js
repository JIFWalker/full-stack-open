

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'anecdote/init':
      return action.payload

    case 'anecdote/new':
    return state.concat(action.payload)

    case 'anecdote/vote':
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)

      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)

    default:
        return state
  }
}

export const vote = (id) => {
  return {
    type: 'anecdote/vote',
    payload:  id 
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'anecdote/new',
    payload: content
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'anecdote/init',
    payload: anecdotes
  }
}

export default reducer