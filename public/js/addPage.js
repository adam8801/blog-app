const pagename = document.getElementById('pagename');
const subtitle = document.getElementById('subtitle');
const about = document.getElementById('about');
const sendButton = document.getElementById('sendButton');
const pageValidate = document.getElementById('page-validate');
const subtitleValidate = document.getElementById('subtitle-validate');
const aboutValidate = document.getElementById('about-validate');

document.getElementById('back').addEventListener('click', () => {
    history.back();
});

pagename.addEventListener('input',()=>{
    document.getElementById('pagename_index').innerText = pagename.value.length;
});
subtitle.addEventListener('input',()=>{
    document.getElementById('subtitle_index').innerText = subtitle.value.length;
});
about.addEventListener('input',()=>{
    document.getElementById('about_index').innerText = about.value.length;
});

function check() {
    if ((pagename.value === undefined) || (pagename.value == "")) {
        pageValidate.innerText = "Can't be left Empty";
        subtitleValidate.innerText = "";
        aboutValidate.innerText = "";
        return 1;
    } else if ((subtitle.value === undefined) || (subtitle.value == "")) {
        pageValidate.innerText = "";
        subtitleValidate.innerText = "Can't be left Empty";
        aboutValidate.innerText = "";
        return 1;
    } else if ((about.value === undefined) || (about.value == "")) {
        pageValidate.innerText = "";
        subtitleValidate.innerText = "";
        aboutValidate.innerText = "Can't be left Empty";
        return 1;
    } else if (pagename.value.length > 40) {
        pageValidate.innerText = "Exceeded the allowed length";
        subtitleValidate.innerText = "";
        aboutValidate.innerText = "";
        return 2;
    } else if (subtitle.value.length > 40) {
        pageValidate.innerText = "";
        subtitleValidate.innerText = "Exceeded the allowed length";
        aboutValidate.innerText = "";
        return 2;
    } else if (about.value.length > 500) {
        pageValidate.innerText = "";
        subtitleValidate.innerText = "";
        aboutValidate.innerText = "Exceeded the allowed length";
        return 2;
    } else if (
        (document.getElementById('yes').checked || document.getElementById('no').checked) &&
        (document.getElementById('both').checked || document.getElementById('only').checked)
    ) {
        pageValidate.innerText = "";
        subtitleValidate.innerText = "";
        aboutValidate.innerText = "";
        return 0;
    } else {
        pageValidate.innerText = "";
        subtitleValidate.innerText = "";
        aboutValidate.innerText = "";
        return 3;
    }
}

async function postData() {
    const data = {
        "pagename": pagename.value,
        "subtitle": subtitle.value,
        "about": about.value,
        "allPost": document.getElementById('both').checked ? 1 : 0,
        "privateKey": document.getElementById('yes').checked ? 1 : 0,
        "builder" : localStorage.getItem('tagname'),
        "level" : 0
    };
    params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/page/add', params);
    if (response.status == 200 || response.status == 201) {
	alert(`Success! Created Successfully`);
        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong> Created Successfully.
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
	    alert(`Operational Failed! You should fill all the details`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> You should fill all the details.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            sendButton.style.display = 'initial';
        } else if (validate == 2) {
	    alert(`Operational Failed! Fill the details according to the given instructions.`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Fill the details according to the given instructions.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            sendButton.style.display = 'initial';
        } else if (validate == 0) {
            postData();
        } else {
	    alert(`Failed! Please check your data entered`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            sendButton.style.display = 'initial';
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
