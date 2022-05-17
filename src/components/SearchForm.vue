<template>
<div class='formWrapper'>
  
  <form v-on:submit.prevent="$emit('request', {city, key}, $event), clear()"
   action="#"
   class="form"
   >
    <b-form-input action="#" 
    @input="reaction($event)"
     v-model="city" placeholder="Enter the city"
     v-focus></b-form-input>
    <button type="submit" class="btn"
    @click='$event.target.blur()'
    ><span>look</span></button>
  </form>
  </div>
</template>

<script>
  


  export default {
    data() {
      return {
        city: 'New York',
        timerId: '',
      }
    },
    created(){
      console.log('suka')
    },
    directives: {
      focus: {
        // определение директивы
        inserted: function (el) {
          el.focus()
        }
      }
    },
    inject: ['key'],
    mounted(){
      this.request()   
    },
    methods: {
      clear(){
        this.city="";
      },
      reaction(event){
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          if(!this.requested && this.city){
            this.$emit('fetch', {city: event, key: this.key})
          }
        }, 1500) 
      },
      request(){
        if(localStorage.getItem('city')){
          let info = JSON.parse(localStorage.getItem('city')).info;
          this.$emit('cache', info);
          this.city = '';
        }
        else {
          this.$emit('fetch', {city: this.city, key: this.key});
          this.city = '';
        }
      },
      
    },  
    computed:{
      url(){
        return `https://api.openweathermap.org/data/2.5/weather?q=${this.text}&appid=${this.key}`
      },
      
    },

    
}
  
</script>
 

<style lang="less" scoped>
@import './vars.less';
@keyframes warn {
        50% { 
            border: 6px solid rgba(232, 46, 46, 0.7);
            background-color: rgba(232, 46, 46, 0.5)
         }
    }
.warning {
        animation: warn 0.7s ease-in-out;
    }


    .form {
          display: flex;
          align-items: center;
          border: 1px solid gray;
          border-radius: 5px;
          position: relative;
          width: 100%;
          max-width: 350px;
          input {
            border: none;
          }
          button {
            width: 4vh;
            min-height: -webkit-fill-available;
            position: absolute;
            right: 0;
            margin: 0;
             &:after{
               content: '';
               position: absolute;
               background-image: url('../img/search.png');
               width: 100%;
               height: 100%;
               background-size: 70%;
               background-repeat: no-repeat;
               background-position: center;
               top: 0;
               left: 0;
               opacity: 0.5;
             }
            span {
              display: none;
            }
          }
    }

     @media(min-width: 767px){
       
         .form {
          display: flex;
          align-items: baseline;
          
          width: 90%;
          input{ 
            width: 100%;
          }
          button {
            &:after{
              background-size: 50%;
            }
          }
       }
       
       
       
     }

    @media(min-width: @desktop){
      .formWrapper {
         margin-left: 2%;
      }
      .form{
        border-top: none;
        border-right: none;
        border-left: none;
        border-radius: 0;
        padding-left: 5%;
        width: 35%;
       
        button {
          left: 3%;
          padding: 0;
          width: 15%;;
        }
        input{
          padding-left: 5%;
          padding-bottom: 0;
          line-height: normal;
          background-color: rgba(0,0,0,0);
        }
        input:focus{
          box-shadow: none;
        }
      }
    }
     
</style> 