let links = [];
let val = 0;
let tf;

fetchPic();
fetchData();
fetchBlog();

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

   // let timeOfDay = (currentHour < 12) ? "AM" : "PM";
    let month = (currentDate.getMonth() + 1);
    let currentDateStr = currentDate.getDate() + "/" + month + "/" + currentDate.getFullYear() + ", " + currentHour + ":" + currentMinutes + " " + timeOfDay;
    return currentDateStr;
}

document.getElementById('post').addEventListener('input',()=>{
    document.getElementById('post_index').innerText = document.getElementById('post').value.length;
});

function fetchPic() {
    try{
        document.getElementById('pic').setAttribute("src", `/pages/${sessionStorage.getItem('pagename')}.jpg`);
        document.getElementById('head').innerText = `${sessionStorage.getItem('pagename')} - ${sessionStorage.getItem('subtitle')}`;
        let arr = JSON.parse(sessionStorage.getItem('members'));
        if (arr.includes(localStorage.getItem('tagname'))) {
            document.getElementById('connect').innerText = 'Disconnect';
        } else {
            document.getElementById('connect').innerText = 'Connect';
        }
    }catch(err){
        1;
    }
    
}

function fillData(page) {
    sessionStorage.setItem('pageAbout', page["about"]);
    sessionStorage.setItem('admins', JSON.stringify(page["admins"]));
    sessionStorage.setItem('pageOwner', page["owner"]);
    page["level"] == 2 ? document.getElementById('tick').style.color = 'rgb(7, 7, 133)' :
        page["level"] == 1 ? document.getElementById('tick').style.color = 'rgb(98, 236, 6)' :
            document.getElementById('tick').style.color = 'black';
    document.getElementById('report').innerText = `Report this page - ${page["reports"].length}`;
    document.getElementById('report').addEventListener('click', async function () {
        if (!(page["reports"].includes(localStorage.getItem('tagname')))) {
            try {
                const data = {
                    "pagename": sessionStorage.getItem('pagename'),
                    "rank" : localStorage.getItem('admin')
                };
                params = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(data)
                };
                const response = await fetch('/page/report', params);
                if (response.status == 200 || response.status == 201) {
		    alert(`Success! Page reported`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                    <strong>Success!</strong> Page reported.
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>`;
                } else {
                    const page = await response.json();
		    alert(`Failed! ${page["msg"]}`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                    <strong>Failed!</strong> ${page["msg"]}.
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
    });
}

async function fetchData() {
    try {
        const data = {
            "pagename": sessionStorage.getItem('pagename'),
            "called" : localStorage.getItem('admin')
        };
        params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/page/getData', params);
        if (response.status == 200 || response.status == 201) {
            const page = await response.json();
            fillData(page["data"]);
        } else {
            const page = await response.json();
		alert(`Failed! ${page["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${page["msg"]}.
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

function fillBlogs(blogs) {
    let html = ``;
    let str = ``;
    blogs.forEach(element => {
        let dateTime = dateConversion(element.dateTime);
	let links = element.links;
        element.links = ((element.links).toString()).replaceAll(",", "\n");
        let tag = document.createElement('div');
        tag.className = "card p-2 m-2 blog";
        tag.setAttribute("style", "width: 25rem; height:min-content");
        if (element.commentNew == 1) {
            if (element.flag == 0) {
                let tag1 = document.createElement('div');
                tag1.className = "card-title post-head mt-2 mb-0";
                tag1.innerHTML = `<p>${dateTime}</p>
                            <div class="dropdown" style="text-align: right;">
                                <span style="cursor: pointer; font-weight: bold;">: Blog</span>
                                <div class="dropdown-content">
                                    <p id="${element["_id"]}-writer"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Writer</p>
                                    <p id="${element["_id"]}-report"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Report this
                                    post-${element.reports.length}</p>
                                    <p id="${element["_id"]}-delete"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Delete</p>
                                </div>
                            </div>`;
                tag.appendChild(tag1);
                let tag2 = document.createElement('div');
                tag2.className = "card-body";
                let p1 = document.createElement('p');
                p1.className = "card-text";
                p1.innerText = `${element.post}`;
                tag2.appendChild(p1);
                 links.forEach(element => {
                    let a = document.createElement('a');
                    a.setAttribute('href',`${element}`);
                    a.innerText = `${element}`;
                    let br = document.createElement(`br`);
                    tag2.appendChild(a);
                    tag2.appendChild(br);
                });
                let tag21 = document.createElement('div');
                tag21.className = "blog-features";
                tag21.innerHTML = `<h5 id="${element["_id"]}-heart"  style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.heart.length}<span><i
                                class="fas fa-heart mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-like" style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.like.length}<span><i
                                class="fas fa-thumbs-up mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-comment" style="font-family: sans-serif; cursor: pointer; color:#0937ad" class="m-2"><span><i
                                class="fas fa-comment mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-share" style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.share.length}<span><i
                                class="fas fa-share mb-2 fa-xs"></i></span></h5>`;
                tag2.appendChild(tag21);
                tag.appendChild(tag2);
            } else {
                let tag1 = document.createElement('div');
                tag1.className = "card-title post-head mt-2 mb-0";
                tag1.innerHTML = `<p>${dateTime}</p>
                            <div class="dropdown" style="text-align: right;">
                                <span style="cursor: pointer; font-weight: bold;">: Blog</span>
                                <div class="dropdown-content">
                                    <p id="${element["_id"]}-writer"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Writer</p>
                                    <p id="${element["_id"]}-report"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Report this
                                    post-${element.reports.length}</p>
                                    <p id="${element["_id"]}-delete"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Delete</p>
                                </div>
                            </div>`;
                tag.appendChild(tag1);
                let img = document.createElement('img');
                img.setAttribute("src",`/blogs/${element["_id"]}.jpg`);
                img.className= "card-img-top";
                img.setAttribute("alt","tr");
                img.setAttribute("style","border-radius: .5rem;");
                tag.appendChild(img);
                let tag2 = document.createElement('div');
                tag2.className = "card-body";
                let p1 = document.createElement('p');
                p1.className = "card-text";
                p1.innerText = `${element.post}`;
                tag2.appendChild(p1);
                 links.forEach(element => {
                    let a = document.createElement('a');
                    a.setAttribute('href',`${element}`);
                    a.innerText = `${element}`;
                    let br = document.createElement(`br`);
                    tag2.appendChild(a);
                    tag2.appendChild(br);
                });
                let tag21 = document.createElement('div');
                tag21.className = "blog-features";
                tag21.innerHTML = `<h5 id="${element["_id"]}-heart"  style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.heart.length}<span><i
                                class="fas fa-heart mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-like" style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.like.length}<span><i
                                class="fas fa-thumbs-up mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-comment" style="font-family: sans-serif; cursor: pointer; color:#0937ad" class="m-2"><span><i
                                class="fas fa-comment mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-share" style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.share.length}<span><i
                                class="fas fa-share mb-2 fa-xs"></i></span></h5>`;
                tag2.appendChild(tag21);
                tag.appendChild(tag2);
            }
        } else {
            if (element.flag == 0) {
                let tag1 = document.createElement('div');
                tag1.className = "card-title post-head mt-2 mb-0";
                tag1.innerHTML = `<p>${dateTime}</p>
                            <div class="dropdown" style="text-align: right;">
                                <span style="cursor: pointer; font-weight: bold;">: Blog</span>
                                <div class="dropdown-content">
                                    <p id="${element["_id"]}-writer"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Writer</p>
                                    <p id="${element["_id"]}-report"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Report this
                                    post-${element.reports.length}</p>
                                    <p id="${element["_id"]}-delete"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Delete</p>
                                </div>
                            </div>`;
                tag.appendChild(tag1);
                let tag2 = document.createElement('div');
                tag2.className = "card-body";
                let p1 = document.createElement('p');
                p1.className = "card-text";
                p1.innerText = `${element.post}`;
                tag2.appendChild(p1);
                 links.forEach(element => {
                    let a = document.createElement('a');
                    a.setAttribute('href',`${element}`);
                    a.innerText = `${element}`;
                    let br = document.createElement(`br`);
                    tag2.appendChild(a);
                    tag2.appendChild(br);
                });
                let tag21 = document.createElement('div');
                tag21.className = "blog-features";
                tag21.innerHTML = `<h5 id="${element["_id"]}-heart"  style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.heart.length}<span><i
                                class="fas fa-heart mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-like" style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.like.length}<span><i
                                class="fas fa-thumbs-up mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-comment" style="font-family: sans-serif; cursor: pointer;" class="m-2"><span><i
                                class="fas fa-comment mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-share" style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.share.length}<span><i
                                class="fas fa-share mb-2 fa-xs"></i></span></h5>`;
                tag2.appendChild(tag21);
                tag.appendChild(tag2);
            } else {
                let tag1 = document.createElement('div');
                tag1.className = "card-title post-head mt-2 mb-0";
                tag1.innerHTML = `<p>${dateTime}</p>
                            <div class="dropdown" style="text-align: right;">
                                <span style="cursor: pointer; font-weight: bold;">: Blog</span>
                                <div class="dropdown-content">
                                    <p id="${element["_id"]}-writer"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Writer</p>
                                    <p id="${element["_id"]}-report"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Report this
                                    post-${element.reports.length}</p>
                                    <p id="${element["_id"]}-delete"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Delete</p>
                                </div>
                            </div>`;
                tag.appendChild(tag1);
                let img = document.createElement('img');
                img.setAttribute("src",`/blogs/${element["_id"]}.jpg`);
                img.className= "card-img-top";
                img.setAttribute("alt","tr");
                img.setAttribute("style","border-radius: .5rem;");
                tag.appendChild(img);
                let tag2 = document.createElement('div');
                tag2.className = "card-body";
                let p1 = document.createElement('p');
                p1.className = "card-text";
                p1.innerText = `${element.post}`;
                tag2.appendChild(p1);
                 links.forEach(element => {
                    let a = document.createElement('a');
                    a.setAttribute('href',`${element}`);
                    a.innerText = `${element}`;
                    let br = document.createElement(`br`);
                    tag2.appendChild(a);
                    tag2.appendChild(br);
                });
                let tag21 = document.createElement('div');
                tag21.className = "blog-features";
                tag21.innerHTML = `<h5 id="${element["_id"]}-heart"  style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.heart.length}<span><i
                                class="fas fa-heart mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-like" style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.like.length}<span><i
                                class="fas fa-thumbs-up mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-comment" style="font-family: sans-serif; cursor: pointer;" class="m-2"><span><i
                                class="fas fa-comment mb-2 fa-xs"></i></span></h5>
                            <h5 id="${element["_id"]}-share" style="font-family: sans-serif; cursor: pointer;" class="m-2">${element.share.length}<span><i
                                class="fas fa-share mb-2 fa-xs"></i></span></h5>`;
                tag2.appendChild(tag21);
                tag.appendChild(tag2);
            }
        }
        document.getElementById('list').append(tag);
    });
    
    blogs.forEach(element => {
        document.getElementById(`${element["_id"]}-writer`).addEventListener("click", () => {
            sessionStorage.setItem('tagname',element.writer);
            window.location.href = "/otherProfile";
        });
        document.getElementById(`${element["_id"]}-report`).addEventListener('click', async function () {
            try {
                if (!(element.reports.includes(localStorage.getItem('tagname')))) {
                    const data = {
                        "blogId": element["_id"],
                        "rank" : localStorage.getItem("admin")
                    };
                    params = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(data)
                    };
                    const response = await fetch('/blog/report', params);
                    if (response.status == 200 || response.status == 201) {
			alert(`Success! Blog reported`);
                        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                        <strong>Success!</strong> Blog reported.
                                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                    </div>`;
                    } else {
                        const blog = await response.json();
			alert(`Failed! ${blog["msg"]}`);
                        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                        <strong>Failed!</strong> ${blog["msg"]}.
                                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                    </div>`;
                    }
                }
            } catch (err) {
		alert(`Failed! Some error occurred`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                    <strong>Failed!</strong> Some error occurred.
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>`;
            }
        });
        document.getElementById(`${element["_id"]}-delete`).addEventListener('click', async function() {
            try {
                // console.log("Starting to delete");
                const data = {
                    "id": element["_id"],
                    "pagename" : sessionStorage.getItem('pagename'),
                    "rank" : localStorage.getItem('admin')
                };
                params = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(data)
                };
                const response = await fetch('/blog/delete/pa', params);
                if (response.status == 200 || response.status == 201) {
			alert(`Success! Blog deleted`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                        <strong>Success!</strong> Blog deleted.
                                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                    </div>`;
                    val = 0;
                    document.getElementById('list').innerHTML = ``;
                    fetchBlog();
                } else {
                    const blog = await response.json();
			alert(`Failed! ${blog["msg"]}`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                        <strong>Failed!</strong> ${blog["msg"]}.
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
        document.getElementById(`${element["_id"]}-heart`).addEventListener('click', async function () {
            try {
                if (element.heart.includes(localStorage.getItem('tagname'))) {
                    const data = {
                        "id": element["_id"]
                    };
                    params = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(data)
                    };
                    const response = await fetch('/blog/downVote/h', params);
                    if (response.status == 200 || response.status == 201) {
                        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong> 
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                        document.getElementById(`${element["_id"]}-heart`).innerHTML = `${element.heart.length - 1}<span><i
            class="fas fa-heart mb-2 fa-xs"></i></span>`;
                    } else {
                        const page = await response.json();
                        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Failed!</strong> ${page["msg"]}.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                    }
                } else {
                    const data = {
                        "id": element["_id"]
                    };
                    params = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(data)
                    };
                    const response = await fetch('/blog/upVote/h', params);
                    if (response.status == 200 || response.status == 201) {
                        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong>
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                        document.getElementById(`${element["_id"]}-heart`).innerHTML = `${element.heart.length + 1}<span><i
            class="fas fa-heart mb-2 fa-xs"></i></span>`;
                        document.getElementById(`${element["_id"]}-heart`).style.color = "#0937ad";
                    } else {
                        const page = await response.json();
                        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Failed!</strong> ${page["msg"]}.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                    }
                }
            } catch (err) {
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> Some error occurred.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
            }
        });
        document.getElementById(`${element["_id"]}-like`).addEventListener('click', async function () {
            try {
                if (element.like.includes(localStorage.getItem('tagname'))) {
                    const data = {
                        "id": element["_id"]
                    };
                    params = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(data)
                    };
                    const response = await fetch('/blog/downVote/l', params);
                    if (response.status == 200 || response.status == 201) {
                        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong> 
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                        document.getElementById(`${element["_id"]}-like`).innerHTML = `${element.like.length - 1}<span><i
                        class="fas fa-thumbs-up mb-2 fa-xs"></i></span>;`
                    } else {
                        const page = await response.json();
                        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Failed!</strong> ${page["msg"]}.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                    }
                } else {
                    const data = {
                        "id": element["_id"]
                    };
                    params = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(data)
                    };
                    const response = await fetch('/blog/upVote/l', params);
                    if (response.status == 200 || response.status == 201) {
                        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong>
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                        document.getElementById(`${element["_id"]}-like`).innerHTML = `${element.like.length + 1}<span><i
                        class="fas fa-thumbs-up mb-2 fa-xs"></i></span>`;
                        document.getElementById(`${element["_id"]}-like`).style.color = "#0937ad";
                    } else {
                        const page = await response.json();
                        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Failed!</strong> ${page["msg"]}.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                    }
                }
            } catch (err) {
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> Some error occurred.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
            }
        });
        document.getElementById(`${element["_id"]}-comment`).addEventListener('click', () => {
            sessionStorage.setItem('commentId', element["_id"]);
            window.location.href = "/comment";
        });
        document.getElementById(`${element["_id"]}-share`).addEventListener('click', async function () {
            try {
                const data = {
                    "id": element["_id"]
                };
                params = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(data)
                };
                const response = await fetch('/blog/upVote/s', params);
                if (response.status == 200 || response.status == 201) {
                    document.getElementById('message').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                                <strong>Message!</strong> This feature is currently in working.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
                    document.getElementById(`${element["_id"]}-share`).innerHTML = `${element.share.length + 1}<span><i
                        class="fas fa-share mb-2 fa-xs"></i></span>`;
                    document.getElementById(`${element["_id"]}-share`).style.color = "#0937ad";
                }
            } catch (err) {
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> Some error occurred.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
            }
        });
    });
}

document.getElementById('reload').addEventListener('click', () => {
    val = 0;
    document.getElementById('list').innerHTML = ``;
    fetchBlog();
});

document.getElementById('more').addEventListener('click', () => {
    val += 5;
    fetchBlog();
});

async function fetchBlog() {
    try {
        const data = {
            "name": sessionStorage.getItem('pagename'),
            "all" : false
        };
        params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(`/blog/pageList/${val}`, params);
        if (response.status == 200 || response.status == 201) {
            const blog = await response.json();
            if (blog["data"].length == 0) {
		alert(`Failed! No more blogs to show`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> No more blogs to show.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            } else {
                fillBlogs(blog["data"]);
            }
        } else {
            const blog = await response.json();
		alert(`Failed! ${blog["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${blog["msg"]}.
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

document.getElementById('about').addEventListener('click', () => {
	alert(`About- ${sessionStorage.getItem('pageAbout')}`);
    document.getElementById('message').innerHTML = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
                                                            <strong>About -</strong> ${sessionStorage.getItem('pageAbout')}
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
});

document.getElementById('owner').addEventListener('click',()=>{
    sessionStorage.setItem('tagname',sessionStorage.getItem('pageOwner'));
    window.location.href = "/otherProfile";
})

document.getElementById('AdminList').addEventListener('click', () => {
    sessionStorage.setItem('type', 1);
    window.location.href = "/pageAMList";
});

document.getElementById('MemberList').addEventListener('click', () => {
    sessionStorage.setItem('type', 0);
    window.location.href = "/pageAMList";
});

document.getElementById('connect').addEventListener('click', async function () {
    try {
        document.getElementById('load').style.display = 'block';
        document.getElementById('connect').style.display = 'none';
        let arr = JSON.parse(sessionStorage.getItem('members'));
        if (arr.includes(localStorage.getItem('tagname'))) {
            const data = {
                "pagename": sessionStorage.getItem('pagename')
            };
            params = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/page/disconnect', params);
            if (response.status == 200 || response.status == 201) {
		alert(`Success! Disconnected successfully (To see changes, please go back and refresh)`);
                document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                <strong>Success!</strong> Disconnected successfully (To see changes, please go back and refresh).
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
                document.getElementById('load').style.display = 'none';
                document.getElementById('connect').style.display = 'initial';
            } else {
                const page = await response.json();
		alert(`Failed! ${page["msg"]}`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> ${page["msg"]}.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
                document.getElementById('load').style.display = 'none';
                document.getElementById('connect').style.display = 'initial';
            }
        } else {
            const data = {
                "pagename": sessionStorage.getItem('pagename')
            };
            params = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/page/request', params);
            if (response.status == 200 || response.status == 201) {
		alert(`Success! Request sended successfully`);
                document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                <strong>Success!</strong> Request sended successfully.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
                document.getElementById('load').style.display = 'none';
                document.getElementById('connect').style.display = 'initial';
            } else {
                const page = await response.json();
		alert(`Failed! ${page["msg"]}`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> ${page["msg"]}.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
                document.getElementById('load').style.display = 'none';
                document.getElementById('connect').style.display = 'initial';
            }
        }
    } catch (err) {
	alert(`Failed! Some error occurred`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        document.getElementById('connect').style.display = 'initial';
    }
});

function check() {
    if ((document.getElementById('post').value === undefined) || (document.getElementById('post').value == "")) {
        return 1;
    } else if (document.getElementById('post').length > 1000) {
        return 2;
    } else if (links.length > 10) {
        return 2;
    } else {
        return 0;
    }
}

function spliter() {
    links = document.getElementById('links').value.split(";");
}

function checkSize() {
    let size = document.getElementById('img').files[0].size / 1048576;
    if (size < 3) {
        return true;
    } else {
        return false;
    }
}

async function postBlog() {
    tf = document.getElementById('img').files[0] != undefined ? checkSize() : true;
    if(tf){
        const data = {
            "name": sessionStorage.getItem('pagename'),
            "post": document.getElementById('post').value,
            "links": links,
            "authorV" : localStorage.getItem('admin'),
            "flag": document.getElementById('img').files[0] != undefined ? 1 : 0
        };
        params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/blog/add/pa', params);
        if (response.status == 200 || response.status == 201) {
            const blog = await response.json();
            document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                            <strong>Success!</strong> Posted Successfully.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            if (document.getElementById('img').files[0] != undefined) {
                let size = checkSize();
                if (size) {
                    const formData = new FormData();
                    formData.append('img', document.getElementById('img').files[0]);
                    params = {
                        method: 'PATCH',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'name': blog['id']
                        },
                        body: formData
                    };
                    const response1 = await fetch("/blog/addImage", params);
                    if (response1.status == 200 || response1.status == 201) {
                        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                            <strong>Success!</strong>.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                        document.getElementById('img').value = "" ;
                    } else {
			alert(`Operation Failed! Image Upload failed`);
                        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Image Uploaded Failed.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                    }
                } else {
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Image Uploaded Failed due to size.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                }
            }
            document.getElementById('post').value = "";
            links = [];
            document.getElementById("links").value = "";
            document.getElementById('load1').style.display = 'none';
                                                            document.getElementById('posting').style.display = 'initial';
            val = 0;
            document.getElementById('list').innerHTML = ``;
            fetchBlog();
        } else {
            const blog = await response.json();
		alert(`Failed! ${blog["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${blog["msg"]}.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load1').style.display = 'none';
                                                        document.getElementById('posting').style.display = 'initial';
        }
    }else{
	alert(`Failed! Image size too large`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Image size too large.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load1').style.display = 'none';
        document.getElementById('posting').style.display = 'initial';
    }
}

document.getElementById('posting').addEventListener('click', () => {
    try {
        document.getElementById('load1').style.display = 'block';
        document.getElementById('posting').style.display = 'none';
        spliter();
        let validate;
        validate = check();
        if (validate == 1) {
		alert(`Operation Failed! You should fill all the details`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> You should fill all the details.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load1').style.display = 'none';
                                                        document.getElementById('posting').style.display = 'initial';
        } else if (validate == 2) {
		alert(`Operation Failed! Fill the details according to the given instructions`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Fill the details according to the given instructions.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load1').style.display = 'none';
                                                        document.getElementById('posting').style.display = 'initial';
        } else {
            postBlog();
        }
    } catch (err) {
	alert(`Failed! Some error occurred`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
                                                        document.getElementById('load1').style.display = 'none';
                                                        document.getElementById('posting').style.display = 'initial';
    }
})
