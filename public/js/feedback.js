const feedUpdate = document.getElementById('feedUpdate');
const feedback = document.getElementById('feedback');
const back = document.getElementById('back');

fetchData();

back.addEventListener('click', () => {
    history.back();
});

feedback.addEventListener('input',()=>{
    document.getElementById('feedback_index').innerText = feedback.value.length;
});

async function fetchData() {
    try {
        params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch('/profile/getFeedback', params);
        if (response.status == 200 || response.status == 201) {
            const feed = await response.json();
            feedback.value = feed["data"]["feed"];
        } else {
            feedback.value = "";
        }
    } catch (err) {
	alert('Failed! Some error occurred');
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
    }
}

function check() {
    if ((feedback.value === undefined) || (feedback.value == "")) {
        document.getElementById('feed-validate').innerText = "Can't be left Empty";
        return 1;
    } else if (feedback.value.length > 500) {
        document.getElementById('feed-validate').innerText = "Exceeded the length allowed";
        return 2;
    } else {
        document.getElementById('feed-validate').innerText = "";
        return 0;
    }
}

async function postFeedback() {
    const data = {
        "feed": feedback.value
    };
    params = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/profile/postFeedback', params);
    if (response.status == 200 || response.status == 201) {
	alert(`Success! Updated Successfully`);
        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong> Updated Successfully.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
        document.getElementById('load').style.display = 'none';
        feedUpdate.style.display = 'initial';
    } else {
	alert(`Failed! error`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Failed!</strong> error.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
        document.getElementById('load').style.display = 'none';
        feedUpdate.style.display = 'initial';
    }
}

feedUpdate.addEventListener('click', () => {
    try {
        document.getElementById('load').style.display = 'block';
        feedUpdate.style.display = 'none';
        let validate;
        validate = check();
        if (validate == 1) {
	    alert('Operation Failed! You should fill all the details');
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> You should fill all the details.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            feedUpdate.style.display = 'initial';
        } else if (validate == 2) {
	    alert(`Operation Failed! Length exceeded`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Length exceeded.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            feedUpdate.style.display = 'initial';
        } else if (validate == 0) {
            postFeedback();
        } else {
	    alert(`Failed! Some error occurred`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            feedUpdate.style.display = 'initial';
        }

    } catch (err) {
	alert(`Failed! Some error occurred`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        feedUpdate.style.display = 'initial';
    }
});
