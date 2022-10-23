<template>
    <div>
        <ul>
            <InterestingPlace v-for="interestingPlace of interestingPlaceList" v-bind:interestingPlace="interestingPlace"/>
        </ul>
    </div>
</template>

<script>
import InterestingPlace from './InterestingPlace.vue';
export default {
    props: ['interestingPlaceList'],
    components: { 
        InterestingPlace 
    },
}
</script>

<style></style>