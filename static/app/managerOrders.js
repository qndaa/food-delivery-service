Vue.component("manager-orders", {

    template: `
    <div class="container text-primary">
    	<div class="row">
		    <div class="col-sm-4">
		    	<div class="anyUsers card p-3 m-3">
		    		<div>
			    		<h3>Trazi: </h3>
			    	</div>
            <div class="align-self-start mb-3">
			    		<label class="mb-1">Unesite minimalnu cenu:</label>
			    		<input type="number" v-model="minPriceInput" />
			    	</div>
			    	<div class="align-self-start mb-3" >
              <label for="maxPriceInput" class="mb-1">Unesite maksimalnu cenu:</label>
			    		<input id="maxPriceInput" type="number" v-model="maxPriceInput" />
			    	</div>

            <div class="align-self-start mb-3">
			    		<label class="mb-1">Unesite pocetni datum:</label>
			    		<input type="date" v-model="startDateInput" />
			    	</div>
			    	<div class="align-self-start mb-3" >
              <label for="endDateInput" class="mb-1">Unesite krajnji datum:</label>
			    		<input id="endDateInput" type="date" v-model="endDateInput" />
			    	</div>

			    	<button class="btn bg-primary" v-on:click="search"> Pretrazi </button>
            <button class="btn bg-warning mt-2" v-on:click="reset"> Reset </button>
		    	</div>

          <div class="card  p-3 m-3">
			    		<h3 class="">Prikazi: </h3>
              <div>
                <div class="align-self-start mb-3" >
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input v-model="processingCheckBox" type="checkbox" class="custom-control-input" checked id="processing" @change="refreshOrders"/>
                        <label class="custom-control-label text-primary" for="processing">Obrada</label>
                    </div>
                </div>
                <div class="align-self-start mb-3" >
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input v-model="preparationCheckBox" type="checkbox" class="custom-control-input" checked id="preparation" @change="refreshOrders"/>
                        <label class="custom-control-label text-primary" for="preparation">Priprema</label>
                    </div>
                </div>
                <div class="align-self-start mb-3" >
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input v-model="waitDelivererCheckBox" type="checkbox" class="custom-control-input" checked id="waitDeliverer" @change="refreshOrders"/>
                        <label class="custom-control-label text-primary" for="waitDeliverer">Ceka dostavljaca</label>
                    </div>
                </div>
                <div class="align-self-start mb-3" >
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input v-model="requestCheckBox" type="checkbox" class="custom-control-input" checked id="request" @change="refreshOrders"/>
                        <label class="custom-control-label text-primary" for="request">Zahtjev</label>
                    </div>
                </div>
                <div class="align-self-start mb-3" >
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input v-model="transportCheckBox" type="checkbox" class="custom-control-input" checked id="transport" @change="refreshOrders"/>
                        <label class="custom-control-label text-primary" for="transport">Transport</label>
                    </div>
                </div>
                <div class="align-self-start mb-3" >
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input v-model="deliveredCheckBox" type="checkbox" class="custom-control-input" checked id="delivered" @change="refreshOrders"/>
                        <label class="custom-control-label text-primary" for="delivered">Dostavljeno</label>
                    </div>
                </div>
                <div class="align-self-start mb-3" >
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input v-model="canceledCheckBox" type="checkbox" class="custom-control-input" checked id="canceled" @change="refreshOrders"/>
                        <label class="custom-control-label text-primary" for="canceled">Otkazano</label>
                    </div>
                </div>

              </div>
              <div class=" d-flex justify-content-start mt-3">
                <select class="custom-select" v-model="sort">
                  <option value="Random" selected>Random</option>
                  <option value="Rastuce po ceni">Rastuce po ceni</option>
                  <option value="Rastuce po datumu">Rastuce po datumu</option>
                  <option value="Opadajuce po ceni">Opadajuce po ceni</option>
                  <option value="Opadajuce po datumu">Opadajuce po datumu</option>
                </select>
              </div>

		    	</div>
		    </div>



        <div class="d-flex justify-content-center mt-3" v-if="this.orders.length === 0">
          <h3>Nema porudzbina! </h3>
        </div>


        <div v-else class="col-sm-8" >
          <div v-for="ord in getSearchAndFilterOrders()">
            <h3 class="mt-5 md-3">Porudzbina id: {{ord.id}} </h3>
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
                <tr v-for="item in ord.items">
                  <td>
                    <img v-bind:src="item.article.imagePath"  alt="Logo" width="120" height="120"> </img>

                  </td>
                  <td>{{item.article.name}}</td>
                  <td>{{item.quantity}}</td>
                  <th scope="row">{{item.quantity}}x{{item.article.price}}={{item.quantity*item.article.price}}</th>
                </tr>

                <tr >
                  <th scope="row">Cena:</th>
                  <td></td>
                  <th scope="row">{{ord.price}}</th>
                    <td >

                  </td>
                </tr>


                <tr >
                  <th scope="row">Popust:</th>
                  <td></td>
                  <th scope="row">{{ord.discout}}</th>
                    <td >

                  </td>
                </tr>

                <tr >
                  <th scope="row">Nova cena:</th>
                  <td></td>
                  <th scope="row">{{ord.price - ord.discout}}</th>
                    <td >

                  </td>
                </tr>

                <tr >
                  <th scope="row">Datum:</th>
                  <td></td>
                  <th scope="row">{{ord.date}}</th>
                    <td >

                  </td>
                </tr>

                <tr v-if="ord.customer !== undefined">
    							<th scope="row">Kupac:</th>
    							<td></td>
    							<th scope="row">{{ord.customer.name + ' ' + ord.customer.surname}}</th>
    							<td >

                  </td>
    						</tr>

                <tr v-if="ord.delivererId != null">
    							<th scope="row">Dostavljac:</th>
    							<td></td>
    							<th scope="row">{{ord.deliverer.name + ' ' + ord.deliverer.surname}}</th>
    							<td >

                  </td>
    						</tr>

                <tr>
    							<th scope="row">Status:</th>
    							<td></td>
    							<th scope="row">{{ord.statusOfOrder}}</th>
    							<td class="row">
                    <button v-if="ord.statusOfOrder === 'PROCESSING' && user.typeOfUser === 'MANAGER'" class="btn btn-success" v-on:click="preparationOrder($event, ord)"> U pripremi  </button>
                    <button v-if="ord.statusOfOrder === 'PREPARATION' && user.typeOfUser === 'MANAGER'" class="btn btn-success" v-on:click="waitDeliverer($event, ord)"> Ceka dobavljaca  </button>

                    <div class="row" v-if="ord.statusOfOrder === 'REQUEST' && user.typeOfUser === 'MANAGER'">
                      <button  class="btn btn-success" v-on:click="approve($event, ord)"> Odobri  </button>
                      <button class="btn btn-danger" v-on:click="decline($event, ord)"> Odbij  </button>
                    </div>

                  </td>
    						</tr>




              </tbody>
            </table>

          </div>

         </div>

  	  </div>


    </div>`,

    data: function () {
        return {
            orders: [],
            user: null,
            minPriceInput: 0,
            maxPriceInput: 9999999,
            cityInput: '',
            filteredOrders: [],
            searchOrders: [],
            workCheckBox : true,
            notWorkCheckBox : true,
            sort: "Random",
            processingCheckBox: true,
            waitDelivererCheckBox: true,
            requestCheckBox: true,
            transportCheckBox: true,
            preparationCheckBox: true,
            deliveredCheckBox: true,
            canceledCheckBox: true,

            startDateInput: '',
            endDateInput: '',
        }
    },
    async beforeCreate  () {
      await axios
          .get('/session')
          .then(response => {
            this.user = response.data;
            console.log(this.user);
          });

          if(this.user.restaurantId !== undefined) {
            axios.get("/managerOrders", {
              params: {
                  id: this.user.restaurantId
              }
            })
            .then(response => {
              this.searchOrders = response.data;
              this.orders = response.data;
              this.filteredOrders = this.orders;
            });

          }


    },
    methods: {


      preparationOrder: function (event, item) {
        axios
        .post("/setPreparation", null, { params:{
          id : item.id
        }})
        .then(response => {
          item.statusOfOrder = 'PREPARATION';

          alert("Status porudzbine promenjen!")
        });


      },
      waitDeliverer: function (event, item) {
        axios
        .post("/setWaitDeliverer", null, { params:{
          id : item.id
        }})
        .then(response => {
          item.statusOfOrder = 'WAIT_DELIVERER';

          alert("Status porudzbine promenjen!")
        });



      },

      approve: function (event, item) {
        axios
        .post("/setTransport", null, { params:{
          id : item.id
        }})
        .then(response => {
          item.statusOfOrder = 'TRANSPORT';

          alert("Status porudzbine promenjen!")
        });



      },

      decline: function (event, item) {
        axios
        .post("/cancelRequest", null, { params:{
          id : item.id
        }})
        .then(response => {
          item.statusOfOrder = 'WAIT_DELIVERER';

          alert("Status porudzbine promenjen!")
        });



      },
      refreshOrders: function () {
          this.filteredOrders = [];


      		for(var order of this.orders) {

      			if(order.statusOfOrder === "PROCESSING" && this.processingCheckBox === true) {
      				this.filteredOrders.push(order);
      			}
            if(order.statusOfOrder === "PREPARATION" && this.preparationCheckBox === true) {
      				this.filteredOrders.push(order);
      			}

            if(order.statusOfOrder === "WAIT_DELIVERER" && this.waitDelivererCheckBox === true) {
      				this.filteredOrders.push(order);
      			}

            if(order.statusOfOrder === "REQUEST" && this.requestCheckBox === true) {
      				this.filteredOrders.push(order);
      			}
            if(order.statusOfOrder === "TRANSPORT" && this.transportCheckBox === true) {
      				this.filteredOrders.push(order);
      			}
            if(order.statusOfOrder === "DELIVERED" && this.deliveredCheckBox === true) {
      				this.filteredOrders.push(order);
      			}
            if(order.statusOfOrder === "CANCELED" && this.canceledCheckBox === true) {
      				this.filteredOrders.push(order);
      			}
          }




        },



        search: function () {


          if ((isNaN(this.minPriceInput)) || (isNaN(this.maxPriceInput))) {
            alert("Unesite brojeve za najvecu i najmanju ocenu!");
            return;
          }

          if((this.startDateInput !== '' && this.endDateInput === '') || (this.startDateInput === '' && this.endDateInput !== '')){
            alert("Unesite ispravne datume!");
            return;
          }

          this.searchOrders = [];

          if (this.minPriceInput === 0 && this.maxPriceInput === 9999999 && this.startDateInput === '' && this.endDateInput === '') {
            this.searchOrders = this.orders;
            return;
          }




          for(var order of this.orders) {

            if (order.price < this.minPriceInput || order.price > this.maxPriceInput) {
              continue;
            }


            if (this.startDateInput === '' && this.endDateInput === ''){
              this.searchOrders.push(order);
              continue;
            }

            if (order.date > this.startDateInput && order.date < this.endDateInput) {
              this.searchOrders.push(order);;
            }


          }

        },
        getSearchAndFilterOrders : function(){
      		if(this.searchOrders.length === 0 || this.filteredOrders.length === 0) return [];

      		var searchAndFilteredOrders = [];

      		for(var f of this.filteredOrders) {
      			for(var s of this.searchOrders) {
      				if(f.id === s.id) {
      					searchAndFilteredOrders.push(f);
      				}
      			}
      		}


            if (this.sort === "Rastuce po ceni") {
              searchAndFilteredOrders.sort((a, b) => {
                let fa = a.price;
                let fb = b.price;
                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              });
            } else if (this.sort === "Rastuce po datumu") {
              searchAndFilteredOrders.sort((a, b) => {
                let fa = a.date;
                let fb = b.date;
                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              });
            }  else if (this.sort === "Opadajuce po datumu") {
              searchAndFilteredOrders.sort((a, b) => {
                let fa = a.date;
                let fb = b.date;
                if (fa > fb) {
                  return -1;
                }
                if (fa < fb) {
                  return 1;
                }
                return 0;
              });
            } else if (this.sort === "Opadajuce po ceni") {
              searchAndFilteredOrders.sort((a, b) => {
                let fa = a.price;
                let fb = b.price;
                if (fa > fb) {
                  return -1;
                }
                if (fa < fb) {
                  return 1;
                }
                return 0;
              });
            }


      		return searchAndFilteredOrders;
      	},
        reset: function() {
          this.nameInput = '';
          this.startDateInput = '';
          this.endDateInput = '';
          this.minPriceInput = 0;
          this.maxPriceInput = 9999999;

          this.searchOrders = this.orders;

        }



    }


});
