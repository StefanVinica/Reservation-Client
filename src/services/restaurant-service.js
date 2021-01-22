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
    getRinfo(){
        return fetch(`${config.API_ENDPOINT}/rinfo`,{
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
    insertTable(table_size,r_id,t_name){
        return fetch(`${config.API_ENDPOINT}/table/${r_id}`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                table_size,
                t_name
            }),
        })
    },
    getTable(r_id){
        return fetch(`${config.API_ENDPOINT}/table/${r_id}`,{
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
    getUser(){
        return fetch(`${config.API_ENDPOINT}/user`,{
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
    findTables(type,party,from,to){
        return fetch(`${config.API_ENDPOINT}/find/${type}/${party}`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                from,
                to
            }),
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },
    makeReservation(restaurant_id,res_from,res_to,number_of_ppl,t_id){
        return fetch(`${config.API_ENDPOINT}/reservation`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                restaurant_id,
                res_from,
                res_to,
                number_of_ppl,
                t_id
            }),
        })
    },
    myReseservations(){
        return fetch(`${config.API_ENDPOINT}/myres`,{
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
    adminReseservations(r_id){
        return fetch(`${config.API_ENDPOINT}/adminres/${r_id}`,{
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
}

export default RestaurantService