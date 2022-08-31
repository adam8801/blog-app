const otp = document.getElementById('otp');
const name1 = document.getElementById('name');
const status1 = document.getElementById('status');
const age = document.getElementById('age');
const currentDesignation = document.getElementById('currentDesignation');
const location1 = document.getElementById('location');
const dob = document.getElementById('dob');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const sendButton = document.getElementById('sendButton');

name1.addEventListener('input',()=>{
    document.getElementById('name_index').innerText = name1.value.length;
});
status1.addEventListener('input',()=>{
    document.getElementById('status_index').innerText = status1.value.length;
});
currentDesignation.addEventListener('input',()=>{
    document.getElementById('currentDesignation_index').innerText = currentDesignation.value.length;
});
location1.addEventListener('input',()=>{
    document.getElementById('location_index').innerText = location1.value.length;
});
email.addEventListener('input',()=>{
    document.getElementById('email_index').innerText = email.value.length;
});
password.addEventListener('input',()=>{
    document.getElementById('password_index').innerText = password.value.length;
});
confirmPassword.addEventListener('input',()=>{
    document.getElementById('confirmPassword_index').innerText = confirmPassword.value.length;
});

function check() {
    if ((otp.value === undefined) || (otp.value == "")) {
        document.getElementById('otp-validate').innerText = "Can't be left Empty";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 1;
    } else if((name1.value === undefined) || (name1.value == "")) {
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "Can't be left Empty";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 1;
    } else if((status1.value === undefined) || (status1.value == "")) {
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "Can't be left Empty";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 1;
    } else if((age.value === undefined) || (age.value == "")) {
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "Can't be left Empty";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 1;
    } else if((currentDesignation.value === undefined) || (currentDesignation.value == "")) {
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "Can't be left Empty";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 1;
    } else if((location1.value === undefined) || (location1.value == "")) {
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "Can't be left Empty";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 1;
    } else if((dob.value === undefined) || (dob.value == "")) {
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "Can't be left Empty";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 1;
    } else if((email.value === undefined) || (email.value == "")) {
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "Can't be left Empty";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 1;
    } else if((password.value === undefined) || (password.value == "")) {
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "Can't be left Empty";
        document.getElementById('confirm-validate').innerText = "";
        return 1;
    } else if((confirmPassword.value === undefined) || (confirmPassword.value == "")) {
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "Can't be left Empty";
        return 1;
    } else if(name1.value.length>40){
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "Exceeded the allowed length";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 2;
    } else if(status1.value.length>100){
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "Exceeded the allowed length";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 2;
    } else if(age.value.length != 2){
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "Invalid";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 2;
    } else if(currentDesignation.value.length>50){
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "Exceeded the allowed length";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 2;
    } else if(location1.value.length>50){
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "Exceeded the allowed length";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 2;
    } else if(dob.value.length != 10){
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "Invalid";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 2;
    } else if(email.value.length>40){
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "Exceeded the allowed length";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 2;
    } else if(password.value.length>15){
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "Exceeded the allowed length";
        document.getElementById('confirm-validate').innerText = "";
        return 2;
    } else if(confirmPassword.value.length>15){
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "Exceeded the allowed length";
        return 2;
    } else if(confirmPassword.value == password.value){
        let regex = /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_'{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
        let str = email.value;
        if (regex.test(str)) {
            document.getElementById('otp-validate').innerText = "";
            document.getElementById('name-validate').innerText = "";
            document.getElementById('status-validate').innerText = "";
            document.getElementById('age-validate').innerText = "";
            document.getElementById('designation-validate').innerText = "";
            document.getElementById('location-validate').innerText = "";
            document.getElementById('dob-validate').innerText = "";
            document.getElementById('email-validate').innerText = "";
            document.getElementById('password-validate').innerText = "";
            document.getElementById('confirm-validate').innerText = "";
            return 0;
        } else {
            document.getElementById('otp-validate').innerText = "";
            document.getElementById('name-validate').innerText = "";
            document.getElementById('status-validate').innerText = "";
            document.getElementById('age-validate').innerText = "";
            document.getElementById('designation-validate').innerText = "";
            document.getElementById('location-validate').innerText = "";
            document.getElementById('dob-validate').innerText = "";
            document.getElementById('email-validate').innerText = "Invalid email";
            document.getElementById('password-validate').innerText = "";
            document.getElementById('confirm-validate').innerText = "";
            return 2;
        }
        
    } else{
        document.getElementById('otp-validate').innerText = "";
        document.getElementById('name-validate').innerText = "";
        document.getElementById('status-validate').innerText = "";
        document.getElementById('age-validate').innerText = "";
        document.getElementById('designation-validate').innerText = "";
        document.getElementById('location-validate').innerText = "";
        document.getElementById('dob-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        document.getElementById('confirm-validate').innerText = "";
        return 3;
    }
}

async function postData() {
    const data = {
        "stackType" : "normal",
        "email": email.value,
        "code" : parseInt(otp.value),
        "password" : password.value,
        "name" : name1.value,
        "status" : status1.value,
        "age" : parseInt(age.value),
        "scale" : 0,
        "gender" : document.getElementById('male').checked ? 0 : document.getElementById('female').checked ? 1 : 2,
        "currentDesignation" : currentDesignation.value,
        "location" : location1.value,
        "dob" : dob.value,
        "freeze" : document.getElementById('student').checked ? 0 : 1
    };
    params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/user/register', params);
    if (response.status == 200 || response.status == 201) {
	alert(`Success! You are successfully registered. Now you can login`);
        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                            <strong>Success!</strong> You are successfully registered. Now you can login.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;  
                                                        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    } else {
        const msg = await response.json();
	alert(`Operation Failed! ${msg["msg"]}`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> ${msg["msg"]}.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    }
}

sendButton.addEventListener('click',()=>{
    try {
        document.getElementById('load').style.display = 'block';
        sendButton.style.display = 'none';
        let validate;
        validate = check();
        if (validate == 1) {
	    alert(`Operation Failed! You should fill all the details`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> You should fill all the details.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
        } else if (validate == 2) {
	    alert(`Operation Failed! Fill the details according to the instructions given`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Fill the details according to the instructions given.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
        } else if (validate == 3) {
	    alert(`Operation Failed! Confirm Password and Password didn't match`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Confirm Password and Password didn't match.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
        } else {
	    email.value = email.value.toLowerCase();
            postData();                                     
        }
    } catch (err) {
	alert(`Failed! Some error occurred`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    }
});
