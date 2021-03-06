import axios from 'axios'

const database = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios.get(database)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(database, newPerson)
    return request.then(response => response.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${database}/${id}`, newPerson)
    return request.then(response => response.data)
}

const remove = id => {
    return axios.delete(`${database}/${id}`)
}




const exportObject = {getAll, create, update, remove}
export default exportObject