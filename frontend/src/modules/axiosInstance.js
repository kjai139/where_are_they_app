import axios from 'axios'


let baseURL

if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://where-are-they-app-il26.vercel.app/'
} else {
    baseURL = 'http://localhost:4000'
}

const instance = axios.create({
    baseURL: baseURL
})


export default instance