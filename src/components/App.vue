<template>
  <div class="window">
    <div class="main-screen">
      <input class="place-finder" type="text" placeholder="Enter place name:" v-model="placeName">
      <button class="search-btn" @click="showPlacesByName" >Search</button>
      <div v-if="showError" class="error-string">
        {{ errorString }}
      </div>
      <PlaceList v-bind:placeList="placeList" class="places-list"/>
    </div>
  </div>
</template>

<script>
import {axios_requests} from '../utils/requests.js' 
import PlaceList from './PlaceList.vue'
export default {
  components: {
    PlaceList,
  },

  data() {
      return {
          placeName: '',
          showError: false,
          errorString:'',
          placeList: [],
      }
  },

  methods: {
    showPlacesByName: function() {
      if (this.placeName === '') {
        this.showError = true
        this.errorString = 'Place name is empty!'
      } else {
        this.showError = false
        this.errorString = ''
        this.placeList = []
        axios_requests.get_places_by_name(this.placeName).then(result => {
          this.placeList = result.data.hits
          this.placeName = ''
        })
      }
    }
  }
}
</script>

<style>
  body {
      height: 100%;
      background-color: rgb(162, 136, 103)  }

  button:hover {
    cursor: pointer;
    border-color: bisque;
  }

  .window {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  
  .main-screen {
    position: absolute;
    width: 32.5%;
    left: 33%;
  }

  .place-finder {
    font-size: 30px;
    border-radius: 10px;
    border-style: solid;
    border-color: white;
  }

  .search-btn {
    border-radius: 10px;
    border-style: solid;
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 4px;
    background-color: white;
    border-color: white;
    color: grey;
  }

  .error-string {
    position: relative;
    color: red;
    margin-left: 34%;
    display: flex;
  }
</style>