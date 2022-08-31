fetchData();

document.getElementById('back').addEventListener('click', () => {
    history.back();
});

function fillData1(list) {
    document.getElementById('head').innerText = 'Admins';
    let html = '';
    let str = '';
    list.forEach(element => {
        let tag = document.createElement('div');
        tag.className = 'list-block mt-2 mb-2 p-2';
        let tag1 = document.createElement('div');
        tag1.className = 'item mt-3 mb-3';
        tag1.setAttribute('id',`${element.tagname}-admin`);
        let tag11 = document.createElement('div');
        tag11.className = 'details';
        let ul = document.createElement('ul');
        ul.setAttribute('style','list-style: none;');
        let l1 = document.createElement('li');
        l1.innerText = `${element.name}`;
        ul.appendChild(l1);
        let l2 = document.createElement('li');
        l2.innerText = `${element.status}`;
        ul.appendChild(l2);
        tag11.appendChild(ul);
        tag1.appendChild(tag11);
        let i = document.createElement('i');
        i.className = 'fas fa-check-circle fa-2x mt-2';
        if(element.level == 2){
            i.setAttribute('style','color: rgb(7, 7, 133);');
        }else if(element.level == 1){
            i.setAttribute('style','color: rgb(98, 236, 6);');
        }else{
            i.setAttribute('style','color: black;');
        }
        tag1.appendChild(i);
        tag.appendChild(tag1);
        let button1 = document.createElement('button');
        button1.className = 'btn btn-primary m-2';
        button1.setAttribute('id',`${element.tagname}-Radmin`);
        button1.innerText = 'Remove as Admin';
        tag.appendChild(button1);
        let button2 = document.createElement('button');
        button2.className = 'btn btn-primary';
        button2.setAttribute('id',`${element.tagname}-R`);
        button2.innerText = 'Remove';
        tag.appendChild(button2);
        document.getElementById('list').append(tag);
    });

    list.forEach(element => {
        document.getElementById(`${element.tagname}-admin`).addEventListener('click',()=>{
            sessionStorage.setItem('tagname',element.tagname);
            window.location.href = "/otherProfile";
        })
        document.getElementById(`${element.tagname}-Radmin`).addEventListener('click', async function() {
            try {
                const data = {
                    "tagname": element.tagname,
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
                const response = await fetch('/page/removeAdmin', params);
                if (response.status == 200 || response.status == 201) {
			alert(`Success! Member removed as admin (To see changes, please go to the previous page and refresh the page)`)
                    document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                    <strong>Success!</strong> Member removed as admin (To see changes, please go to the previous page and refresh the page).
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>`;
                } else {
                    const list = await response.json();
			alert(`Failed! ${list["msg"]}`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${list["msg"]}.
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
        document.getElementById(`${element.tagname}-R`).addEventListener('click', async function() {
            try {
                const data = {
                    "tagname": element.tagname,
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
                const response = await fetch('/page/removeByAdmin', params);
                if (response.status == 200 || response.status == 201) {
			alert(`Success! Member removed (To see changes, please go to the previous page and refresh the page)`)
                    document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                    <strong>Success!</strong> Member removed (To see changes, please go to the previous page and refresh the page).
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>`;
                } else {
                    const list = await response.json();
		    alert(`Failed! ${list["msg"]}`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${list["msg"]}.
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
    });
}

async function fetchData1() {
    try {
        const data = {
            "list": JSON.parse(sessionStorage.getItem('admins')),
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
        const response = await fetch('/profile/customList', params);
        if (response.status == 200 || response.status == 201) {
            const list = await response.json();
            fillData1(list["data"]);
        } else {
            const list = await response.json();
		alert(`Failed! ${list["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${list["msg"]}.
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

function fillData2(list) {
    document.getElementById('head').innerText = 'Members';
    let html = '';
    let str = '';
    list.forEach(element => {
        let tag = document.createElement('div');
        tag.className = 'list-block mt-2 mb-2 p-2';
        let tag1 = document.createElement('div');
        tag1.className = 'item mt-3 mb-3';
        tag1.setAttribute('id',`${element.tagname}-mem`);
        let tag11 = document.createElement('div');
        tag11.className = 'details';
        let ul = document.createElement('ul');
        ul.setAttribute('style','list-style: none;');
        let l1 = document.createElement('li');
        l1.innerText = `${element.name}`;
        ul.appendChild(l1);
        let l2 = document.createElement('li');
        l2.innerText = `${element.status}`;
        ul.appendChild(l2);
        tag11.appendChild(ul);
        tag1.appendChild(tag11);
        let i = document.createElement('i');
        i.className = 'fas fa-check-circle fa-2x mt-2';
        if(element.level == 2){
            i.setAttribute('style','color: rgb(7, 7, 133);');
        }else if(element.level == 1){
            i.setAttribute('style','color: rgb(98, 236, 6);');
        }else{
            i.setAttribute('style','color: black;');
        }
        tag1.appendChild(i);
        tag.appendChild(tag1);
        let button1 = document.createElement('button');
        button1.className = 'btn btn-primary m-2';
        button1.setAttribute('id',`${element.tagname}-Madmin`);
        button1.innerText = 'Make an Admin';
        tag.appendChild(button1);
        let button2 = document.createElement('button');
        button2.className = 'btn btn-primary';
        button2.setAttribute('id',`${element.tagname}-R`);
        button2.innerText = 'Remove';
        tag.appendChild(button2);
        document.getElementById('list').append(tag);
    });
    
    list.forEach(element => {
        document.getElementById(`${element.tagname}-mem`).addEventListener('click',()=>{
            sessionStorage.setItem('tagname',element.tagname);
            window.location.href = "/otherProfile";
        })
        document.getElementById(`${element.tagname}-Madmin`).addEventListener('click', async function () {
            try {
                const data = {
                    "tagname": element.tagname,
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
                const response = await fetch('/page/updateAdmin', params);
                if (response.status == 200 || response.status == 201) {
		    alert(`Success! Member also added as an admin (To see changes, please go to the previous page and refresh the page)`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                    <strong>Success!</strong> Member also added as an admin (To see changes, please go to the previous page and refresh the page).
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>`;
                } else {
                    const list = await response.json();
		    alert(`Failed! ${list["msg"]}`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${list["msg"]}.
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
        document.getElementById(`${element.tagname}-R`).addEventListener('click', async function () {
            try {
                const data = {
                    "tagname": element.tagname,
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
                const response = await fetch('/page/removeByAdmin', params);
                if (response.status == 200 || response.status == 201) {
		   alert(`Success! Member removed (To see changes, please go to the previous page and refresh the page)`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                    <strong>Success!</strong> Member removed (To see changes, please go to the previous page and refresh the page).
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>`;
                } else {
                    const list = await response.json();
		    alert(`Failed! ${list["msg"]}`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${list["msg"]}.
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
    });
}

async function fetchData2() {
    try {
        const data = {
            "list": JSON.parse(sessionStorage.getItem('members')),
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
        const response = await fetch('/profile/customList', params);
        if (response.status == 200 || response.status == 201) {
            const list = await response.json();
            fillData2(list["data"]);
        } else {
            const list = await response.json();
	    alert(`Failed! ${list["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${list["msg"]}.
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

function fillData3(list) {
    document.getElementById('head').innerText = 'Requests';
    let html = '';
    let str = '';
    list.forEach(element => {
        let tag = document.createElement('div');
        tag.className = 'list-block mt-2 mb-2 p-2';
        let tag1 = document.createElement('div');
        tag1.className = 'item mt-3 mb-3';
        tag1.setAttribute('id',`${element.tagname}-req`);
        let tag11 = document.createElement('div');
        tag11.className = 'details';
        let ul = document.createElement('ul');
        ul.setAttribute('style','list-style: none;');
        let l1 = document.createElement('li');
        l1.innerText = `${element.name}`;
        ul.appendChild(l1);
        let l2 = document.createElement('li');
        l2.innerText = `${element.status}`;
        ul.appendChild(l2);
        tag11.appendChild(ul);
        tag1.appendChild(tag11);
        let i = document.createElement('i');
        i.className = 'fas fa-check-circle fa-2x mt-2';
        if(element.level == 2){
            i.setAttribute('style','color: rgb(7, 7, 133);');
        }else if(element.level == 1){
            i.setAttribute('style','color: rgb(98, 236, 6);');
        }else{
            i.setAttribute('style','color: black;');
        }
        tag1.appendChild(i);
        tag.appendChild(tag1);
        let button1 = document.createElement('button');
        button1.className = 'btn btn-primary';
        button1.setAttribute('id',`${element.tagname}-AM`);
        button1.innerText = 'Add as member';
        tag.appendChild(button1);
        document.getElementById('list').append(tag);
    });

    list.forEach(element => {
        document.getElementById(`${element.tagname}-req`).addEventListener('click',()=>{
            sessionStorage.setItem('tagname',element.tagname);
            window.location.href = "/otherProfile";
        })
        document.getElementById(`${element.tagname}-AM`).addEventListener('click', async function() {
            try {
                const data = {
                    "tagname": element.tagname,
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
                const response = await fetch('/page/connect', params);
                if (response.status == 200 || response.status == 201) {
		    alert(`Success! Member added (To see changes, please go to the previous page and refresh the page)`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                    <strong>Success!</strong> Member added (To see changes, please go to the previous page and refresh the page).
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>`;
                } else {
                    const list = await response.json();
		    alert(`Failed! ${list["msg"]}`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${list["msg"]}.
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
    });
}

async function fetchData3() {
    try {
        const data = {
            "list": JSON.parse(sessionStorage.getItem('rmembers')),
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
        const response = await fetch('/profile/customList', params);
        if (response.status == 200 || response.status == 201) {
            const list = await response.json();
            fillData3(list["data"]);
        } else {
            const list = await response.json();
		alert(`Failed! ${list["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${list["msg"]}.
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

function fetchData() {
    if (sessionStorage.getItem('type') == 2) {
        fetchData1();
    } else if (sessionStorage.getItem('type') == 1) {
        fetchData2();
    } else {
        fetchData3();
    }
}
