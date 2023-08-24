import axios from 'axios'


let baseURL

if (process.env.NODE_ENV === 'production') {
    baseURL = ''
} else {
    baseURL = 'https://localhost:4000'
}

const instance = axios.create({
    baseURL: baseURL
})


export default instance