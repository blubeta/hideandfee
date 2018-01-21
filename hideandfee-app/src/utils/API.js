import axios from 'axios';

const baseAPIURL = "http://localhost:8080"

const getSteps = (fromCoin, toCoin, amount) => {
  return axios.get(`${baseAPIURL}/api?fromCoin=${fromCoin}&toCoin=${toCoin}&amount=${amount}`).then((resp) => {
    return resp.data
  }).catch((err) =>{
    console.log(err)
  })
}

export default getSteps
