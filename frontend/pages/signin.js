function showDiv() {
    var signin_box = document.getElementById('signin_box')
    signin_box.style.display = "block";
 }


function getDetails(form) {
    var uname = form.uname.value;
    var psw = form.psw.value;
    alert(uname + ': ' + psw);
        
    //CHECK uname & psw IN DATABASE. 
    
    //If not in database, alert("password or username not recognised")

    //If in database, continue to game page    
 }

 function checkDetails(form) {
    var uname = form.uname.value;
    var psw = form.psw.value;
    alert(uname + ': ' + psw);
        
    //Send to database  
 }
