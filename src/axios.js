import axios from 'axios';


const instance = axios.create({  
    baseURL: 'https://hidden-crag-02537.herokuapp.com/'
})

export default instance



// baseURL:'http://localhost:8000/'