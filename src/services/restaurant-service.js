import config from '../config'
import TokenService from './token-service'

const RestaurantService = {
    getInfo(){
        return fetch(`${config.API_ENDPOINT}/info`,{
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    }
}

export default RestaurantService