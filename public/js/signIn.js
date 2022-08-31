if(localStorage.getItem('token')!=null){
    window.location.href="/home"; 
}

const username = document.getElementById('username');
const password = document.getElementById('password');
const sendButton = document.getElementById('sendButton');

async function signIn() {
    const data = {
        "username": username.value,
        "password": password.value
    };
    params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/user/login', params);
    if (response.status == 200 || response.status == 201) {
        const user = await response.json();
        localStorage.setItem('token', user["token"]);
        localStorage.setItem('freeze', user["freeze"]);
        localStorage.setItem('tagname', user["tagname"]);
        localStorage.setItem('admin', user["admin"]);
        window.location.href = "/home";
    } else if (response.status == 403) {
        const user = await response.json();
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> ${user["msg"]}.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    }
     else {
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    }

}

function check() {
    if ((username.value === undefined) || (username.value == "")) {
        document.getElementById('name-validate').innerText = "Can't be left Empty";
        document.getElementById('password-validate').innerText = "";
        return 1;
    } else if ((password.value === undefined) || (password.value == "")) {
        document.getElementById('name-validate').innerText = "";
        document.getElementById('password-validate').innerText = "Can't be left Empty";
        return 1;
    } else if (username.value.length > 15) {
        document.getElementById('name-validate').innerText = "Exceeds the length allowed";
        document.getElementById('password-validate').innerText = "";
        return 2;
    } else if (password.value.length > 15) {
        document.getElementById('name-validate').innerText = "";
        document.getElementById('password-validate').innerText = "Exceeds the length allowed";
        return 3;
    } else {
        document.getElementById('name-validate').innerText = "";
        document.getElementById('password-validate').innerText = "";
        return 0;
    }
}

sendButton.addEventListener('click', () => {
    try {
        document.getElementById('load').style.display = 'block';
        sendButton.style.display = 'none';
        let validate;
        validate = check();
        if (validate == 1) {
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> You should fill all the details.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            sendButton.style.display = 'initial';
        } else if (validate == 2) {
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Username exceeds the given length.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            sendButton.style.display = 'initial';
        } else if (validate == 3) {
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Password exceeds the given length.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            sendButton.style.display = 'initial';
        } else if (validate == 0) {
            signIn();
        } else {
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            sendButton.style.display = 'initial';
        }
    } catch (err) {
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    }
});