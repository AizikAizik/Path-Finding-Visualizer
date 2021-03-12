// add click functionality to display email
const emailbtn = document.querySelector('#alert-href');

emailbtn.addEventListener('click', function(e){
    alert("Email address : isaac.ogunleye@hotmail.com");
})

// add current year in inner html
const spanTag = document.querySelector('.date');

spanTag.innerHTML = new Date().getFullYear();