// Backend api 
const BACKEND_SERVER = 'https://jigo-backend.herokuapp.com/'

export const getAPIPath = (endpoint => BACKEND_SERVER + endpoint)

export const getDevAPIPAth = (endpoint =>'http://localhost:8889/' + endpoint)