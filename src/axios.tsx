import axios from 'axios';

const instance = axios.create({
    baseURL: `https://firestore.googleapis.com/v1/projects/${process.env.GATSBY_PROJECT}/databases/(default)/documents/familias/`,
});

export default instance;
