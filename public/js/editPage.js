const subtitle = document.getElementById('subtitle');
const about = document.getElementById('about');
const sendButton = document.getElementById('sendButton');
const subtitleValidate = document.getElementById('subtitle-validate');
const aboutValidate = document.getElementById('about-validate');

document.getElementById('back').addEventListener('click', () => {
    history.back();
});

subtitle.addEventListener('input',()=>{
    document.getElementById('subtitle_index').innerText = subtitle.value.length;
});
about.addEventListener('input',()=>{
    document.getElementById('about_index').innerText = about.value.length;
});

fillData();

function fillData() {
    subtitle.value = sessionStorage.getItem('subtitle');
    about.value = sessionStorage.getItem('about');
    sessionStorage.getItem('allPost') == 1 ? document.getElementById('both').checked = true : document.getElementById('only').checked = true;
    sessionStorage.getItem('privateKey') == 1 ? document.getElementById('yes').checked = true : document.getElementById('no').checked = true;
}

function check() {
    if ((subtitle.value === undefined) || (subtitle.value == "")) {
        subtitleValidate.innerText = "Can't be left Empty";
        aboutValidate.innerText = "";
        return 1;
    } else if ((about.value === undefined) || (about.value == "")) {
        subtitleValidate.innerText = "";
        aboutValidate.innerText = "Can't be left Empty";
        return 1;
    } else if (subtitle.value.length > 40) {
        subtitleValidate.innerText = "Exceeded the allowed length";
        aboutValidate.innerText = "";
        return 2;
    } else if (about.value.length > 500) {
        subtitleValidate.innerText = "";
        aboutValidate.innerText = "Exceeded the allowed length";
        return 2;
    } else {
        subtitleValidate.innerText = "";
        aboutValidate.innerText = "";
        return 0;
    }
}

async function postData() {
    const data = {
        "subtitle": subtitle.value,
        "about": about.value,
        "allPost": document.getElementById("only").checked ? 0 : 1,
        "privateKey": document.getElementById("yes").checked ? 1 : 0,
        "pagename": sessionStorage.getItem('pagename'),
        "edited" : localStorage.getItem('tagname'),
        "adminType" : sessionStorage.getItem('adminType')
    };
    params = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/page/edit', params);
    if (response.status == 200 || response.status == 201) {
	alert(`Success! Updated Successfully (Press back and then refresh)`);
        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong> Updated Successfully (Press back and then refresh).
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    } else {
        const page = await response.json();
	alert(`Failed! ${page["msg"]}`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Failed!</strong> ${page["msg"]}.
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
	    alert(`Opeartion Failed! Fill the details according to the given instructions`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Fill the details according to the given instructions.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            sendButton.style.display = 'initial';
        } else {
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
