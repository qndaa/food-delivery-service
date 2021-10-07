Vue.component("restaurant", {
	template : `

    <div v-if="restaurant != null" class="container text-primary ">
      <div class="row ">

            <div class="col-sm-4 mt-3 ">

                <div class="d-flex justify-content-center">
                    <h2>Restoran:</h2>
                </div>


                <div class="d-flex justify-content-center mt-2">
                    <img v-bind:src="restaurant.logoPath" alt="Profile picture" width="250" height="250"> </img>
                </div>

                <div class="row mt-4">
                    <div class="col w-50 d-flex justify-content-center">
                        <p>Naziv resorana:</p>
                    </div>
                    <div class="col w-50 d-flex justify-content-center">
                        <p class="font-weight-bold"> {{restaurant.name}}</p>
                    </div>
                </div>
                 <div class="row mt-2" >
                    <div class="col w-50 d-flex justify-content-center">
                        <p>Tip restorana:</p>

                    </div>
                    <div class="col w-50 d-flex justify-content-center">
                        <p class="font-weight-bold"> {{restaurant.tipRestaurant}} </p>

                    </div>
                </div>
                 <div class="row mt-2" >
                    <div class="col w-50 d-flex justify-content-center">
                        <p>Status: </p>
                    </div>
                    <div class="col w-50 d-flex justify-content-center">
                        <p class="font-weight-bold"> {{restaurant.statusOfRestaurant}} </p>
                    </div>
                </div>

                <div class="row mt-2" >
                   <div class="col w-50 d-flex justify-content-center">
                       <p>Grad: </p>
                   </div>
                   <div class="col w-50 d-flex justify-content-center">
                       <p class="font-weight-bold"> {{restaurant.location.address.city}} </p>
                   </div>
               </div>

               <div class="row mt-2" >
                  <div class="col w-50 d-flex justify-content-center">
                      <p>Ulica: </p>
                  </div>
                  <div class="col w-50 d-flex justify-content-center">
                      <p class="font-weight-bold"> {{restaurant.location.address.street}} </p>
                  </div>
              </div>

              <div class="row mt-2" >
                 <div class="col w-50 d-flex justify-content-center">
                     <p>Broj objekta: </p>
                 </div>
                 <div class="col w-50 d-flex justify-content-center">
                     <p class="font-weight-bold"> {{restaurant.location.address.numberHouse}} </p>
                 </div>
             </div>

             <div class="row mt-2" >
                <div class="col w-50 d-flex justify-content-center">
                    <p>Postanski broj: </p>
                </div>
                <div class="col w-50 d-flex justify-content-center">
                    <p class="font-weight-bold"> {{restaurant.location.address.postNumber}} </p>
                </div>
            </div>

						<div class="row mt-2" >
							 <div v-if="restaurant.avgMark === 0" class="col w-50 d-flex justify-content-center">
									 <p>Restoran nema ocenu!</p>
							 </div>
							 <div v-else class="col w-50 d-flex justify-content-center">
									 <p class="font-weight-bold">Prosecna ocena: {{restaurant.avgMark}} </p>
							 </div>
					 </div>


          </div>

					<div class=" col-sm-8 border-right border-info">

						<div class="d-flex justify-content-center mt-3" v-if="restaurant.articles.length == 0">
								<h2>Restoran nema artikle u ponudi!</h2>
						</div>

						<div v-else>
							<h2 class="mt-3"> Artikli: </h2>


							<div class="row">
								<div class="col-4 m-3" v-for="item in restaurant.articles" >
									<div class= "d-flex justify-content-center">
											<img v-bind:src="item.imagePath"  alt="Logo" width="120" height="120"> </img>
									</div>

									<div class= "d-flex justify-content-center">
										<h5>{{item.name}}</h5>
									</div>
									<div class= "d-flex justify-content-center">
										<h5>Cena: {{item.price}}</h5>
									</div>

									<div class= "d-flex justify-content-center">
										<h5>Opis: {{item.description}}</h5>
									</div>

									<div v-if="user !== null">

										<div class= "d-flex justify-content-center" v-if="restaurant.statusOfRestaurant ==='WORK' && user.typeOfUser === 'CUSTOMER'">
											<input v-bind:class="{'form-control':true}" type="number" class="form-control d-flex justify-content-center" id="quantity" v-model="item.quantityForBasket" />
										</div>


										<div class= "d-flex justify-content-center" v-if="restaurant.statusOfRestaurant ==='WORK' && user.typeOfUser === 'CUSTOMER'">
											<button type="button" class="btn btn-outline-danger m-2" v-on:click="addToBasket($event, item)">Dodaj</button>
										</div>

									</div>


								</div>

							</div>

						</div>


						<div class="d-flex justify-content-center mt-3" v-if="restaurant.comments.length == 0">
								<h2>Restoran nema komentare!</h2>
						</div>

						<div class="d-flex justify-content-start mt-3" v-else>
							<h2 class="mt-3"> Komentari: </h2>

						</div>


						<div v-for="com in restaurant.comments" class="border border-primary row mt-2">
							<div class= "d-flex justify-content-center col-8">
								<h5>Komentar: {{com.content}}</h5>
							</div>
							<div class= "d-flex justify-content-center col-4">
								<h5>Ocena: {{com.mark}}</h5>
							</div>





						</div>


						</div>

        </div>
    </div>

    `,
    data : function(){
      return {
        restaurant : null,
        id : this.$route.params.id,
        user: null,

      }
    },
    beforeCreate(){
      axios
      .get('/session')
      .then(response => (this.user = response.data));

    },
    mounted() {
      axios
      .post("/getRestaurant", null, { params:{
        id : this.id
      }})
      .then(response => {
        console.log(response.data);
        if (response.data === null) {
          window.location.href = "/#/";
        } else {
          this.restaurant = response.data;
        }
      });

    },
    methods : {
			addToBasket : function(event, item) {
				console.log(item);

				if(isNaN(item.quantityForBasket) || item.quantityForBasket === '' || item.quantityForBasket < 1) {
					alert("Neispravna kolicina!");
					return;
				}

				axios
				.post('/addToBasket', {
					restaurantId: this.id,
					articleId: item.id,
					quantity: item.quantityForBasket
				}).then(response => {
					console.log(response);
					if(response.data === true) {
						alert("Proizvod ubacen u korpu!");
						item.quantityForBasket = '';
					} else {
						alert(response.data);
						item.quantityForBasket = '';

					}

				});

			}






    }



});
