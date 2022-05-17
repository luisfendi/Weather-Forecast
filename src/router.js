import VueRouter from 'vue-router'
import Main from './pages/Main.vue'
import Liked from './pages/Liked.vue'

export default new VueRouter ({
   routes : [
    { path: '', name: 'main', component: Main },
    { path: '/saved', name: 'saved', component: Liked },
  ],
  mode: 'history'
}
)
