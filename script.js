/**
 * ------------------------------------------------------
 * THIS FOLLOWING EVENTS  AND FUNCTION WILL HANDLE THE AUTHENTICATION STATE OF USERS ON THE PAGE 
 * ----------------------------------------------------
 */
window.addEventListener('DOMContentLoaded', function() {
   
    checklogin();
   
})


function checklogin()
{
request.sendRequest('GET', '/auth/check')
.then((data) => {
 
if(data.authenticated != false){

  document.getElementById('signuplink').innerHTML = 'B-panel';
  document.getElementById('signuplink').href = '/bpanel'
  signinlink.innerHTML = 'Dashboard';
  signinlink.href = '/dashboard'
  logoutt.style.display = 'block'
  user.innerHTML = `<img src="${data.client.imageUrl}" alt="LOGO">  ${data.client.name}`
}
else{
   return;
}

})  
.catch((error) =>{
 console.log(error)
});
}

function logout(){

// log user out
request.showloader('logging out')
request.sendRequest('GET', '/client/logout')
     .then((data) => {
      request.hideloader('you have been logged out')
// after logging  them out confirm if they are actually loged out
      request.sendRequest('GET', '/auth/check')
      .then((data) => {
// if they are logged out  modilfy page
       if(data.authenticated == false){
         signinlink.innerHTML = 'Client Login';
         signinlink.href = '/login'
         signuplink.innerHTML = 'Client Signup';
         signuplink.href = '/signup'
         window.location.href = '/';
         logoutt.style.display = 'none';
         
       }
       else{
          return;
       }
      })
    
  })  
     .catch((error) =>{
        console.log(error)
     });
}

