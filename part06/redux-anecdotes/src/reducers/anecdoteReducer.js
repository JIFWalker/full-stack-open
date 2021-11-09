import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'anecdote/init':
      return action.payload

    case 'anecdote/new':
    return state.concat(action.payload)

    case 'anecdote/vote':
      const id = action.payload.id
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

export const vote = (anecdote) => {
  return async dispatch => {
    const voted = { ...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.vote(voted)
    dispatch ({
      type: 'anecdote/vote',
      payload: anecdote 
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'anecdote/new',
      payload: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'anecdote/init',
      payload: anecdotes,
    })
  }
}

export default reducer