{<template>
<div class="wrapper padding">
<div class="main ">
    <div class="titleSearch">
        <h3 class="title">Узнать погоду в городе:</h3>
        <Load v-if="!requested"></Load>
    <Form v-on:request="sendRequest"  v-on:fetch="fetch" v-on:cache="cache"
    />
    </div>
    <div class="mainInfo mt-5" v-if="requested">
        <div class="likeBlock">
            <a href="#"
            :class="['like', liked ? likedClass : unlikedClass]" 
            v-on:click="liked?  removeFromLs(mainInfo.name) : addToLs(mainInfo.name)">
            </a>
            <span>В избранные</span>   
        </div>
        <h3>{{mainInfo.name}}</h3>
        <div class="mainInfo-icon">
            <img v-bind:src="'http://openweathermap.org/img/wn/' + mainInfo.weather[0].icon + '@2x.png'">
            <span >{{mainInfo.weather[0].description}}</span>
        </div>
        <div class="mainInfo-temp" :style="{}"><span v-if="mainInfo.main.temp > 0.9">+</span>{{Math.floor(mainInfo.main.temp)}}</div>
        <div class="mainInfo-feeling">Ощущается как: {{Math.floor(mainInfo.main.feels_like)}}</div>
        <div class="mainInfo-description">{{mainInfo.weather[0].description}}</div>
       
       <div class="aboveInfo">
            <div class="mainInfo-humidity">
                <img class="mainInfo-humidity--icon" src="../img/humidity.png">                
                <span class="mainInfo-humidity--text">Влажность: </span>
                <p>{{mainInfo.main.humidity}} %</p>
            </div>
            <div class="mainInfo-wind">
                <img class="mainInfo-humidity--icon" src="../img/wind.png">                
                <span class="mainInfo-humidity--text">Ветер:  </span>
                <p>{{mainInfo.wind.speed}} м/с</p>
            </div>
        </div>
        <hr>
        
    </div>
    
</div>
</div>
</template>

<script>
import Form from '../components/SearchForm.vue'
import axios from 'axios'
import {eventEmitter} from '../main'
import Load from '../components/Loader.vue'
// import Defaultcities from '../components/Defaultcities.vue'

export default{
    components: {
        Form,
        Load,        
    },
    
    data(){
        return{
            mainInfo: "info",
            requested: false,
            latestCity: '',
            liked: false,
            likedClass: 'liked',
            unlikedClass: 'unliked',
        }
    },
    mounted(){
        eventEmitter.$on('remove', (city) => {
            this.removeFromLs(city)
        });

        
    },
    methods: {
        
        sendRequest(obj, $event){     
        if($event.target.querySelector('input').classList.contains('warning')){
            $event.target.querySelector('input').classList.remove('warning')
        }
        if(obj.city){
          this.fetch(obj, $event);
        }
        else {
          return
        }
      },
     fetch(obj, $event){
         this.requested = false;
         return setTimeout(() => {
            axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${obj.city}&appid=${obj.key}&lang=ru&units=metric`)
          .then(response => {
          this.mainInfo = response.data;
          this.requested = true;
          this.prove();
          obj.info = this.mainInfo;
          localStorage.setItem('city', JSON.stringify(obj));
          },
          () => {
            this.requested = 'error'
            $event.target.querySelector('input').classList.add('warning');  
          });
         }, 500);
        
     },
    cache(info){
        this.mainInfo = info;
        this.prove();
        this.requested = true;
    },
     addToLs(name){
         if(!localStorage.getItem('citiesList')){
             let arr = [];
             arr.push(name);
             localStorage.setItem('citiesList', JSON.stringify(arr));
         }
         else {
            let arr = JSON.parse(localStorage.getItem('citiesList'));
            if(arr.indexOf(name) > -1){
                return;
            }
            else {
            arr.push(name);
                    localStorage.setItem('citiesList', JSON.stringify(arr))
                 }
            }  
            this.prove();
            this.input.focus()
     },

     removeFromLs(name){
         if(!localStorage.getItem('citiesList')){
             return
         }
         else {
             let arr = JSON.parse(localStorage.getItem('citiesList'));
             let i = arr.indexOf(name);
             if(i > -1){
              arr.splice(i, 1);
              localStorage.setItem('citiesList', JSON.stringify(arr));
             }
             else {
                    return
             }
         }
         this.prove();
         this.input.focus()
     },
   
     prove (){
         if(JSON.parse(localStorage.getItem('citiesList'))){
         this.liked =  JSON.parse(localStorage.getItem('citiesList')).indexOf(this.mainInfo.name) > -1
        return true
         }
         else {
             return false
         }
     },
    
    },
    computed: {
        input(){
        return document.querySelector('input')
      }
    }
}
</script>
 

<style lang="less" scoped>
@import '../components/vars.less';
@import '../components/general.less';
    .capitalsList{
        display: none;
    }
    .wrapper {
        background-color: rgba(152,172,248, 0.44);
    }
    input {
        color: green;
    }
    .main {
        text-align: left; 
        min-height:85vh;
        padding-top: 3%;
        .mainInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 100%;
        h3{
            font-size: 2.5rem;
        }
        div{
            width: 100%;
            padding: 3%;
            text-align: center

        }
        &-temp{
            font-size: 4rem;
            line-height: 4rem
        }
        .mainInfo-icon {
            width: 30%;
            position: absolute;
            top: 5%;
            right: 0;
            -webkit-filter: drop-shadow(0px 1px 2px #000);
            filter: drop-shadow(0px 1px 1px #000);
            img {
                width: 100%;
            }
            span {
                display: none;
            }
        }
        &-description {
            font-size: 1.3rem;
        }
        .mainInfo-feeling {
            padding-top: 0;
        }
        .mainInfo-temp {
            padding-bottom: 0;
        }

        .aboveInfo {
            display: flex;
            flex-direction: row;

            div{ 
                width: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                p {
                    margin: 0;
                    padding: 0;
                    font-weight: bold;
                }
            }
            .mainInfo-wind{
                p {
                    margin-left: 7%;
                }
            }
            .mainInfo-humidity--icon{
                width: 30%;
                  -webkit-filter: drop-shadow(0px 1px 2px #000);
            filter: drop-shadow(0px 1px 2px #000);
            }
            .mainInfo-humidity--text{
                display: none;
            }
        }
        .likeBlock{
        position: absolute;
        left: 0;
        top: 2%;
        width: max-content;
        display: flex;
        align-items: end;
        padding: 0;
            .like {
            width: 8vw;
            height: 8vw;
            background-size: contain;
            background-repeat: no-repeat;
            max-width: 43px;
            }   
            span {
                display: none;
                line-height:normal;
            }    
        }
        
    }
    }
    
    

    .liked {
        background-image: url('../img/liked.png');
        animation: like 0.4s; 
    }
    .unliked {
        background-image: url('../img/unliked.png');
        animation: unlike 0.4s; 

    }
 @media(min-width: 540px){
        .container-sm {
            max-width: 80%;
        }
 }
 @media(min-width: @laptop){
        
        .main {
            .titleSearch{
                display: flex;
            }
            .title {
                margin: 0;
                width: 50%;
            }
            .formWrapper {
                width: 50%;
            }


            .mainInfo {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            h3{
                width: 100%;
                text-align: center;
            }
            .mainInfo-icon, .mainInfo-temp,
            .mainInfo-feeling, .mainInfo-description,
            .aboveInfo {
                padding: 1.5%;
            }
            .mainInfo-icon, .mainInfo-temp  {
                width: 50%;
                text-align: left;
                 
                img {
                    width: 35%;
                   
                }  
            }
            .mainInfo-icon {
                text-align: end;
                position: static;
            }

             .likeBlock{
                 .like{
                     width: 5vw;
                     height: 5vw;
                 }
                span {
                    display: block;
                }
            }   
         }
        }   
    }

    @media(min-width: @desktop){
        .capitalsList{
            display:block;
        }
        .container-sm {
            max-width: 7
            0%;
        }
        

        .main {
            padding-top: 3%;
            background-color: rgba(152,172,248, 0.44);
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
            min-height: 60vh;
            padding-left: 2%;
            padding-right: 2%;

             .titleSearch{
                width: 100%;
                .title{
                    width: max-content;
                }
            }
            .mainInfo{
                width: 50%;
                h3 {
                    order: -3;
                }  

                  .mainInfo-icon {
                    position: unset;
                    order: 0;
                    text-align: left;
                   
                    img{
                        width: 25%;
                        &:hover + span {
                            display: block;
                            position: absolute;
                            top: 30%;
                            right: 10%;
                            background-color: rgba(0,0,0, 0.3);
                        }
                    }
                    text-align: start;
                }  


                 .mainInfo-temp{
                    order: -1;
                    text-align: end;
                }

                .likeBlock{
                 .like{
                     width: 2vw;
                     height: 2vw;
                     &:hover {
                         opacity: 0.5;
                     }
                 }
                }
            }
        }     
    }

@media(min-width: 1200px){
    .wrapper {
        // animation: bg 10s ease-in-out infinite;
          background-repeat: no-repeat;
        background-size:cover;
        
    }
}
    @keyframes like {
        50% {
           transform: scale(1.2)
        }
    }
    @keyframes unlike {
        50% {
           transform: scale(1.2)
        }
    }
    @keyframes bg {
        0% {
            background-image: url('../img/natureBg/1.jpg')
        }
        35% {
            background-image: url('../img/natureBg/2.jpg')

        }
        65%{
            background-image: url('../img/natureBg/3.jpg')

        }
        90%{
            background-image: url('../img/natureBg/4.jpg')
        }
    }

    
</style>