
Vue.component("create-restaurant", {

  template:`

    <div  class="container w-50 p-3 border">
    	<form class="needs-validation" @submit="createRestaurant" method="post" novalidate>

    			<div class="py-5 text-center">
        			<h2 class="h2 mb-3 text-primary">Dodavanje restorana</h2>
    			</div>

    			<div class="form-row">
  	 				<div class="form-group col-md-6 mb-3">
  	 					<label for="typeOfRestaurant" class="text-primary">Tip restorana</label>
  						<select id="typeOfRestaurant" class="custom-select"
  						      v-bind:class="{'form-control' : true, 'is-invalid' : !validTypeOfRestaurant() && Blured.typeOfRestaurantBlured}"
  						      v-on:blur="Blured.typeOfRestaurantBlured = true"
                    v-model="Restaurant.typeOfRestaurant" required>
  							<option value="">Izaberi</option>
  							<option>Italijanski restoran</option>
                <option>Kineski restoran</option>
                <option>Brza hrana</option>
                <option>Slatkisi</option>
  						</select>
  						<div class="invalid-feedback">
  								Izaberite tip restorana!
  						</div>

	 				  </div>

  					<div class="form-group col-md-6 mb-3" >
  						<label for="name" class="text-primary">Naziv:</label>
  						<input class="form-control"
  						  v-bind:class="{'form-control' : true, 'is-invalid' : !validName() && Blured.nameBlured}"
  						  v-on:blur="Blured.nameBlured = true"
                id="name" type="text" v-model="Restaurant.name" required/>
    						<div class="invalid-feedback">
    							Morate uneti naziv restorana!
    						</div>
  					</div>
				</div>


				<div class="form-row">

					<div class="form-group col-md-3 mb-3" >
						<label for="city" class="text-primary">Grad</label>
						<input class="form-control"

						v-bind:class="{'form-control' : true, 'is-invalid' : !validCity() && Blured.cityBlured}"
						v-on:blur="Blured.cityBlured = true"

						v-model="Restaurant.city"
						id="city" type="text" required/>
						<div id="errorCity" class="invalid-feedback">
							Morate uneti grad!
						</div>
					</div>

					<div class="form-group col-md-3 mb-3" >
						<label for="street" class="text-primary">Ulica</label>
						<input class="form-control" id="street" type="text"
  						v-bind:class="{'form-control' : true, 'is-invalid' : !validStreet() && Blured.streetBlured}"
  						v-on:blur="Blured.streetBlured = true"
  						v-model="Restaurant.street" required/>
						<div id="errorStreet" class="invalid-feedback">
							Morate uneti ime ulice!
						</div>
					</div>

					<div class="form-group col-md-3 mb-3" >
						<label for="numberOfstreet" class="text-primary">Broj ulice</label>
						<input class="form-control" id="numberOfstreet" type="number"

						v-bind:class="{'form-control' : true, 'is-invalid' : !validNumberHouse() && Blured.numberHouseBlured}"
						v-on:blur="Blured.numberHouseBlured = true"

						v-model="Restaurant.numberHouse" required/>
						<div id="errorPassword" class="invalid-feedback">
							Morate uneti validan broj ulice!
						</div>
					</div>
					<div class="form-group col-md-3 mb-3" >
						<label for="postNumber" class="text-primary">Postanski broj</label>
						<input class="form-control" id="postNumber" type="number"
  						v-bind:class="{'form-control' : true, 'is-invalid' : !validPostNumber() && Blured.postNumberBlured}"
  						v-on:blur="Blured.postNumberBlured = true"
  						v-model="Restaurant.postNumber"
  						required/>
						<div id="errorPassword" class="invalid-feedback">
							Morate uneti validan postnaski broj!
						</div>
					</div>
				</div>
				<div class="form-row text-primary">
          <div class="col-12">
            <label for="manager" class="text-primary">Menadzer:</label>
            <select id="manager" class="custom-select"
                  v-bind:class="{'form-control' : true, 'is-invalid' : !validManager() && Blured.managerBlured}"
                  v-on:blur="Blured.managerBlured = true"
                  v-model="Restaurant.manager" required>
              <option value="">Izaberi</option>
              <option v-for="m in managers" :value="m.id">{{m.name + " " + m.surname}}</option>
            </select>
            <div class="invalid-feedback">
                Izaberite menadzera!
            </div>
          </div>
				</div>

        <div class="form-row text-primary mt-4">
					<div class="form-group col-md-6 mb-3" >
						<h4>Logo </h4>
					</div>
				</div>
				<div class="form-row text-primary">
					<div class="form-group  col-md-4 mb-3" v-if="Restaurant.logoPath !== null" >
    					<div >
    					  <img class="preview" :src="Restaurant.logoPath" height="200" width="200">
    					</div>
					</div>

            <div class="btn  btn-sm  w-25">
              <input type="file" @change="uploadImage" name="image" id="image" accept="image/*"
              />
            </div>
        </div>
				<div>
				    <button	class="btn btn-primary btn-lg btn-block mt-5"  type="submit">Dodaj</button>
				</div>
    	</form>
    </div>`,
    data : function (){
      return {
        managers: [],
        Restaurant : {
          typeOfRestaurant : "",
          name : "",
          city : "",
          street : "",
          numberHouse : "",
          postNumber : "",
          manager : "",
          logoPath : null
        },

        Blured : {
          typeOfRestaurantBlured : false,
          nameBlured : false,
          cityBlured : false,
          streetBlured : false,
          numberHouseBlured : false,
          postNumberBlured : false,
          managerBlured : false,
        }
      }
    },

    beforeMount(){
      axios
      .get('/validationAccesAdmin')
      .then()
      .catch(function(eror){
        if(eror.response.status == 403){
          window.location.href = "/#/validationAccess";
        }
      });

    },
    mounted() {
      axios
      .get('/getFreeManagers')
      .then(response => {
        this.managers = response.data;
      })
      .catch(error => {
        console.log(error);
      })
    },
    methods : {

      createRestaurant : function(){
        event.preventDefault();

        if(this.Restaurant.typeOfRestaurant == ""  || this.Restaurant.name == ""
        || this.Restaurant.city == ""  || this.Restaurant.street == "" || this.Restaurant.numberHouse == ""
        || this.Restaurant.postNumber == "" || this.Restaurant.manager == "" ){

          this.Blured.typeOfRestaurantBlured = true;
          this.Blured.nameBlured = true;
          this.Blured.cityBlured = true;
          this.Blured.streetBlured = true;
          this.Blured.numberHouseBlured = true;
          this.Blured.postNumberBlured = true;
          this.Blured.managerBlured = true;

          return;
        }

        if (this.Restaurant.logoPath === null) {
          alert("Izaberite logo!");
          return;
        }

        axios
        .post('/createRestaurant',this.Restaurant)
        .then(response => {
          console.log(response);
          alert("Restoran sacuvan!");
          window.location.href = "/#/";
        })
        .catch(function(error){
          if(error.response.status == 400){
            alert("Greska!");
          }
        });

      },
      validTypeOfRestaurant : function() {
        return (this.Restaurant.typeOfRestaurant.length > 0) ? true : false;
      },
      validName : function() {
        return (this.Restaurant.name.length > 0) ? true : false;
      },
      validCity : function() {
        return (this.Restaurant.city.length > 1 ) ? true : false;
      },
      validStreet : function() {
        return (this.Restaurant.street.length > 2 ) ? true : false;
      },
      validNumberHouse : function() {
        return (this.Restaurant.numberHouse > 0 && this.Restaurant.numberHouse <= 300 ) ? true : false;
      },
      validPostNumber: function() {
        return (this.Restaurant.postNumber >= 11000 ) ? true : false;
      },
      validManager: function() {
        return (this.Restaurant.manager.length > 0) ? true : false;
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
    			  this.Restaurant.logoPath = response.data;
        });



      },

    }
  });
