const comment = document.getElementById('comment');
const name1 = document.getElementById('name');
const sendButton = document.getElementById('sendButton');
const commentValidate = document.getElementById('comment-validate');
const nameValidate = document.getElementById('name-validate');

fetchData();

document.getElementById('back').addEventListener('click', () => {
    history.back();
});

function dateConversion(date) {
    let currentDate = new Date(date);
    let currentHour = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();
	let timeOfDay = (currentHour < 12) ? "AM" : "PM";
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentHour = (currentHour > 12) ? currentHour - 12 : currentHour;
    currentHour = (currentHour == 0) ? 12 : currentHour;

    //let timeOfDay = (currentHour < 12) ? "AM" : "PM";
    let month = (currentDate.getMonth() + 1);
    let currentDateStr = currentDate.getDate() + "/" + month + "/" + currentDate.getFullYear() + ", " + currentHour + ":" + currentMinutes + " " + timeOfDay;
    return currentDateStr;
}

comment.addEventListener('input',()=>{
    document.getElementById('comment_index').innerText = comment.value.length;
});
name1.addEventListener('input',()=>{
    document.getElementById('name_index').innerText = name1.value.length;
});

function fillData(comment) {
    let html = ``;
    let str = ``;
    comment.reverse();
    comment.forEach(element => {
        let dateTime = dateConversion(element.postedAt);
        let tag = document.createElement('div');
        tag.className = 'card carded my-3 p-2';
        tag.setAttribute('style','width: 100%;');
        let h5 = document.createElement('h5');
        h5.setAttribute('style','font-family: sans-serif;');
        h5.innerText = `${dateTime}`;
        tag.appendChild(h5);
        let br = document.createElement('br');
        tag.appendChild(br);
        let p1 = document.createElement('p');
        p1.innerText = `${element.subject}`;
        tag.appendChild(p1);
        let p2 = document.createElement('p');
        p2.innerText = `${element.from}`;
        tag.appendChild(p2);
        let p3 = document.createElement('p');
        p3.setAttribute('style','color: #0937ad;');
        p3.setAttribute('id',`${element.subject}-${element.postedAt}`);
        p3.innerText = "See the writer";
        tag.appendChild(p3);
        if(element.by == localStorage.getItem('tagname')){
            let i = document.createElement('i');
            i.className="fas fa-remove mb-2";
            i.setAttribute('id',`${element.subject}-delete-${element.postedAt}`);
            i.setAttribute('style','cursor: pointer;');
            tag.appendChild(i);
        }
        document.getElementById('comments').append(tag)
    });

    comment.forEach(element => {
        document.getElementById(`${element.subject}-${element.postedAt}`).addEventListener('click',()=>{
            sessionStorage.setItem('tagname',element.by);
            window.location.href = "/otherProfile";
        })
        if(element.by == localStorage.getItem('tagname')){
            document.getElementById(`${element.subject}-delete-${element.postedAt}`).addEventListener('click', async function() {
                try {
                    const data = {
                        "id": sessionStorage.getItem('commentId'),
                        "subject": element.subject,
                        "from": element.from
                    };
                    params = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(data)
                    };
                    const response = await fetch('/blog/downVote/c', params);
                    if (response.status == 200 || response.status == 201) {
			alert(`Success!`);
                        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                            <strong>Success!</strong> 
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                        document.getElementById('comments').innerHTML = '';
			fetchData();
                    } else {
                        const comment = await response.json();
			alert(`Failed! ${comment["msg"]}`);
                        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${comment["msg"]}.
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
            });
        }
    });
}

async function fetchData() {
    try {
        const data = {
            "id": sessionStorage.getItem('commentId'),
            "by": localStorage.getItem('tagname')
        };
        params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/blog/comments', params);
        if (response.status == 200 || response.status == 201) {
            const comment = await response.json();
            fillData(comment["data"]["comment"]);
        } else {
            const comment = await response.json();
	    alert(`Failed! ${comment["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${comment["msg"]}.
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
    if ((comment.value === undefined) || (comment.value == "")) {
        commentValidate.innerText = "Can't be left Empty";
        nameValidate.innerText = "";
        return 1;
    } else if ((name1.value === undefined) || (name1.value == "")) {
        commentValidate.innerText = "";
        nameValidate.innerText = "Can't be left Empty";
        return 1;
    } else if (comment.value.length > 50) {
        commentValidate.innerText = "Exceeded the allowed length";
        nameValidate.innerText = "";
        return 2;
    } else if (name1.value.length > 40) {
        commentValidate.innerText = "";
        nameValidate.innerText = "Exceeded the allowed length";
        return 2;
    } else {
        commentValidate.innerText = "";
        nameValidate.innerText = "";
        return 0;
    }
}

async function postData() {
    const data = {
        "id": sessionStorage.getItem('commentId'),
        "subject": comment.value,
        "from": name1.value
    };
    params = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/blog/upVote/c', params);
    if (response.status == 200 || response.status == 201) {
	alert(`Success! Posted Successfully`);
        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong> Posted Successfully.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
        name1.value = "";
        comment.value = "";
        document.getElementById('comments').innerHTML = '';
        fetchData();
    } else {
        const comment = await response.json();
	alert(`Failed! ${comment["msg"]}`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Failed!</strong> ${comment["msg"]}.
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
	    alert(`Opeartiona Failed! You should fill all the details`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> You should fill all the details.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            sendButton.style.display = 'initial';
        } else if (validate == 2) {
	    alert(`Operation Failed! Fill the details according to the given instructions`);
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
