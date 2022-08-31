const post = document.getElementById('post');
const sendButton = document.getElementById('sendButton');

fetchData();

document.getElementById('back').addEventListener('click',()=>{
    history.back();
});

post.addEventListener('input',()=>{
    document.getElementById('chat_index').innerText = post.value.length;
});

function dateConversion(date) {
    let currentDate = new Date(date);
    let currentHour = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();
	let timeOfDay = (currentHour < 12) ? "AM" : "PM";
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentHour = (currentHour > 12) ? currentHour - 12 : currentHour;
    currentHour = (currentHour == 0) ? 12 : currentHour;

   // let timeOfDay = (currentHour < 12) ? "AM" : "PM";
    let month = (currentDate.getMonth() + 1);
    let currentDateStr = currentDate.getDate() + "/" + month + "/" + currentDate.getFullYear() + ", " + currentHour + ":" + currentMinutes + " " + timeOfDay;
    return currentDateStr;
}

function fillData(chats) {
    let html = ``;
    let str = ``;
    chats.forEach(element => {
        let dateTime = dateConversion(element.postedAt);
        let tag = document.createElement('div');
        if(element.by == localStorage.getItem('tagname')){
            tag.className="sendedMessage m-2 p-2"
            tag.setAttribute("style","text-align: right; color: #0937ad; font-weight: bold; border: solid #0937ad 2px; border-radius: .4rem;")
            tag.innerText = `${element.subject}\n${dateTime}`;
        }else{
            tag.className="receivedMessage m-2 p-2"
            tag.setAttribute("style","text-align: left; font-weight: bold; border: solid rgb(163, 159, 159) 2px; border-radius: .4rem;")
            tag.innerText = `${element.subject}\n${dateTime}`;
        }
        document.getElementById('chats').append(tag);
    });

}

document.getElementById('reload').addEventListener('click',()=>{
    fetchData();
});

async function fetchData() {
    try {
        document.getElementById('chats').innerHTML = '';
        const data = {
            "tagname": sessionStorage.getItem('tagname1'),
            "state": "self-tide-web"
        };
        params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(`/profile/chats`, params);
        if (response.status == 200 || response.status == 201) {
            const chats = await response.json();
            fillData(chats["chats"]);
        } else {
            const chats = await response.json();
	   alert(`Failed! ${chats["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${chats["msg"]}.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        }
    } catch (err) {
	alert(`Failed! Some error occurred`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
    }
}

function check() {
    if ((post.value === undefined) || (post.value == "")) {
        document.getElementById('post-validate').innerText = "Can't be left Empty";
        return 1;
    } else if (post.value.length > 50) {
        document.getElementById('post-validate').innerText = "Exceeded the allowed length";
        return 2;
    } else {
        document.getElementById('post-validate').innerText = "";
        return 0;
    }
}

async function postData() {
    try {
        const data = {
            "tagname": sessionStorage.getItem('tagname1'),
            "subject": post.value
        };
        params = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(`/profile/postChat`, params);
        if (response.status == 200 || response.status == 201) {
	    alert(`Success! Message posted`);
            document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                            <strong>Success!</strong> Message posted.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            post.value = "";
            document.getElementById('load').style.display = 'none';
            sendButton.style.display = 'initial';
            fetchData();
        } else {
            const chats = await response.json();
	   alert(`Failed! ${chats["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${chats["msg"]}.
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
	    alert(`Operation Failed! Exceeded the allowed length`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Exceeded the allowed length.
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

document.getElementById('view').addEventListener('click',()=>{
    sessionStorage.setItem('tagname',sessionStorage.getItem('tagname1'));
    window.location.href = "/otherProfile";
});
