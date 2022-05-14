import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'

const UpdateAuthor = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [ updateBorn ] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })

    const submit = async (event) => {
        event.preventDefault()

        updateBorn({ variables: {name, born}})

        setName('')
        setBorn('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name
                    <select value={name} onChange={({ target }) => setName(target.value)}>
                        {authors.map(a => {return (<option key={a.name} value={a.name}>{a.name}</option>)})}
                    </select >
                </div>
                <div>
                    born
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(parseInt(target.value))}
                        />
                </div>
                <button type='submit'>Update Author</button>
            </form>
        </div>
    )
}

export default UpdateAuthor