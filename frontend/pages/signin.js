function showDiv() {
    var signin_box = document.getElementById('signin_box')
    signin_box.style.display = "block";
 }


function getDetails(form) {   
   var uname = form.username.value;
   var psw = form.password.value;
   //  alert(uname + ': ' + psw);
        
    //CHECK uname & psw IN DATABASE. 
    
    //If not in database, alert("password or username not recognised")

    //If in database, continue to game page    
 }

 function checkDetails(form) {
    var uname = form.username.value;
    var psw = form.password.value;
    alert(uname + ': ' + psw);
        
    //Send to database  
 }




const button = document.getElementById('post-btn');
button.addEventListener('click', async _ => {
try {     
   const signin_form = document.getElementById('signin_form')
   const response = await fetch('http://localhost:3000/api/users-check', {
      method: 'post',
      body: {
      "username": signin_form.username.value,
      "password": signin_form.password.value
      }
   });
   // console.log(signin_form.username.value);
   console.log('Completed!', response);
} catch(err) {
   console.error(`Error: ${err}`);
}
});
