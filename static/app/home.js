Vue.component("home", {

    template: `
    <div class="container text-primary">
    	<div class="row">
		    <div class="col-sm-4">
		    	<div class="anyUsers card p-3 m-3">
		    		<div>
			    		<h3>Trazi: </h3>
			    	</div>

			    	<div class="align-self-start mb-3" >
			    		<label for="nameInput" class="mb-1">Naziv restorana:</label>
			    		<input id="nameInput" type="text" v-model="nameInput" />
			    	</div>

			    	<div class="align-self-start mb-3">
			    		<label class="mb-1">Unesite minimalnu ocenu:</label>
			    		<input type="number" v-model="minMarkInput" />
			    	</div>
			    	<div class="align-self-start mb-3" >
                        <label for="maxMarkInput" class="mb-1">Unesite maksimalnu ocenu:</label>
			    		<input id="maxMarkInput" type="number" v-model="maxMarkInput" />
			    	</div>


                    <div class="align-self-start mb-3" >
              <label for="cityInput" class="mb-1">Unesite grad:</label>
			    		<input id="cityInput" type="text" v-model="cityInput" />
			    	</div>

                    <div class="align-self-start mb-3" >
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input v-model="italianFoodCheckBox" type="checkbox" class="custom-control-input" checked id="italianFood"/>
                            <label class="custom-control-label text-primary" for="italianFood">Italijanska hrana</label>
                        </div>
                    </div>

                    <div class="align-self-start mb-3" >
                        <div class="custom-control custom-checkbox custom-control-inline">
                        <input v-model="chineseFoodCheckBox" type="checkbox" class="custom-control-input" checked id="chineseFoodCheckBox" />
                            <label class="custom-control-label text-primary" for="chineseFoodCheckBox">Kineska hrana</label>
                        </div>
                    </div>

                    <div class="align-self-start mb-3" >
              <div class="custom-control custom-checkbox custom-control-inline">
                <input v-model="fastFoodCheckBox" type="checkbox" class="custom-control-input" checked id="fastFoodCheckBox" />
                <label class="custom-control-label text-primary" for="fastFoodCheckBox">Brza hrana</label>
              </div>
            </div>
                    <div class="align-self-start mb-3" >
              <div class="custom-control custom-checkbox custom-control-inline">
                <input v-model="sweetFoodCheckBox" type="checkbox" class="custom-control-input" checked id="sweetFoodCheckBox" />
                <label class="custom-control-label text-primary" for="sweetFoodCheckBox">Slatkisi</label>
              </div>
            </div>

			    	<button class="btn bg-primary" v-on:click="search"> Pretrazi </button>

		    	</div>
		    	<div class="card  p-3 m-3">
			    		<h3 class="">Prikazi: </h3>
              <div class=" d-flex justify-content-start">

                <div class="custom-control custom-checkbox custom-control-inline">
                  <input v-model="workCheckBox" type="checkbox" class="custom-control-input" id="work" @change="refreshRestaurants">
                  <label class="custom-control-label text-primary" for="work">Radi</label>
                </div>

                <div class="custom-control custom-checkbox custom-control-inline">
                  <input v-model="notWorkCheckBox" type="checkbox" class="custom-control-input" id="notWork" @change="refreshRestaurants">
                  <label class="custom-control-label text-primary" for="notWork">Ne radi</label>
                </div>



              </div>
              <div class=" d-flex justify-content-start mt-3">
                <select class="custom-select" v-model="sort">
                  <option value="Random" selected>Random</option>
                  <option value="Rastuce po nazivu restorana">Rastuce po nazivu restorana</option>
                  <option value="Rastuce po gradu">Rastuce po gradu</option>
                  <option value="Rastuce po prosecnoj oceni">Rastuce po prosecnoj oceni</option>
                  <option value="Opadajuce po nazivu restorana">Opadajuce po nazivu restorana</option>
                  <option value="Opadajuce po gradu">Opadajuce po gradu</option>
                  <option value="Opadajuce po prosecnoj oceni">Opadajuce po prosecnoj oceni</option>
                </select>
              </div>

		    	</div>



		    </div>

		    <div class="col-sm-8">

		    	<div class="row p-3 m-3 border rounded" v-for="res in getSearchAndFilterRestaurants()" v-if="res.deleted === false">
		   			<div class="col">
    					<img class="img-fluid border border-secondary" v-bind:src="res.logoPath" height="200" width="200">
    				</div>

    				<div class="col">
      				<p>
      					<label>Naziv: {{res.name}} </label>
      				</p>
      				<p>
      					<label>Tip: {{res.tipRestaurant}} </label>
      				</p>
      				<p>
      					<label>Lokacija: <p>{{res.location.address.street}} {{res.location.address.numberHouse}}, {{res.location.address.city}} {{res.location.address.postNumber}}</p></label>
      				</p>

       			</div>
       			<div class="col">
              <div v-if="res.avgMark == 0">
                <h5 class="font-weight-bold mb-3"> Nema ocena!</h5>
              </div>
              <div v-else>
                <h5 class="font-weight-bold mb-3"> Ocena: {{res.avgMark}}</h5>
              </div>
              <div>
                <p>
                  <label>Status: {{res.statusOfRestaurant}}</label>
                </p>
              <div>
                <div>
                  <a :href="'#/restaurant/' + res.id">
                    <button class="btn bg-primary text-white w-75 mt-3"> Prikazi </button>
                  </a>

                  <button v-if="mode === 'ADMINISTRATOR'" class="btn bg-danger text-white w-75 mt-3" v-on:click="deleteRestaurant($event, res)"> Obrisi </button>

                </div>
              </div>

            </div>

       	        </div>
    	        </div>
	        </div>
  		</div>


    </div>`,

    data: function () {
        return {
            restaurants: [],
            mode: 'NO_MODE',
            nameInput: '',
            minMarkInput: 0,
            maxMarkInput: 5,
            cityInput: '',
            italianFoodCheckBox: true,
            chineseFoodCheckBox: true,
            fastFoodCheckBox: true,
            sweetFoodCheckBox: true,
            filteredRestaurants: [],
            searchRestaurants: [],
            workCheckBox : true,
            notWorkCheckBox : true,
            sort: "Random"

        }
    },
    beforeMount() {
        axios
            .get('/session')
            .then(response => (this.mode = response.data.typeOfUser));
    },
    mounted() {
        axios.get('/allRestaurants')
            .then(response => {
                console.log(response);
                this.searchRestaurants = response.data;
                this.restaurants = response.data;
                this.filteredRestaurants = this.restaurants;
            });
    },
    methods: {

      refreshRestaurants: function () {
          this.filteredRestaurants = [];
      		for(var r of this.restaurants) {

      			if(r.statusOfRestaurant === "WORK" && this.workCheckBox === true) {
      				this.filteredRestaurants.push(r);
      			}

      			if(r.statusOfRestaurant === "NO_WORK" && this.notWorkCheckBox === true) {
      				this.filteredRestaurants.push(r);
      			}
          }
        },
        search: function () {

          if ((isNaN(this.minMarkInput)) || (isNaN(this.maxMarkInput))) {
            alert("Unesite brojeve za najvecu i najmanju ocenu!");
            return;
          }

          this.searchRestaurants = [];
      		var city = this.cityInput.toLowerCase().trim();
          var name = this.nameInput.toLowerCase().trim();


      		if(city.length == 0 && name.length == 0 && this.minMarkInput <= 0 && this.minMarkInput >= 5 &&
            italianFoodCheckBox === true &&
            chineseFoodCheckBox === true &&
            fastFoodCheckBox === true &&
            sweetFoodCheckBox === true) {
      			this.searchUser = this.users;
      			return;
      		}

          for(var rest of this.restaurants) {
            if (city.length != 0) {
              if(rest.location.address.city.toLowerCase().indexOf(city) === -1) {
                continue;
              }
            }
            if (name.length != 0) {
              if(rest.name.toLowerCase().indexOf(name) === -1) {
                continue;
              }
            }


            if(rest.avgMark < this.minMarkInput || rest.avgMark > this.maxMarkInput) {
              continue;
            }

            console.log(this.italianFoodCheckBox);

            if(rest.tipRestaurant === "ITALIAN_FOOD" && this.italianFoodCheckBox === true) {
      				this.searchRestaurants.push(rest);
      			}

            if(rest.tipRestaurant === "CHINESE_FOOD" && this.chineseFoodCheckBox === true) {
      				this.searchRestaurants.push(rest);
      			}

            if(rest.tipRestaurant === "FAST_FOOD" && this.fastFoodCheckBox === true) {
      				this.searchRestaurants.push(rest);
      			}

            if(rest.tipRestaurant === "SWEET_FOOD" && this.sweetFoodCheckBox === true) {
      				this.searchRestaurants.push(rest);
      			}

          }

        },
        getSearchAndFilterRestaurants : function(){
      		if(this.searchRestaurants.length === 0 || this.filteredRestaurants.length === 0) return [];

      		var searchAndFilteredRestaurants = [];

      		for(var f of this.filteredRestaurants) {
      			for(var s of this.searchRestaurants) {
      				if(f.id === s.id) {
      					searchAndFilteredRestaurants.push(f);
      				}
      			}
      		}


          if (this.sort === "Rastuce po nazivu restorana") {

              searchAndFilteredRestaurants.sort((a, b) => {
                let fa = a.name;
                let fb = b.name;
                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              });

            } else if (this.sort === "Rastuce po gradu") {
              searchAndFilteredRestaurants.sort((a, b) => {
                let fa = a.location.address.city;
                let fb = b.location.address.city;
                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              });
            } else if (this.sort === "Rastuce po prosecnoj oceni") {
              searchAndFilteredRestaurants.sort((a, b) => {
                let fa = a.avgMark;
                let fb = b.avgMark;
                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              });
            } else if (this.sort === "Opadajuce po nazivu restorana") {
              searchAndFilteredRestaurants.sort((a, b) => {
                let fa = a.name;
                let fb = b.name;
                if (fa > fb) {
                  return -1;
                }
                if (fa < fb) {
                  return 1;
                }
                return 0;
              });

            } else if (this.sort === "Opadajuce po gradu") {
              searchAndFilteredRestaurants.sort((a, b) => {
                let fa = a.location.address.city;
                let fb = b.location.address.city;
                if (fa > fb) {
                  return -1;
                }
                if (fa < fb) {
                  return 1;
                }
                return 0;
              });
            } else if (this.sort === "Opadajuce po prosecnoj oceni") {
              searchAndFilteredRestaurants.sort((a, b) => {
                let fa = a.avgMark;
                let fb = b.avgMark;
                if (fa > fb) {
                  return -1;
                }
                if (fa < fb) {
                  return 1;
                }
                return 0;
              });
            }

          searchAndFilteredRestaurants.sort((a, b) => {
            let fa = a.statusOfRestaurant;
            let fb = b.statusOfRestaurant;
            if (fa > fb) {
              return -1;
            }
            if (fa < fb) {
              return 1;
            }
            return 0;
          });


      		return searchAndFilteredRestaurants;
      	},
        deleteRestaurant: function(event, item) {
          axios
          .post("/deleteRestaurant", null, { params:{
            id : item.id
          }})
          .then(response => {
            item.deleted = true;

            alert("Restoran obrisan!")
          });


        }





    }


});
