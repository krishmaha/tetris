
const button2 = document.getElementById('signup-btn');


function showExistingUsername() {
   let existingUsername = document.getElementById('existingUsername');
   existingUsername.style.display = "block";
}


button2.addEventListener('click', async () => {
try {
   const username = document.getElementById('usernameElement1').value;
   const password = document.getElementById('passwordElement1').value;

   const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify({
      "username": username,
      "password": password,
      }),
      headers: {
         'Content-Type': 'application/json'
      }
   });
   const data = await response.json();

   if (data.message !== "The user was created"){
      showExistingUsername()
   }
   
   }
catch(err){
    showExistingUsername()
}

})





   // const data = await fetchResponse.json();
   // console.log(data);
   // res = JSON.parse(response);
   //console.log('Completed!', data.message);//    if (data.message == "Accepted" ){
//       window.location.replace("http://localhost:3000/game.html")
//    }
//    else{
//       document.getElementById("failedSignin").style.display ="block"