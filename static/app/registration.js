Vue.component("registration", {

    template: `
    	<div class="container w-25 p-3">

			<form class="needs-validation" @submit="registration" method="post" novalidate>

				<div class="py-5 text-center">
        			<h2 class="h2 mb-3 text-primary">Registracija korisnika</h2>
    			</div>

				<div class="form-row">
					<div class="form-group col-md-6 mb-3">
						<label for="name" class="text-primary">Ime</label>
						<input v-bind:class="{'form-control' : true, 'is-invalid' : !validName() && Blured.nameBlured}" v-on:blur="Blured.nameBlured = true" id="name" type="text" class="form-control" v-model="User.name" value="" required/>
						<div class="invalid-feedback">
							Nepravilno uneseno ime.
						</div>
					</div>

					<div class="form-group col-md-6 mb-3">
						<label for="surname" class="text-primary">Prezime</label>
						<input v-bind:class="{'form-control' : true, 'is-invalid' : !validSurName() && Blured.surnameBlured}" v-on:blur="Blured.surnameBlured = true" id="surname" type="text" class="form-control" placeholder="" value="" v-model="User.surname" required/>
						<div class="invalid-feedback">
							Nepravilno uneseno prezime.
						</div>
					</div>

				</div>

				<div class="form-row">
					<div class="form-group col-md-6 mb-3">
						<label for="username" class="text-primary">Korisnicko ime</label>
						<input v-bind:class="{'form-control' : true, 'is-invalid' : !validUsername() && Blured.usernameBlured}" v-on:blur="Blured.usernameBlured = true" id="username" type="text" class="form-control" placeholder="" value="" v-model="User.username" required/>
						<div class="invalid-feedback">
							Duzina mora biti veca od 8 slova.
						</div>
					</div>

					<div class="form-group col-md-6 mb-3">
						<label for="password" class="text-primary">Sifra</label>
						<input v-bind:class="{'form-control' : true, 'is-invalid' : !validPassword() && Blured.passwordBlured}" v-on:blur="Blured.passwordBlured = true" id="password" type="password" class="form-control" placeholder="" value="" v-model="User.password" required/>
						<div class="invalid-feedback">
							Nepravilna lozinka.
						</div>
					</div>
	 			</div>

	 			<div class="form-row">
	 				<div class="form-group col-md-6 mb-3">
	 					<label for="grender" class="text-primary">Pol</label>
						<select v-bind:class="{'form-control' : true, 'is-invalid' : !validGrender() && Blured.genderBlured}" v-on:blur="Blured.genderBlured = true" id="grender" class="custom-select" v-model="User.gender"  required>
							<option value="">Izaberi</option>
							<option>Muski</option>
							<option>Zenski</option>
						</select>
						<div class="invalid-feedback">
								Izaberite pol!
						</div>

	 				</div>

					<div class="form-group col-md-6 mb-3" >
						<label for="checkPassword" class="text-primary">Potrvrda sifre</label>
						<input v-bind:class="{'form-control':true, 'is-invalid' : !validCheckPassword() && Blured.checkPasswordBlured}" v-on:blur="Blured.checkPasswordBlured = true" id="checkPassword" type="password"  v-model="User.checkPassword" required/>
						<div id="errorPassword" class="invalid-feedback">
							Lozinke se ne poklapaju.
						</div>
					</div>

				</div>

	 				<button class="btn btn-primary btn-lg btn-block mt-5"  type="submit">Registruj</button>

	 			</form>



		</div>



    `,
    data : function () {
		return {
			User : {
				name : "",
				surname : "",
				username : "",
				password : "",
				gender : "",
				checkPassword : ""
			},
				Blured : {
					nameBlured : false,
					surnameBlured : false,
					usernameBlured : false,
					passwordBlured : false,
					genderBlured : false,
					checkPasswordBlured : false
				}
		}
    },
    mounted() {
     axios
    .get('/validationLogin')
    .then()
    .catch(function(eror){
      if(eror.response.status == 403){
         window.location.href = "/#/validationAccess";
      }
    })

    },

    methods : {
    	registration : function (){
    		event.preventDefault();

    		if(this.User.name == ""  || this.User.surName == "" || this.User.username == "" || this.User.password =="" || this.User.gender =="" || this.User.checkPassword == "" || this.User.checkPassword != this.User.password){
    			this.Blured.nameBlured = true;
				this.Blured.surnameBlured = true;
				this.Blured.usernameBlured = true;
				this.Blured.passwordBlured = true;
				this.Blured.genderBlured = true;
				this.Blured.checkPasswordBlured = true;


    			return;
    		}

			axios.post('/registration',this.User)
        		.then( function (response) {
        			if(response.data === true){
       					alert("Registration success!");
						    window.location.href = "/#/login";
        			} else {
						alert("Username already exists!");
					}

        	});



    	},

    	validCheckPassword : function() {
    		return (this.User.password === this.User.checkPassword) ? true : false;
    	},

    	validPassword : function() {
    		return (this.User.password.length > 3) ? true : false;
    	},

    	validUsername : function() {
    		return (this.User.username.length > 3) ? true : false;
    	},

    	validName : function() {
    		return (this.User.name.length > 3) ? true : false;
    	},

    	validSurName : function() {
    		return (this.User.surname.length > 3) ? true : false;
    	},

    	validGrender : function() {
    		return (this.User.gender.length > 0) ? true : false;
    	}
    }
});
