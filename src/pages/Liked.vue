<template>
<div class="wrapper padding">
<div  class="main ">
    <h3>Your liked cities: 
   
    </h3>
    <input type='text' v-model="searchInList" v-focus>
    <transition-group name="list" tag="ul" class='listUl'>
        <li v-for="(city) in searchInListLiked" :key="city" class="mt-5 list-item"
        >
            <button class="btn btn-danger" @click="remove(city)">
            <span>x</span> </button>
            <Card :city="city"/>
        </li>
   </transition-group>






</div>
</div>
</template>

<script>
import {eventEmitter} from '../main'
import Card from '../components/Card.vue'

export default{
    components: {
        Card
    },
    inject: ['key'],
    data(){
        return{
            listLiked: '',
            active: '',
            searchInList: '',
            cities: ['minsk','misk','minksk','miknksk','minesk','minrsk','miniosk','minsklk','minqqsk',]
        }
    },
    
    mounted(){
        this.listLiked = JSON.parse(localStorage.getItem('citiesList')) || '';
    },
    computed:{
        searchInListLiked(){
            if(!this.searchInList){
                return this.listLiked
            }
            else {
                let filter =  this.listLiked.filter( el => {
                return el.toLowerCase().indexOf(this.searchInList.toLowerCase()) >= 0
            })
            return filter
            }
        }
       
    },
    methods: {
        show(){

        },
        remove(city){
    
            eventEmitter.$emit('remove', city);
            this.listLiked = JSON.parse(localStorage.getItem('citiesList')) || '';
        },
        open(city){
            this.opened.push(city)
        },
        close(){
            this.opened.splice(this.openOrClose, 1)
        },
        
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    }
</script>
 

<style lang="less" scoped>
@import '../components/vars.less';
@import '../components/general.less';

    .list-enter{
        opacity: 0;
        transform:  translateY(-100vh);
    }
    
    .list-leave-to{
        opacity: 0;
        transform:  translateY(-100vh) rotate(180deg);
    }


    .list-leave-active, 
    .list-enter-active {
        transition: all 3s;
        opacity: 1;
    }
    
    .list-leave-active {
        position: absolute;
        left: 0;
        
    }

    .list-move {
      transition: all  1.5s;  
    }

    .count-enter p,
    .count-leave-to p{
        opacity: 0;
        transform: translateY(-100vh)
    }

    .count-leave-active, 
    .count-enter-active {
        transition: all 3s;
        opacity: 1;
    }
    .wrapper {
        background-color: rgba(152,172,248, 0.44);
    }
    .main {
        margin: 0;
        margin: auto;
        padding-top: 3%;
        padding-bottom: 3%;
        min-height: 80vh;
    }
  
    .listUl {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        list-style: none;
        padding: 0;
        margin: 0;
        
    }


    .list-item {
        transition: all 1s;
        display: flex;
        justify-content: space-around;
        align-items:center;
        width: 100%;
       
        padding-right: 10%;
        padding-left: 10%;

        button {
            width: 13%;
            text-align: center;

            display: flex;
            justify-content: center;
            align-items:center;
        }
        .cardCity {
            flex-grow: 2;
            display: flex;
            justify-content: inherit;
        }
    }

@media(min-width: @laptop){
        .listUl{
            flex-direction: row;
        }
    }
    @media(min-width: @desktop){
        .main {
        min-height: 60vh;
        background-color: rgba(152,172,248, 0.7);
        }
        .listUl{
            flex-direction: row;
        }

        .list-item {
            button {
                min-width: 36px;
            }
        }
    }
</style>