Vue.component("basket", {
	template : `

    <div class="container text-primary" v-if="basket !== null">
      <div class="d-flex justify-content-center mt-3" v-if="this.basket.items.length === 0">
        <h3>Nema proizvoda u korpi! </h3>
      </div>

			<div v-else>

				<h3 class="mt-5 md-3">Proizvodi u korpi! </h3>
				<table class="table table-primary">
					<thead class="thead-dark">
						<tr>
							<th scope="col">Slika</th>
							<th scope="col">Proizvod</th>
							<th scope="col">Kolicina</th>
							<th scope="col">Cena</th>
							<th scope="col"></th>

						</tr>
					</thead>
					<tbody>
						<tr v-for="item in basket.items">
							<td>
								<img v-bind:src="item.article.imagePath"  alt="Logo" width="120" height="120"> </img>

							</td>
							<td>{{item.article.name}}</td>
							<td>
								<div>
									{{item.quantity}}
								</div>

								<div class="row">
									<label for="q" class="mt-2 mr-2" >Nova kolicina: </label>
									<input id="q" type="number" v-model="item.article.newQuantity" class="form-control w-25" >
								</div>
							</td>
							<th scope="row">{{item.quantity}}x{{item.article.price}}={{item.quantity*item.article.price}}</th>
							<td>
								<button class="btn btn-outline-danger" v-on:click="removeFromBasket($event, item)"> Izbaci  </button>

								<button class="btn btn-outline-warning" v-on:click="updateBasket($event, item)"> Nova kolicina  </button>
							</td>
						</tr>

						<tr>
							<th scope="row">Ukupna cena:</th>
							<td></td>
							<td></td>
							<th scope="row">{{basket.price}}</th>
							<td></td>
						</tr>


					</tbody>
				</table>
				<div class="d-flex justify-content-center">
					<button class="btn btn-outline-success" v-on:click="createOrder($event)"> Kreiraj porudzbinu  </button>
				</div>

			</div>
    </div>

    `,
    data : function(){
      return {
        basket : null,
        user: null,
      }
    },
    beforeCreate(){
      axios
      .get('/session')
      .then(response => {
        this.user = response.data
        if (this.user.typeOfUser === 'CUSTOMER') {
          axios.get('/basket')
          .then(r => (this.basket = r.data));
        } else {
          window.location.href = "#/validationAccess";
        }
      });

    },
		methods: {

			createOrder : function (event) {
				axios.post("/createOrder")
				.then(response => {
					if (response.data === true) {
						alert("Porudzbina kreirana!");
						window.location.href = '/#/customerOrders'
					} else {
						alert("Greska prilikom kreiranja porudzbine!");
					}
				})

			},

			removeFromBasket: function(event, item) {
				axios
				.post('/removeFromBasket', {
					articleId: item.article.id,
				}).then(response => {
					console.log(response);
					if(response.data === false) {
						alert("Greska");
					} else {
						alert("Proizvod uklonjen!");
						axios.get('/basket')
	          .then(r => (this.basket = r.data));
					}

				});
			},
			updateBasket: function(event, item) {

				console.log(item.article)
				if(isNaN(item.article.newQuantity) || item.article.newQuantity == '' || item.article.newQuantity < 1) {
					alert("Neispravna kolicina");
					return;
				}

				axios.post('/updateBasket', {
					id: item.article.id,
					quantity: item.article.newQuantity
				}).then(response => {

					this.basket = response.data;
				});



			}





		}

});
