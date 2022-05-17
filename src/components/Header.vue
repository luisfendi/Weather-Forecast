<template>
<div class="header ">
  <b-navbar class='navbar padding' toggleable="lg" type="dark" variant="dark">
  
    <b-navbar-nav class='header-links container'>
        <router-link v-for="(page,i)  in pages"  
        :to="{name: page}" 
        :key="i"
        class="header-links--item"
        ><span class='text'>{{page}}</span>
        <img class="icon" :src="require(`../img/${page}.svg`)">
        </router-link>   
    </b-navbar-nav>
  </b-navbar>
</div>
</template>


<script>
        // <img class="icon" v-bind:src="`../img/search.png`"  :key="i">

export default{
    props: ['pages'],
    data(){
        return{
            main: require("../img/main.svg"),
            saved: require("../img/saved.svg"),
        }
    },
    methods: {
        imageBg(){
            // return ('url' + '(../img/'+page+'.svg)')
            return ('url(../img/search.png)')
        }
    }
}
</script>
 

<style lang="less" scoped>
@import './vars.less';
@import './general.less';
.container {
    margin-left: 0;
}
.header{
    display: flex;
    flex-direction: row;
    &:after{
        content: '';
    }
    & .navbar {
    width: 100%;
    display: flex;
    flex-direction: row;
     justify-content: center;
    }
}

.navbar{
.header-links {
        flex-direction: row;
        justify-content: center;
    &--item{
        color: @text-color;
        width: 50%;
        padding-left: 7%;
        padding-right: 7%;
        border-right: 2px solid white;

        .icon {
            width: 100%;
            max-width: 25px;
        }
        .text{
            display: none;
        }
        &:last-child {
            border-right: none;
        }
    }
}
}



@media(min-width: @laptop){
    
    .header-links {
      
    &--item{
        display:flex;
        align-items: center;
        justify-content: center;
        .text{
            display: block;  
        }  
    }
    }
}

@media(min-width: @desktop){
    
    .header{
        .navbar{
        justify-content: flex-start;
        padding-top: 0;
        padding-bottom: 0;
        }

        .header-links {
        justify-content: flex-start;
        &--item{
        display:flex;
        width: 5%;
        min-height: 53px;
        position:relative;
        border: none;
        padding: 0.7rem;
        min-width:75px;
        margin-right: 5%;
        cursor: pointer;
        &:first-child{
            padding-left: 0;
            justify-content: left;
        }
        .icon{
            display: none;
            width: 100%;
            max-width: 30px;
        }
        .text{
            display:block;
            animation: displayBlock .7s;
        }
        &:hover{
            .icon{
                display: block;
                animation: displayBlock .7s;
            }
            .text{
                display: none;
            }
        }   
    }
}
    }
    
  
}




</style>