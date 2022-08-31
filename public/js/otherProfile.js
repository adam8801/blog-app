let val = 0 ;

fetchPic();
fetchData();
fetchBlog();

document.getElementById('back').addEventListener('click', () => {
    history.back();
});

function fetchPic() {
    try{
        document.getElementById('pic').setAttribute("src", `/profiles/${sessionStorage.getItem('tagname')}.jpg`);
    }catch(err){
        1;
    }
}

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

function fetchDetails(
    name, status1, freeze, level, hobbies, education, work, achievements, projects,
    about, gender, currentDesignation, location, dob, pages, created, connections){
    document.getElementById('name').innerText = name;
    document.getElementById('status').innerText = `"${status1}"`;
    freeze == 1 ? document.getElementById('skillShow').style.display = 'none' : 
    document.getElementById('skillShow').style.display = 'block' ;
    level == 2 ? document.getElementById('tick').style.color = 'rgb(7, 7, 133)' : 
    level == 1 ? document.getElementById('tick').style.color = 'rgb(98, 236, 6)' : 
    document.getElementById('tick').style.color = 'black';
    sessionStorage.setItem('hobbies',JSON.stringify(hobbies));
    sessionStorage.setItem('education',JSON.stringify(education));
    sessionStorage.setItem('work',JSON.stringify(work));
    sessionStorage.setItem('achievements',JSON.stringify(achievements));
    sessionStorage.setItem('projects',JSON.stringify(projects));
    sessionStorage.setItem('name',name);
    sessionStorage.setItem('about',about);
    sessionStorage.setItem('gender',gender);
    sessionStorage.setItem('currentDesignation',currentDesignation);
    sessionStorage.setItem('location',location);
    sessionStorage.setItem('dob',dob);
    sessionStorage.setItem('otherSkills',1);
    sessionStorage.setItem('profilePages',JSON.stringify(pages.concat(created)));
    sessionStorage.setItem('profileConnections',JSON.stringify(connections));
    let arr = connections;
        if (arr.includes(localStorage.getItem('tagname'))) {
            document.getElementById('connect').innerText = 'Disconnect';
        } else {
            document.getElementById('connect').innerText = 'Connect';
        }
}

async function fetchData() {
    try {
        const data = {
            "tagname": sessionStorage.getItem('tagname'),
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
        const response = await fetch('/profile/getOthersData', params);
        if (response.status == 200 || response.status == 201) {
            const profile = await response.json();
            fetchDetails(
                profile["data"]["name"], profile["data"]["status"], profile["data"]["freeze"],
                 profile["data"]["level"], profile["data"]["hobbies"], profile["data"]["education"],
                 profile["data"]["work"], profile["data"]["achievements"], profile["data"]["projects"],
                 profile["data"]["about"], profile["data"]["gender"], profile["data"]["currentDesignation"],
                 profile["data"]["location"], profile["data"]["dob"], profile["data"]["pages"], profile["data"]["created"],
                 profile["data"]["connections"]
                );
        } else {
            const profile = await response.json();
	    alert(`Failed! ${profile["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${profile["msg"]}.
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
                                    <p id="${element["_id"]}-report"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Report this
                                    post-${element.reports.length}</p>
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
                                    <p id="${element["_id"]}-report"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Report this
                                    post-${element.reports.length}</p>
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
                                    <p id="${element["_id"]}-report"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Report this
                                    post-${element.reports.length}</p>
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
                                    <p id="${element["_id"]}-report"
                                    style="text-decoration: none; color: black; font-weight: normal;cursor: pointer;">Report this
                                    post-${element.reports.length}</p>
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
                        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                        <strong>Failed!</strong> ${blog["msg"]}.
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
            "tagname": sessionStorage.getItem('tagname'),
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
        const response = await fetch(`/blog/getOthersPost/${val}`, params);
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

document.getElementById('type1').addEventListener('click',()=>{
    sessionStorage.setItem('type',1);
    window.location.href = "/list";
});

document.getElementById('type2').addEventListener('click',()=>{
    sessionStorage.setItem('type',2);
    window.location.href = "/list";
});

document.getElementById('connect').addEventListener('click', async function () {
    try {
        document.getElementById('load').style.display = 'block';
        document.getElementById('connect').style.display = 'none';
        let arr = JSON.parse(sessionStorage.getItem('profileConnections'));
        if (arr.includes(localStorage.getItem('tagname'))) {
            const data = {
                "tagname": sessionStorage.getItem('tagname'),
                "value" : "pull"
            };
            params = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/profile/disconnect', params);
            if (response.status == 200 || response.status == 201) {
		alert(`Success! Disconnected successfully (To see changes, please go back and refresh)`)
                document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                <strong>Success!</strong> Disconnected successfully (To see changes, please go back and refresh).
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
                document.getElementById('load').style.display = 'none';
                document.getElementById('connect').style.display = 'initial';
            } else {
                const msg = await response.json();
		alert(`Failed! ${msg["msg"]}`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> ${msg["msg"]}.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
                document.getElementById('load').style.display = 'none';
                document.getElementById('connect').style.display = 'initial';
            }
        } else {
            const data = {
                "tagname": sessionStorage.getItem('tagname'),
                "value" : "request"
            };
            params = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/profile/request', params);
            if (response.status == 200 || response.status == 201) {
		alert(`Success! Request sended successfully`);
                document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                <strong>Success!</strong> Request sended successfully.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
                document.getElementById('load').style.display = 'none';
                document.getElementById('connect').style.display = 'initial';
            } else {
                const msg = await response.json();
		alert(`Failed! ${msg["msg"]}`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> ${msg["msg"]}.
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

document.getElementById('messages').addEventListener('click',()=>{
    sessionStorage.setItem('tagname1',sessionStorage.getItem('tagname'));
    sessionStorage.setItem('tagname2',localStorage.getItem('tagname'));
    window.location.href = "/chat";
});
