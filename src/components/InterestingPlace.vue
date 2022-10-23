<template>
    <div class="int-place-item">
        <div class="int-place-info">
            <span class="place-name">{{ interestingPlace.properties.name }}</span><br>
            <span>📍 {{ interestingPlace.geometry.coordinates[1] }}, {{ interestingPlace.geometry.coordinates[0] }}</span><br>
            <span v-if="desc !== ''">{{ desc }}</span>
            <span v-else class="not-info">Not info(</span>
        </div>
    </div><br>
</template>

<script>
import {axios_requests} from '../utils/requests.js' 
export default {
    props: ['interestingPlace'],
    created() {
        axios_requests.get_description_by_id(this.interestingPlace.properties.xid).then(result => {
            console.log(result.data)
            this.desc = result.data.wikipedia_extracts.text
        })
    },

    data() {
        return {
            desc: ''
        }
    },
}
</script>

<style>
    .int-place-item {
        position: relative;
        width: 100%;
    }
    .not-info {
        color: red;
    }
</style>