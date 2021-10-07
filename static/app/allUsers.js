Vue.component("all-users", {

    template:`

    <div class="container mt-5">

    	<div v-if="mode === 'ADMINISTRATOR'">

	    	<div class="row">

	    		<div class="col-lg-3 mt-2 mb-3">
	    			<h1 class="text-primary d-flex justify-content-center"> Korisnici: </h1>

	    		</div>

	    		<div class="col-lg-4 mt-4 d-flex justify-content-center">

	    			<div class="custom-control custom-checkbox custom-control-inline">
  					  <input v-model="administratorsCheckBox" type="checkbox" class="custom-control-input" checked id="administrators" @change="refreshUsers">
  					  <label class="custom-control-label text-primary" for="administrators">Administratori</label>
  					</div>

  					<div class="custom-control custom-checkbox custom-control-inline">
  					  <input v-model="customersCheckBox" type="checkbox" class="custom-control-input" checked id="customers" @change="refreshUsers">
  					  <label class="custom-control-label text-primary" for="customers">Kupci</label>
  					</div>


  					<div class="custom-control custom-checkbox custom-control-inline">
  					  <input v-model="deliverersCheckBox" type="checkbox" class="custom-control-input" checked id="deliverers" @change="refreshUsers">
  					  <label class="custom-control-label text-primary" for="deliverers">Dostavljaci</label>
  					</div>

  					<div class="custom-control custom-checkbox custom-control-inline">
  					  <input v-model="managersCheckBox" type="checkbox" class="custom-control-input" checked id="managers" @change="refreshUsers">
  					  <label class="custom-control-label text-primary" for="managers">Menadzeri</label>
  					</div>
	    		</div>

          <div class="col-4 mt-3 ml-3 d-flex justify-content-center">
            <select class="custom-select" v-model="sort" @change="sortUsers">
              <option value="Random" selected>Random</option>
              <option value="Rastuce po imenu">Rastuce po imenu</option>
              <option value="Rastuce po prezimenu">Rastuce po prezimenu</option>
              <option value="Rastuce po korisnickom imenu">Rastuce po korisnickom imenu</option>
              <option value="Rastuce po bodovima">Rastuce po bodovima</option>
              <option value="Opadajuce po imenu">Opadajuce po imenu</option>
              <option value="Opadajuce po prezimenu">Opadajuce po prezimenu</option>
              <option value="Opadajuce po korisnickom imenu">Opadajuce po korisnickom imenu</option>
              <option value="Opadajuce po bodovima">Opadajuce po bodovima</option>
            </select>

	    		</div>
	    	</div>

        <div class="row ">

            <form class="form-inline mt-2 w-100 ">
              <div class="col-3">
                <label class="text-primary" for="name">Ime: </label>
                <input id="name" v-model="nameInput" class="form-control ml-2" type="text">
              </div>

              <div class="col-3 ">
                <label class="text-primary d-flex justify-content-center" for="surname">Prezime: </label>
                <input id="surname" v-model="surnameInput" class="form-control ml-2" type="text">
              </div>

              <div class="col-3">
                <label class="text-primary" for="username">Korisnicko ime: </label>
                <input id="username" v-model="usernameInput" class="form-control ml-2" type="text">
              </div>

              <div class="col-3 d-flex justify-content-center">
                <label class="text-primary" for="username"></label>
                <button class="form-control ml-2 mt-3 btn btn-success" type="button" v-on:click="search">Pretrazi</button>
                <button class="form-control ml-2 mt-3 btn btn-warning" type="button" v-on:click="reset">Restartuj</button>

              </div>

            </form>
        </div>


	    	<div class="row mt-4"  >
	      		<div class="col-4 " v-for="row in getSearchAndFilterUsers()" v-if="row.deleted === false">
              <div class="m-3 border border-success rounded" >
        	      <h3 class="d-flex justify-content-center text-primary mt-3">{{row.name}}&nbsp;{{row.surname }}</h3>
        	      <p class="d-flex justify-content-center text-primary"> Korisnicko ime: {{row.username}} </p>
                <p class="d-flex justify-content-center text-primary"> Uloga: {{row.typeOfUser}} </p>
                <p v-if="row.typeOfUser === 'CUSTOMER'" class="d-flex justify-content-center text-primary"> Bodovi: {{row.points}} </p>
                <button v-if="row.typeOfUser !== 'ADMINISTRATOR'" class="btn btn-success w-100" type="button" v-on:click="deleteUser($event, row)">Delete</button>


              </div>
	      		</div>
	    	</div>
	    </div>
    </div>`

    ,
    data : function(){
    	return {
    		mode : 'NO_LOGIN',
    		users : [],
    		filteredUsers : [],
    		searchUser : [],
    		administratorsCheckBox : true,
    		managersCheckBox : true,
    		customersCheckBox : true,
			  deliverersCheckBox : true,
        nameInput: "",
        surnameInput: "",
        usernameInput: "",
        sort: "Random"
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
		})
	},

    mounted() {
    	axios
          .get('/session')
          .then(response => {
          	this.mode = response.data.typeOfUser
          	axios
    	  	  .get('/allUsers')
          	  .then(response => {
          	  	this.users = response.data;
         				this.filteredUsers = response.data;
         				this.searchUser = response.data;

          	  });
          });
    },

    methods : {
      sortUsers : function() {
        console.log(this.sort);

      },
    	refreshUsers : function() {

    		this.filteredUsers = [];
    		for(var user of this.users) {

    			if(user.typeOfUser === "ADMINISTRATOR" && this.administratorsCheckBox === true) {
    				this.filteredUsers.push(user);
    			}

    			if(user.typeOfUser === "MANAGER" && this.managersCheckBox === true) {
    				this.filteredUsers.push(user);
    			}

    			if(user.typeOfUser === "CUSTOMER" && this.customersCheckBox === true) {
    				this.filteredUsers.push(user);
    			}

				if(user.typeOfUser === "DELIVERER" && this.deliverersCheckBox === true) {
    				this.filteredUsers.push(user);
    			}
    		}
    	},
    	search : function(event) {
    		this.searchUser = [];
    		var username = this.usernameInput.toLowerCase().trim();
        var name = this.nameInput.toLowerCase().trim();
        var surname = this.surnameInput.toLowerCase().trim();

    		if(username.length == 0 && name.length == 0 && surname.length == 0) {
    			this.searchUser = this.users;
    			return;
    		}

        for(var user of this.users) {
          if (username.length != 0) {
            if(user.username.toLowerCase().indexOf(username) === -1) {
              continue;
            }
          }
          if (surname.length != 0) {
            if(user.surname.toLowerCase().indexOf(surname) === -1) {
              continue;
            }
          }

          if (name.length != 0) {
            if(user.name.toLowerCase().indexOf(name) === -1) {
              continue;
            }
          }
          this.searchUser.push(user);
        }

    	},
    	getSearchAndFilterUsers : function(){
    		if(this.searchUser.length === 0 || this.filteredUsers.length === 0) return [];

    		var searchAndFilteredUsers = [];

    		for(var fUser of this.filteredUsers) {
    			for(var sUser of this.searchUser) {
    				if(fUser.username === sUser.username) {
    					searchAndFilteredUsers.push(fUser);
    				}
    			}
    		}


        if (this.sort === "Random") {
          return searchAndFilteredUsers;
        } else if (this.sort === "Rastuce po imenu") {

          searchAndFilteredUsers.sort((a, b) => {
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

        } else if (this.sort === "Rastuce po prezimenu") {
          searchAndFilteredUsers.sort((a, b) => {
            let fa = a.surname;
            let fb = b.surname;
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
        } else if (this.sort === "Rastuce po korisnickom imenu") {
          searchAndFilteredUsers.sort((a, b) => {
            let fa = a.username;
            let fb = b.username;
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
        } else if (this.sort === "Rastuce po bodovima") {
          searchAndFilteredUsers.sort((a, b) => {

            if (a.typeOfUser !== 'CUSTOMER' && b.typeOfUser === 'CUSTOMER'){
              return -1;
            }

            if (a.typeOfUser === 'CUSTOMER' && b.typeOfUser !== 'CUSTOMER'){
              return 1;
            }

            if (a.typeOfUser !== 'CUSTOMER' && b.typeOfUser !== 'CUSTOMER'){
              return 0;
            }

            let fa = a.points;
            let fb = b.points;
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
        } else if (this.sort === "Opadajuce po imenu") {
          searchAndFilteredUsers.sort((a, b) => {
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

        } else if (this.sort === "Opadajuce po prezimenu") {
          searchAndFilteredUsers.sort((a, b) => {
            let fa = a.surname;
            let fb = b.surname;
            if (fa > fb) {
              return -1;
            }
            if (fa < fb) {
              return 1;
            }
            return 0;
          });
        } else if (this.sort === "Opadajuce po korisnickom imenu") {
          searchAndFilteredUsers.sort((a, b) => {
            let fa = a.username;
            let fb = b.username;
            if (fa > fb) {
              return -1;
            }
            if (fa < fb) {
              return 1;
            }
            return 0;
          });
        } else if (this.sort === "Opadajuce po bodovima") {
          searchAndFilteredUsers.sort((a, b) => {
            if (a.typeOfUser !== 'CUSTOMER' && b.typeOfUser === 'CUSTOMER'){
              return 1;
            }

            if (a.typeOfUser === 'CUSTOMER' && b.typeOfUser !== 'CUSTOMER'){
              return -1;
            }

            if (a.typeOfUser !== 'CUSTOMER' && b.typeOfUser !== 'CUSTOMER'){
              return 0;
            }

            let fa = a.points;
            let fb = b.points;
            if (fa > fb) {
              return -1;
            }
            if (fa < fb) {
              return 1;
            }
            return 0;
          });
        }

    		return searchAndFilteredUsers;
    	},
      reset: function() {
        this.administratorsCheckBox = true;
    		this.managersCheckBox = true;
    		this.customersCheckBox = true;
			  this.deliverersCheckBox = true;
        this.nameInput = "";
        this.surnameInput = "";
        this.usernameInput = "";
        this.sort = "Random";
        this.refreshUsers();
        this.search();
      },
      deleteUser: function(event, user) {
        axios
        .post("/deleteUser", null, { params:{
          id : user.id
        }})
        .then(response => {
          user.deleted = true;

          alert("Korisnik obrisan!")
        });


      }
    }

});
