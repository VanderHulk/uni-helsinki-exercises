import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export const create = newContact => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

export const update = (id, newContact) => {    
    const request = axios.put(`${baseUrl}/${id}`, newContact)
    console.log(request)
    return request.then(response => response.data)
}

export const deleteItem = id => {
    console.log('you have reached delete request', id)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.status)
}