import React, { useState } from "react"


const Books = (props) => {
  const [genre, setGenre] = useState('All Genres')

  if (!props.show) {
    return null
  }

  const books = props.allBooks

// filters book genres and removes duplicates
  let genres = books.flatMap( book => 
    book.genres).sort()
      .filter((item, pos, ary) => {
        return !pos || item !== ary[pos -1]
  })

  genres.unshift('All Genres')

  const GenreSelector = () => (
      <div>
      {genres.map((g) => { return (
      <button 
      key={g} 
      onClick={() => setGenre(`${g}`)}
      >{g}</button>) })}
      </div>
    )

  const booksByGenre = books.filter(b => 
    genre !== 'All Genres' 
      ? b.genres.some(g => g === genre) 
      : books)


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <GenreSelector />
    </div>
  )
}

export default Books
