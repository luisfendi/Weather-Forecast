<template>
    <div class="cardCity">
        <div class='mainInfo' v-if="mainInfo">
            <p class="cardTemp">{{city}}</p>
            <div class="mainInfo-icon"> <img v-bind:src="'http://openweathermap.org/img/wn/' + mainInfo.weather[0].icon + '@2x.png'"></div>
            <div class="mainInfo-temp"><span v-if="mainInfo.main.temp > 0.9">+</span>{{Math.floor(mainInfo.main.temp)}}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'


export default{
    props: ['city'],
    inject: ['key'],
    data(){
        return {
            mainInfo: ''
        }
    },
    created(){
        this.fetch(this.city); 
    },
    mounted(){
        this.$el.addEventListener('touchmove', (event) => {
            event.stopPropagation();
            event.stopImmediatePropagation()
            
        })
    },
    methods: {
        fetch(city){
            axios        
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}&lang=ru&units=metric`)
            .then(response => {
                this.mainInfo = Object.freeze(response.data)
            })
        },
        
        
    }
}
</script>

<style scoped lang="less">
@import './vars.less';

    .mainInfo {
        display: flex;
        align-items: baseline;
        justify-content: center;
        font-weight: bold;
    }


    @media(min-width: @laptop){
        .mainInfo {
            width: 100%;
            flex-direction: column;
            align-items: center;
        }
    }
</style>