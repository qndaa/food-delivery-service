Vue.component("log-in", {

    template: `


    	<div class="container w-25 p-3 ">

  			<form class="needs-validation" @submit="login" method="post" novalidate>
    
    			<div class="py-5 text-center">
        			<h2 class="h2 mb-3 text-primary">Prijavite se</h2>
    			</div>


          <div class="w-100 mb-3"> 
            <div class="col-mb-3">
              <label for="usernameInput" class="text-primary">Korsinicko ime </label>
              <input v-model="users.username" type="text" class="form-control" id="usernameInput" required />
              <div class="invalid-feedback">
                Unesite korisnicko ime!
              </div>
            </div>

            <div class="col-mb-3">
              <label for="passwordInput" class="text-primary mt-3">Sifra </label>
              <input v-model="users.password" type="password" class="form-control" id="passwordInput" required />
              <div class="invalid-feedback">
                Unesite sifru!
              </div>
            </div>

          </div>

          <div id="error" class="ml-1 mt-2" hidden="true"> 
            <label class="badge badge-danger">{{mode}}</label>
          </div>

          <button class="btn btn-primary btn-block mt-3" type="submit">Prijavi se</button>

    			
  			</form>
		</div>

    
    `,
    data : function() {
      return {
        users :{
          username : "",
          password : ""
        },
        mode : "Korisnik ne postoji!"
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
      login : function(event) {
        var lab = document.getElementById("error");
        lab.hidden = true;

        event.preventDefault();
        event.target.classList.add('was-validated');

        if(this.users.username == "" || this.users.password == ""){
          return;
        }


        axios
        .post('/login', {"username" : this.users.username , "password" : this.users.password})
        .then(function(response){
			console.log(response);
          if(!response.data.isBlocked){
            alert("Success login!");
          
          	window.location.href = "/#/";
          } else {
            alert('Korsinik je blokiran!');
             
            axios.get('/logout')
              .then(function(response){
                if(response.data == true){
                  window.location.href = "/#/login"; 
                }});
          }
        }).catch(function(error){
            console.log(error);
            if(error.response.status == 400){
               lab.hidden = false;
            }
        });
        

      }
    }
});