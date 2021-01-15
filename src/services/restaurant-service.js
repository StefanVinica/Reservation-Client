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
    },
    getType(){
        return fetch(`${config.API_ENDPOINT}/info/type`,{
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
    },
    updateRestaurant(r_name,r_adress,r_phone,r_type,r_id){
        return fetch(`${config.API_ENDPOINT}/info/${r_id}`,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                r_name,
                r_adress,
                r_phone,
                r_type
            }),
        })
    },
}

export default RestaurantService