<template>
    <div class="place-item">
        <div class="place-info">
            <span @click="getWeatherAndInterestingPlaces" class="place-name">{{ place.name }}</span><br>
            <span> 🗺️ {{ place.country }} ,  {{ place.city }} ,  {{ place.street }} </span>
            <div v-bind:id="map_id" style="width: 100%; height: 400px;"></div><br>
            <span>📍 {{ place.point.lat }}, {{ place.point.lng }}</span><p></p>
            <div v-if="showWeather">
                <span>☁️ {{ weather.main }} ({{ weather.description }})</span><br>
                <span>🌡️ Current: {{ Math.round(temp.temp - 273.15)}}C, feels like: {{ Math.round(temp.feels_like - 273.15) }}C</span>
            </div><p></p>
            <InterestingPlaceList v-if="showIneterestingPlaces" v-bind:interestingPlaceList="interestingPlaceList"/>
        </div>
    </div><br>
</template>

<script>
import {axios_requests} from '../utils/requests.js' 
import gMap from "2gis-maps"
import tMarker from "./Marker.vue"
import InterestingPlaceList from './InterestingPlaceList.vue'
export default {
    components: {
        tMarker,
        InterestingPlaceList
    },
    props: ['place'],
    mounted() {
        let map;
        gMap.then(() => {
            map = DG.map(this.map_id, {
            center: [this.place.point.lat, this.place.point.lng],
            zoom: 20
            });
            DG.marker([this.place.point.lat, this.place.point.lng])
            .addTo(map)
            .bindPopup(`<tMarker count="1"></tMarker>`)
            .on("popupopen", function(e) {
                console.log(vm.$root);
                new vm.$root.$createElement({ el: e.popup._contentNode });
            });
        });
    },
    data() {
        return {
            map_id: 'map-' + this.place.point.lat,
            showIneterestingPlaces: false,
            showWeather: false,
            interestingPlaceList: [],
            weather: {},
            temp: {}
        }
    },
    methods: {
        getWeatherAndInterestingPlaces: function() {
            this.showIneterestingPlaces = true
            this.showWeather = true
            axios_requests.get_weather_by_coords(this.place.point.lat, this.place.point.lng).then(result => {
                this.weather = result.data.weather[0]
                this.temp = result.data.main
            })
            axios_requests.get_interesting_places(this.place.point.lat, this.place.point.lng).then(result => {
                this.interestingPlaceList = result.data.features
            })
        }
    }
}
</script>

<style>
    ul {
        padding: 0;
    }
    .place-item {
        position: relative;
        background-color: bisque;
        border-radius: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 5px;
        padding-right: 5px;
        width: 100%;
    }

    .place-info {
        width: 100%;
    }

    .place-name {
        color: black;
        font-size: 20px;
    }
    .place-name:hover {
        cursor: pointer;
    }
</style>