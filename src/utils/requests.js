import axios from "axios"

const GEOCODING_API_URL = 'https://graphhopper.com/api/1/geocode' 
const GEO_API_KEY = 'b1425526-a75a-43bc-a72d-24540134e8bf'

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather'
const WEATHER_API_KEY = 'cf76756b64a539656a3092df01dd590f'

const OPEN_TRIP_MAP_API_URL = 'http://api.opentripmap.com/0.1/ru/places/'
const OPEN_TRIP_MAP_API_KEY = '5ae2e3f221c38a28845f05b6745872e058a1506ab8b6c64bd8e299cd'

export const axios_requests = {
    get_places_by_name(place_name) {
        return axios ({
            method: 'get',
            url: GEOCODING_API_URL + '?q=' + place_name + '&locale=ru&limit=32&key=' + GEO_API_KEY
        })
    },

    get_weather_by_coords(lat, lon) {
        return axios ({
            method: 'get',
            url: WEATHER_API_URL + '?lat=' + lat + '&lon=' + lon + '&appid=' + WEATHER_API_KEY
        })
    },

    get_interesting_places(lat, lon) {
        return axios ({
            method: 'get',
            url: OPEN_TRIP_MAP_API_URL + 'radius?radius=2000&lon=' + lon + '&lat=' + lat + '&limit=5' + '&apikey=' + OPEN_TRIP_MAP_API_KEY
        })
    },

    get_description_by_id(id) {
        return axios ({
            method: 'get',
            url: OPEN_TRIP_MAP_API_URL + 'xid/' + id + '?apikey=' + OPEN_TRIP_MAP_API_KEY
        })
    }
}