<template>
    <div class="places-list">
        <ul>
            <Place v-for="place of placeList" v-bind:place="place"/>
        </ul>
    </div>
</template>

<script>
import Place from './Place.vue';
export default {
    props: ['placeList'],
    components: { 
        Place 
    },
}
</script>

<style>
    ul {
        width: 100%;
    }

    .places-list {
        width: 100%;
    }
</style>