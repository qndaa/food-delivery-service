Vue.component("profile", {

    template:`
		<div class="container">


				<!-- Nalov -->
				<div class="py-4 text-center">
					<h1 class="text-primary">Profil korisnika</h1>
				</div>


				<div class="row mt-5 text-center d-flex justify-content-center text-primary">
					<div class="col-lg-3">
						<label class="w-50 font-weight-bold" >Korisniko ime:</label>
					</div>
					<div class="col-lg-3">
						<p class="w-50 font-weight-bold"> {{user.username}}</p>
					</div>
				</div>

        <div class="row mt-1 text-center d-flex justify-content-center text-primary" v-if="user.typeOfUser === 'CUSTOMER'">
					<div class="col-lg-3">
						<label class="w-50 font-weight-bold" >Poeni:</label>
					</div>
					<div class="col-lg-3">
						<p class="w-50 font-weight-bold"> {{user.points}}</p>
					</div>
				</div>


                <div class="row mt-1 text-center d-flex justify-content-center text-primary" v-if="user.typeOfUser === 'CUSTOMER'">
        					<div class="col-lg-3">
        						<label class="w-50 font-weight-bold" >Kategorija:</label>
        					</div>
        					<div class="col-lg-3">
        						<p class="w-50 font-weight-bold"> {{user.typeOfCustomer}}</p>
        					</div>
        				</div>
                <div class="row mt-1 text-center d-flex justify-content-center text-primary" v-if="user.typeOfUser === 'CUSTOMER'">
                  <div class="col-lg-3">
                    <label class="w-50 font-weight-bold" v-if="user.typeOfCustomer === 'NO_CATEGORY'">Fali do BRONZE:</label>
                    <label class="w-50 font-weight-bold" v-if="user.typeOfCustomer === 'BRONZE'">Fali do SILVER:</label>

                    <label class="w-50 font-weight-bold" v-if="user.typeOfCustomer === 'SILVER'">Fali do GOLD:</label>

                  </div>
                  <div class="col-lg-3">
                    <p class="w-50 font-weight-bold" v-if="user.typeOfCustomer === 'NO_CATEGORY'"> {{bronze - user.points}}</p>
                    <p class="w-50 font-weight-bold" v-if="user.typeOfCustomer === 'BRONZE'"> {{silver - user.points}}</p>
                    <p class="w-50 font-weight-bold" v-if="user.typeOfCustomer === 'SILVER'"> {{gold - user.points}}</p>


                  </div>
                </div>

				<div class="row mt-1 text-center d-flex justify-content-center text-primary">
					<div class="col-lg-3">
						<label>Ime:</label>
					</div>
					<div class="col-lg-3">
						<input type="text" class="w-50 d-flex justify-content-center text-primary"

						v-bind:class="{'form-control' : true, 'is-invalid' : !validName() && Blured.nameBlured}"
	 					v-on:blur="Blured.nameBlured = true"

						 v-model="user.name" v-bind:disabled="mode=='NO_MODE'">

						<div class="invalid-feedback">
							Morate isrpravno popuniti polje ime.
						</div>
					</div>
				</div>

				<div class="row mt-1 text-center d-flex justify-content-center text-primary">
					<div class="col-lg-3">
						<label>Prezime:</label>
					</div>
					<div class="col-lg-3">
						<input type="text" class="w-50 d-flex justify-content-center text-primary"

						v-bind:class="{'form-control' : true, 'is-invalid' : !validSurName() && Blured.surnameBlured}"
						v-on:blur="Blured.surnameBlured = true"


						v-model="user.surname" v-bind:disabled="mode=='NO_MODE'">



						<div class="invalid-feedback">
							Morate isrpravno popuniti polje prezime.
						</div>


					</div>
				</div>

				<div class="row mt-1 text-center d-flex justify-content-center text-primary">
					<div class="col-lg-3">
						<label>Nova sifra:</label>
					</div>
					<div class="col-lg-3 d-flex justify-content-start ">
						<input type="password" class="w-50 d-flex justify-content-center"


					v-bind:class="{'form-control' : true, 'is-invalid' : !validPassword() && Blured.passwordBlured}"
					v-on:blur="Blured.passwordBlured = true"

						 v-model="checkPassword1" v-bind:disabled="mode=='NO_MODE'">
						 <div class="invalid-feedback">
							Nepravilna lozinka.
						</div>
					 </div>
				</div>


				<div class="row mt-1 text-center d-flex justify-content-center text-primary">
					<div class="col-lg-3">
						<label>Potvrdi sifru:
					</label></div>
					<div class="col-lg-3 d-flex justify-content-start ">
						<input id="password" type="password" class="w-50 d-flex justify-content-center"

						v-bind:class="{'form-control':true, 'is-invalid' : !validCheckPassword() && Blured.checkPasswordBlured}"
						v-on:blur="Blured.checkPasswordBlured = true"


						v-model="checkPassword2"  v-bind:disabled="mode=='NO_MODE'" required/>




						<div id="errorPassword" class="invalid-feedback">
							Lozinke se ne poklapaju.
						</div>
					</div>
				</div>
				<div class="row py-1 text-center  d-flex justify-content-center  text-primary">

					<div class="col-lg-3"><label>Pol:</label></div>
					<div class="col-lg-3 ">
						<select id="grender" class="custom-select d-block w-50 d-flex justify-content-center"

						v-bind:class="{'form-control' : true, 'is-invalid' : !validGrender() && Blured.genderBlured}"
						v-on:blur="Blured.genderBlured = true"


						 v-model="user.gender" v-bind:disabled="mode=='NO_MODE'" required>
									<option value="">Izaberi</option>
									<option>Muski</option>
									<option>Zenski</option>
								</select>

						<div class="invalid-feedback">
								Izaberite pol!
						</div>

					</div>
				</div>

				<div class="row py-1 text-center  d-flex justify-content-center mt-3">
					<div class="col-lg-2"> <button class="btn btn-primary btn-lg btn-block " v-on:click="decline">Odustani</button></div>
					<div class="col-lg-2"  v-if="mode!='EDIT'"> <button class="btn btn-primary btn-lg btn-block " v-on:click="saveData"> izmeni</button></div>
					<div class="col-lg-2" v-if="mode==='EDIT'"> <button class="btn btn-primary btn-lg btn-block " v-on:click="confirmChanges">potvrdi</button></div>
				</div>

		</div>`
	,data : function(){
		return{
			user : {
				name : "",
				surname : "",
				username : "",
				password : "",
				gender : "",
				imagePath : ""

			},
			checkPassword1 : '',
			checkPassword2 : '',
			backup : null,
			mode:'NO_MODE',
      bronze: 1000,
      silver: 3000,
      gold: 5000,
			Blured : {
					nameBlured : false,
					surnameBlured : false,
					passwordBlured : false,
					genderBlured : false,
					checkPasswordBlured : false
				}


		}
	},
	beforeMount(){
		axios
		.get('/validationAccess')
		.then()
		.catch(function(error){
			if(error.response.status == 403){
				 window.location.href = "#/validationAccess";
			}
		})
	},
	mounted() {
		 axios
          .get('/session')
          .then(response => (this.user = response.data))
	},
	methods:{
		saveData : function(){
			this.backup = [this.user.name,this.user.surname,this.user.username,this.user.password,this.user.gender];
			this.mode='EDIT';
      this.checkPassword1 = this.user.password;
			this.checkPassword2 = this.user.password;
		},
		decline : function(){
			this.user.name = this.backup[0];
			this.user.surname = this.backup[1];
			this.user.username = this.backup[2];
			this.user.password = this.backup[3];
			this.user.gender = this.backup[4];
			this.checkPassword1 = '';
			this.checkPassword2 = '';
			this.mode='NO_MODE';
		},
		confirmChanges : function(){


			if(!(this.validName() && this.validSurName() && this.validGrender() && this.validPassword() && this.validCheckPassword())){

        this.Blured.nameBlured = true;
				this.Blured.surnameBlured = true;
				this.Blured.genderBlured = true;
				this.Blured.checkPasswordBlured = true;
				this.Blured.passwordBlured = true;

          alert("Nisu dobro popunjena polja!");

    			return;
    		}

			this.user.password = this.checkPassword1;
			axios.post('/saveChagesUser', this.user)
			.then(response =>{
				if(response.data == true){
					alert('Changes saved!');
			        this.mode = "NO_MODE";
					this.checkPassword1 = '';
					this.checkPassword2 = '';
					this.backup= null;
					this.Blured.checkPasswordBlured = false;
					this.Blured.passwordBlured = false;


				}else{
					alert('Error!');
				}
			});

		},
		validName : function() {
    		return (this.user.name.trim().length > 3) ? true : false;
    	},

    	validSurName : function() {
    		return (this.user.surname.trim().length > 3) ? true : false;
    	},
    	validGrender : function() {
    		return (this.user.gender.trim().length > 0) ? true : false;
    	},
    	validCheckPassword : function() {

    		return (this.checkPassword1.trim() === this.checkPassword2.trim()) ? true : false;
    	},
    	validPassword : function() {
    		return (this.checkPassword1.trim().length > 3) ? true : false;
    	},


	}


});
