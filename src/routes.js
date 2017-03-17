import Home from './pages/home.vue'
import Driver from './pages/driver.vue'
import Payment from './pages/payment.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/driver/:id',
    name: 'driver',
    component: Driver
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment
  }
]

export default routes
