import axios from 'axios'
import kerberos from 'kerberos'

axios.interceptors.request.use(async (config) => {
    const url = new URL(config.url, config.baseURL)
    const serviceName = `HTTP@${url.hostname}`

    const client = await kerberos.initializeClient(serviceName, 0)
    const token = await client.step("")
    const header = "Negotiate " + token;

    config.headers.authorization = header
    return config

}, (error) => {
    return Promise.reject(error);
})

export default axios