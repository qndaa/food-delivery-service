Vue.component("my-restaurant", {
	template : `

    <div v-if="user !== null" class="container text-primary ">
			<div class="col-sm-4 mt-3" v-if="showRestaurant === false">
				<div class="d-flex justify-content-center">
					<h2>Menadzer nema dodjeljen restoran!</h2>
				</div>
			</div>
      <div v-if="showRestaurant === true" class="row">




        <div  class="col-sm-4  border-left border-right border-info" >

          <div class="d-flex justify-content-center mt-3">
            <h2>Restoran:</h2>
          </div>

          <div class="d-flex justify-content-center mt-2">
            <img v-bind:src="user.restaurant.logoPath" alt="Profile picture" width="250" height="250"> </img>
          </div>

          <div class="row mt-4">
            <div class="col w-50 d-flex justify-content-center">
              <p>Naziv resorana:</p>
            </div>
            <div class="col w-50 d-flex justify-content-center">
              <p class="font-weight-bold"> {{user.restaurant.name}}</p>
            </div>
          </div>
          <div class="row mt-2" >
            <div class="col w-50 d-flex justify-content-center">
              <p>Tip restorana:</p>
            </div>
            <div class="col w-50 d-flex justify-content-center">
              <p class="font-weight-bold"> {{user.restaurant.tipRestaurant}} </p>
            </div>
          </div>
          <div class="row mt-2" >
            <div class="col w-50 d-flex justify-content-center">
              <p>Status: </p>
            </div>
            <div class="col w-50 d-flex justify-content-center">
              <p class="font-weight-bold"> {{user.restaurant.statusOfRestaurant}} </p>
            </div>
          </div>
          <div class="row mt-2" >
            <div class="col w-50 d-flex justify-content-center">
              <p>Grad: </p>
            </div>
            <div class="col w-50 d-flex justify-content-center">
              <p class="font-weight-bold"> {{user.restaurant.location.address.city}} </p>
            </div>
          </div>

          <div class="row mt-2" >
            <div class="col w-50 d-flex justify-content-center">
              <p>Ulica: </p>
            </div>
            <div class="col w-50 d-flex justify-content-center">
              <p class="font-weight-bold"> {{user.restaurant.location.address.street}} </p>
            </div>
          </div>
          <div class="row mt-2" >
            <div class="col w-50 d-flex justify-content-center">
              <p>Broj objekta: </p>
            </div>
            <div class="col w-50 d-flex justify-content-center">
              <p class="font-weight-bold"> {{user.restaurant.location.address.numberHouse}} </p>
            </div>
          </div>

          <div class="row mt-2" >
            <div class="col w-50 d-flex justify-content-center">
              <p>Postanski broj: </p>
            </div>
            <div class="col w-50 d-flex justify-content-center">
              <p class="font-weight-bold"> {{user.restaurant.location.address.postNumber}} </p>
            </div>
          </div>
          <div class="border-top border-info">
            <div class="d-flex justify-content-center mt-3">
              <h2>Dodaj artikl:</h2>
            </div>



						<div class= "row d-flex justify-content-center" v-if="Article.imagePath !== ''">
							<img v-bind:src="Article.imagePath" alt="" width="150" height="150"> </img>
						</div>

						<div class="btn btn-primary btn-sm w-100">
	      					<input type="file" name="image" id="image" @change="uploadImage" accept="image/*"/>
	    				</div>

						<div class="form-group">
							<label for="nameItem" class="text-primary mt-4">Naziv: </label>
	            <input v-bind:class="{'form-control':true, 'is-invalid': this.Article.name.length == 0 && clickSub}" type="text" class="form-control d-flex justify-content-center" id="nameItem" v-model="Article.name" required />
	             <div class="invalid-feedback">
	                Unesite naziv artikla!
	              </div>
						</div>

						<div class="form-group">
							<label for="nameItem" class="text-primary mt-1">Cena: </label>
	            <input v-bind:class="{'form-control':true, 'is-invalid': this.Article.price < 1 && clickSub}" type="number" class="form-control d-flex justify-content-center" id="price" v-model="Article.price" />
	             <div class="invalid-feedback">
	                Unesite cenu artikla!
	              </div>
						</div>

						<div class="form-group">
		 					<label for="grender" class="text-primary">Tip:</label>
							<select v-bind:class="{'form-control' : true, 'is-invalid' : this.Article.tipArticle === ''  && clickSub}"  id="tip" class="custom-select" v-model="Article.tipArticle"  required>
								<option value="">Izaberi</option>
								<option>FOOD</option>
								<option>DRINK</option>
							</select>
							<div class="invalid-feedback">
									Izaberite tip!
							</div>

		 				</div>




						<div class="form-group">
							<label for="nameItem" class="text-primary mt-1">Kolicina: </label>
	            <input v-bind:class="{'form-control':true}" type="number" class="form-control d-flex justify-content-center" id="quantity" v-model="Article.quantity" />

						</div>

						<div class="form-group">
							<label for="nameItem" class="text-primary mt-1">Opis: </label>
	            <input v-bind:class="{'form-control':true}" type="text" class="form-control d-flex justify-content-center" id="description" v-model="Article.description"/>
						</div>

						<div class= "d-flex justify-content-center w-100 mt-3 mb-2">
							<button type="button" class="btn btn-outline-success m-3" v-on:click="addItem" v-if="Article.id === ''">Dodaj</button>
							<button type="button" class="btn btn-outline-success m-3" v-on:click="updateItem" v-if="Article.id !== ''">Izmeni</button>

              <button type="button" class="btn btn-outline-warning m-3" v-on:click="reset">Restart</button>

						</div>
					</div>

        </div>


        <div class=" col-sm-8 border-right border-info">

          <div class="d-flex justify-content-center mt-3" v-if="user.restaurant.articles.length == 0">
              <h2>Restoran nema artikle u ponudi!</h2>
          </div>

          <div v-else>
						<h2 class="mt-3"> Artikli: </h2>


						<div class="row">
							<div class="col-2 m-3 border border-info rounded" v-for="item in user.restaurant.articles" >
								<div class= "d-flex justify-content-center">
										<img v-bind:src="item.imagePath"  alt="Logo" width="120" height="120"> </img>
								</div>

								<div class= "d-flex justify-content-center mt-3">
									<h5>{{item.name}}</h5>
								</div>
								<div class= "d-flex justify-content-center">
									<h5>Cena:{{item.price}}</h5>
								</div>

								<div  class= "d-flex justify-content-center">
									<button type="button" class="btn btn-outline-danger m-2" v-on:click="selectItem($event, item)">Izmeni</button>
								</div>

							</div>

						</div>

          </div>

					<div class="d-flex justify-content-center mt-3" v-if="user.restaurant.comments.length == 0">
							<h2>Restoran nema komentare!</h2>
					</div>

					<div class="d-flex justify-content-start mt-3" v-else>
						<h2 class="mt-3"> Komentari: </h2>

					</div>


					<div v-for="com in user.restaurant.comments" class="border border-primary row mt-2">
						<div class= "d-flex justify-content-center col-6">
							<h5 class="mt-3">Komentar: {{com.content}}</h5>
						</div>
						<div class= "d-flex justify-content-center col-2">
							<h5 class="mt-3">Ocena: {{com.mark}}</h5>
						</div>
						<div class= "d-flex justify-content-center col-2" v-if="com.status === 'WAIT'">
						<button type="button" class="btn btn-outline-success m-2" v-on:click="approveComment($event, com)">Odobri</button>
						</div>
						<div class= "d-flex justify-content-center col-2" v-if="com.status === 'WAIT'">
						<button type="button" class="btn btn-outline-danger m-2" v-on:click="declineComment($event, com)">Odbij</button>
						</div>

						<div class= "d-flex justify-content-center col-4" v-if="com.status !== 'WAIT'">
						<h5 class="mt-3">Status: {{com.status}}</h5>
						</div>

					</div>


        </div>
      </div>
    </div>

    `,
    data : function(){
      return {
				showRestaurant: false,
        restaurant : null,
        user: null,
				clickSub: false,
				Article : {
					id: '',
					imagePath: '',
					name: '',
					quantity: 0,
					tipArticle: '',
					description: '',
					price: 0,
				}
      }
    },
    beforeCreate(){
      axios
      .get('/session')
      .then(response => {
				console.log(response);
				if (response.data.typeOfUser !== 'MANAGER') {
					window.location.href = "/#/validationAccess";

				} else {
					this.user = response.data;
					console.log(response.data.restaurantId);
					if (response.data.restaurantId !== undefined) {
						this.showRestaurant = true;
					}

					console.log(this.showRestaurant);
				}

      });

    },

    methods : {
			reset: function () {
				this.Article.imagePath = '';
				this.Article.name = '';
				this.Article.quantity = 0;
				this.Article.tipArticle = '';
				this.Article.description = '';
				this.Article.price = 0;
				this.clickSub = false;
				this.Article.id = '';
			},

			selectItem : function(event, item) {

				this.Article.imagePath = item.imagePath;
				this.Article.name = item.name;
				this.Article.quantity = item.quantity;
				this.Article.tipArticle = item.tipArticle;
				this.Article.description = item.description;
				this.Article.price = item.price;
				this.Article.id = item.id;
				console.log(this.Article.id);
			},

			updateItem : function() {
				this.clickSub = true;


				if (this.Article.name == '' || this.Article.tipArticle == '' ||  isNaN(this.Article.price) || isNaN(this.Article.quantity) || this.Article.quantity === ''  ){
					return;
				}

				if(this.Article.imagePath == '') {
					alert("Niste upload sliku!");
					return;
				}

				console.log(this.Article.price);

				if(this.Article.price <= 0) {
					alert("Pogresna cena!");
					return;
				}

				if(this.Article.quantity < 0) {
					alert("Pogresna kolicina!");
					return;
				}

				this.Article.price = String(this.Article.price);
				this.Article.quantity = String(this.Article.quantity);


				axios
				.post("/updateArticle", this.Article, { params:{
					id : this.user.restaurant.id
				}})
				.then(response => {
					console.log(response.data);
					if (response.data === null) {
						alert("Artikl sa imenom vec postoji u restoranu!");
					} else {
						alert("Artikl izmenjen!");
						this.reset();
						this.user.restaurant = response.data;
					}
				});




			},


			addItem: function () {
				this.clickSub = true;


				if (this.Article.name == '' || this.Article.tipArticle == '' ||  isNaN(this.Article.price) || isNaN(this.Article.quantity)  ){
					return;
				}

				if(this.Article.imagePath == '') {
					alert("Niste upload sliku!");
					return;
				}

				if(this.Article.price <= 0) {
					alert("Pogresna cena!");
					return;
				}

				if(this.Article.quantity < 0) {
					alert("Pogresna kolicina!");
					return;
				}

				this.Article.price = String(this.Article.price);
				this.Article.quantity = String(this.Article.quantity);


				axios
				.post("/addArticle", this.Article, { params:{
				  id : this.user.restaurant.id
				}})
				.then(response => {
				  console.log(response.data);
				  if (response.data === null) {
				    alert("Artikl sa imenom vec postoji u restoranu!");
				  } else {
						alert("Artikl dodat!");
						this.reset();
				    this.user.restaurant = response.data;
				  }
				});



















			},

			uploadImage(event) {

        var img = event.target.files[0];

			  var formData = new FormData();
        formData.append("image", img);

        axios.post('/uploadPicture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
    			  this.Article.imagePath = response.data;
        });
      },


			approveComment: function(event, item) {

					axios
					.post("/approveComment", null, { params:{
						id : item.id
					}})
					.then(response => {
						item.status = 'APPROVED';
						alert("Komentar odobren!")

					});

				},

				declineComment: function(event, item) {

            axios
            .post("/declineComment", null, { params:{
              id : item.id
            }})
            .then(response => {
              item.status = 'DECLINED';
              alert("Komentar odbijen!")

            });

          },





    }



});
