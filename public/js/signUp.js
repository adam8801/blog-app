const username = document.getElementById('username');
const email = document.getElementById('email');
const tagname = document.getElementById('tagname');
const yes = document.getElementById('yes');
const sendButton = document.getElementById('sendButton');

username.addEventListener('input',()=>{
    document.getElementById('username_index').innerText = username.value.length;
});
email.addEventListener('input',()=>{
    document.getElementById('email_index').innerText = email.value.length;
});
tagname.addEventListener('input',()=>{
    document.getElementById('tagname_index').innerText = tagname.value.length;
});

function check() {
    if ((username.value === undefined) || (username.value == "")) {
        document.getElementById('username-validate').innerText = "Can't be left Empty";
        document.getElementById('tagname-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        return 1;
    } else if ((tagname.value === undefined) || (tagname.value == "")) {
        document.getElementById('username-validate').innerText = "";
        document.getElementById('tagname-validate').innerText = "Can't be left Empty";
        document.getElementById('email-validate').innerText = "";
        return 1;
    } else if ((email.value === undefined) || (email.value == "")) {
        document.getElementById('username-validate').innerText = "";
        document.getElementById('tagname-validate').innerText = "";
        document.getElementById('email-validate').innerText = "Can't be left Empty";
        return 1;
    } else if (!(yes.checked)) {
        document.getElementById('username-validate').innerText = "";
        document.getElementById('tagname-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        return 2;
    } else if (username.value.length > 15) {
        document.getElementById('username-validate').innerText = "Exceeds the given length";
        document.getElementById('tagname-validate').innerText = "";
        document.getElementById('email-validate').innerText = "";
        return 3;
    } else if (tagname.value.length > 15) {
        document.getElementById('username-validate').innerText = "";
        document.getElementById('tagname-validate').innerText = "Exceeds the given length";
        document.getElementById('email-validate').innerText = "";
        return 3;
    } else if (email.value.length > 40) {
        document.getElementById('username-validate').innerText = "";
        document.getElementById('tagname-validate').innerText = "";
        document.getElementById('email-validate').innerText = "Exceeds the given length";
        return 3;
    } else {
        let regex = /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_'{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
        let str = email.value;
        if (regex.test(str)) {
            document.getElementById('username-validate').innerText = "";
            document.getElementById('tagname-validate').innerText = "";
            document.getElementById('email-validate').innerText = "";
            return 0;
        } else {
            document.getElementById('username-validate').innerText = "";
            document.getElementById('tagname-validate').innerText = "";
            document.getElementById('email-validate').innerText = "Invalid Email";
            return 3;
        }
        
    }
}

async function postData() {
    const data = {
        "username": username.value,
        "tagname": tagname.value,
        "email": email.value
    };
    params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/user/check', params);
    if (response.status == 200 || response.status == 201) {
	alert('Success! We will verify your credentials and then send you the OTP through email after some time');
        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                            <strong>Success!</strong> We will verify your credentials and send you the OTP through email after some time.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    } else if (response.status == 403) {
        const msg = await response.json();
	alert(`Operation Failed! ${msg["msg1"]}, ${msg["msg2"]}, ${msg["msg3"]}`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> ${msg["msg1"]} ${msg["msg2"]} ${msg["msg3"]}.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    } else {
	const msg = await response.json();
	alert(`Failed! ${msg["msg"]}`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${msg["msg"]}.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    }

}

sendButton.addEventListener('click', () => {
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
	    alert(`Operation Failed! You need to accept our policy for using our product`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> You need to accept our policy for using our product.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
        } else if (validate == 3) {
		alert(`Operation Failed! Please follow the rules while entering your details`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Please follow the rules while entering your details.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
        } else if (validate == 0) {
            postData();
        } else {
	    alert(`Failed! Some error occurred`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some erro occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
        }
    } catch (err) {
	alert(`Failed! Some error occurred`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some erro occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    }
});
