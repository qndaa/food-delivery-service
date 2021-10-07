const Home = { template: '<home></home>'}
const Registration = { template: '<registration></registration>' }
const Login = { template: '<log-in></log-in>' }
const ValidationAccess = {template : '<validation-acces> </validation-acces>'}
const Profile = { template: '<profile></profile>' }
const CreateUser = { template: '<create-user></create-user>'}
const AllUsers = {template: '<all-users></all-users>'}
const CreateRestaurant = {template: '<create-restaurant></create-restaurant>'}
const Restaurant = {template: '<restaurant></restaurant>'}
const MyRestaurant = {template: '<my-restaurant></my-restaurant>'}
const Basket = {template: '<basket></basket>'}
const Orders = {template: '<orders></orders>'}
const DelivererOrders = {template: '<deliverer-orders></deliverer-orders>'}
const CustomerOrders = {template: '<customer-orders></customer-orders>'}
const ManagerOrders = {template: '<manager-orders></manager-orders>'}

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/registration', component: Registration },
    { path: '/login', component: Login },
    { path: '/validationAccess', component: ValidationAccess },
    { path: '/profile', component: Profile },
    { path: '/createUser', component: CreateUser },
    { path: '/allUsers', component: AllUsers },
    { path: '/createRestaurant', component: CreateRestaurant },
    { path: '/restaurant/:id', component: Restaurant },
    { path: '/myRestaurant', component: MyRestaurant },
    { path: '/basket', component: Basket },
    { path: '/delivererOrders', component: DelivererOrders },
    { path: '/customerOrders', component: CustomerOrders },
    { path: '/managerOrders', component: ManagerOrders },
    { path: '/'}
  ]
});

var app = new Vue({
  router,
  el: '#aplication',
  data : function () {
    return {
      mode: 'NO_LOGIN'
    }
  },
  beforeMount(){
    axios
    .get('/session')
    .then(response => (this.mode = response.data.typeOfUser))
  },
  updated(){
    axios
    .get('/session')
    .then(response => (this.mode = response.data.typeOfUser))
  },

  methods : {
    logout : function(){
      axios.get('/logout')
      .then(function(response){
        if(response.data == true){
          this.mode= 'NO_LOGIN';
          alert("Success logout!")
          window.location.href = "/#/login";
        }
      });
    }
  }
});
