const skills = document.getElementById('skills');
const logOut = document.getElementById('logOut');
let val1 = 0;

if(localStorage.getItem('freeze')==1){
    skills.style.display = 'none';
}

logOut.addEventListener('click',()=>{
    localStorage.clear();
    sessionStorage.clear();
    window.location.href="/";
});

fetchData1();

function fillData1(connections) {
    let html = '';
    let str = '';
    connections.forEach(element => {
        if(element.tagname != localStorage.getItem('tagname')){
            let tag = document.createElement('div');
            tag.className = 'item mt-3 mb-3';
            tag.setAttribute('id',`${element.tagname}`);
            let tag1 = document.createElement('div');
            tag1.className = 'details';
            let ul = document.createElement('ul');
            ul.setAttribute('style','list-style: none;');
            let l1 = document.createElement('li');
            l1.innerText = `${element.name}`;
            ul.appendChild(l1);
            let l2 = document.createElement('li');
            l2.innerText = `${element.status}`;
            ul.appendChild(l2);
            tag1.appendChild(ul);
            tag.appendChild(tag1);
            if(element.level == 2){
                let i = document.createElement('i');
                i.className = 'fas fa-check-circle fa-2x mt-2';
                i.setAttribute('style','color: rgb(7, 7, 133);');
                tag.appendChild(i);
            }else if(element.level == 1){
                let i = document.createElement('i');
                i.className = 'fas fa-check-circle fa-2x mt-2';
                i.setAttribute('style','color: rgb(98, 236, 6);');
                tag.appendChild(i);
            }else{
                let i = document.createElement('i');
                i.className = 'fas fa-check-circle fa-2x mt-2';
                i.setAttribute('style','color: black;');
                tag.appendChild(i);
            }
            document.getElementById('people1').append(tag);  
        }
    });

    connections.forEach(element => {
        if(element.tagname != localStorage.getItem('tagname')){
            document.getElementById(`${element.tagname}`).addEventListener('click',()=>{
                sessionStorage.setItem('tagname',element.tagname);
                window.location.href = "/otherProfile";
            });
        }
    });
}

document.getElementById('more1').addEventListener('click',()=>{
    val1 += 5;
    fetchData1();
});

async function fetchData1() {
    document.getElementById('all').style.display = 'initial';
    document.getElementById('people2').style.display = 'none';
    document.getElementById('people3').style.display = 'none';
    document.getElementById('people4').style.display = 'none';
    try {
        params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`/profile/list/${val1}`, params);
        if (response.status == 200 || response.status == 201) {
            const connections = await response.json();
            if(connections["data"].length == 0){
		alert(`Failed! You have reached the bottom`);
                document.getElementById('message').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> You have reached the bottom.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            }else{
                fillData1(connections["data"]);
            }
        } else {
            const connections = await response.json();
	    alert(`Failed! ${connections["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${connections["msg"]}.
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

document.getElementById('requests').addEventListener('click', () => {
    document.getElementById('people2').innerHTML = '';
    document.getElementById('people3').innerHTML = '';
    document.getElementById('chats').innerHTML = '';
    fetchData2();
});

function fillData2(connections) {
    let html = '';
    let str = '';
    connections.forEach(element => {
        let tag = document.createElement('div');
        tag.className = "box";
        let tag1 = document.createElement('div');
        tag1.className = "item mt-3 mb-3";
        tag1.setAttribute('id',`${element.tagname}-r`);
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
        let i = document.createElement('i');
        i.className = 'fas fa-check-circle fa-2x mt-2';
        if(element.level == 2){
            i.setAttribute('style','color: rgb(7, 7, 133);');
        }else if(element.level == 1){
            i.setAttribute('style','color: rgb(98, 236, 6);');
        }else{
            i.setAttribute('style','color: black;');
        }
        tag1.appendChild(tag11);
        tag1.appendChild(i);
        let br = document.createElement('br');
        tag1.appendChild(br);
        tag.appendChild(tag1);
        let h6 = document.createElement('h6');
        h6.className = 'acceptMessage p-2';
        h6.setAttribute('style','font-family: sans-serif;');
        h6.setAttribute('id',`${element.tagname}-a`);
        h6.innerText = 'Accept';
        tag.appendChild(h6);
        let hr = document.createElement('hr');
        tag.appendChild(hr);
        document.getElementById('people2').append(tag);
    });
    
    connections.forEach(element => {
        document.getElementById(`${element.tagname}-r`).addEventListener('click',()=>{
            sessionStorage.setItem('tagname',element.tagname);
            window.location.href = "/otherProfile";
        });
        document.getElementById(`${element.tagname}-a`).addEventListener('click', async function(){
            try{
                const data = {
                    "tagname": element.tagname,
                    "value" : "push"
                };
                params = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(data)
                };
                const response = await fetch('/profile/connect', params);
                if (response.status == 200 || response.status == 201) {
		    alert(`Success! Request accepted successfully`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                                    <strong>Success!</strong> Request accepted successfully.
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>`;
                    fetchData2();
                } else {
                    const msg = await response.json();
		    alert(`Failed! ${msg["msg"]}`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                    <strong>Failed!</strong> ${msg["msg"]}.
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>`;
                }
            }catch(err){
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
    document.getElementById('all').style.display = 'none';
    document.getElementById('people2').style.display = 'initial';
    document.getElementById('people3').style.display = 'none';
    document.getElementById('people4').style.display = 'none';
    try {
        params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`/profile/getRequests`, params);
        if (response.status == 200 || response.status == 201) {
            const connections = await response.json();
            const data = {
                "list": connections["data"]["rconnections"],
                "flag" : 1,
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
            const response1 = await fetch(`/profile/customList`, params);
            if (response1.status == 200 || response1.status == 201) {
                const connections = await response1.json();
                fillData2(connections["data"]);
            } else {
                const connections = await response1.json();
		alert(`Failed! ${connections["msg"]}`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> ${connections["msg"]}.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
            }
        } else {
            const connections = await response.json();
	    alert(`Failed! ${connections["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${connections["msg"]}.
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

document.getElementById('connected').addEventListener('click', () => {
    document.getElementById('people2').innerHTML = '';
    document.getElementById('people3').innerHTML = '';
    document.getElementById('chats').innerHTML = '';
    fetchData3();
});

function fillData3(connections) {
    connections.forEach(element => {
        let tag = document.createElement('div');
            tag.className = 'item mt-3 mb-3';
            tag.setAttribute('id',`${element.tagname}-c`);
            let tag1 = document.createElement('div');
            tag1.className = 'details';
            let ul = document.createElement('ul');
            ul.setAttribute('style','list-style: none;');
            let l1 = document.createElement('li');
            l1.innerText = `${element.name}`;
            ul.appendChild(l1);
            let l2 = document.createElement('li');
            l2.innerText = `${element.status}`;
            ul.appendChild(l2);
            tag1.appendChild(ul);
            tag.appendChild(tag1);
            if(element.level == 2){
                let i = document.createElement('i');
                i.className = 'fas fa-check-circle fa-2x mt-2';
                i.setAttribute('style','color: rgb(7, 7, 133);');
                tag.appendChild(i);
            }else if(element.level == 1){
                let i = document.createElement('i');
                i.className = 'fas fa-check-circle fa-2x mt-2';
                i.setAttribute('style','color: rgb(98, 236, 6);');
                tag.appendChild(i);
            }else{
                let i = document.createElement('i');
                i.className = 'fas fa-check-circle fa-2x mt-2';
                i.setAttribute('style','color: black;');
                tag.appendChild(i);
            }
            document.getElementById('people3').append(tag);
    });
    
    connections.forEach(element => {
        document.getElementById(`${element.tagname}-c`).addEventListener('click',()=>{
            sessionStorage.setItem('tagname',element.tagname);
            window.location.href = "/otherProfile";
        })
    });
}

async function fetchData3() {
    document.getElementById('all').style.display = 'none';
    document.getElementById('people2').style.display = 'none';
    document.getElementById('people3').style.display = 'initial';
    document.getElementById('people4').style.display = 'none';
    try {
        params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`/profile/getConnections`, params);
        if (response.status == 200 || response.status == 201) {
            const connections = await response.json();
            const data = {
                "list": connections["data"]["connections"],
                "flag" : 2,
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
            const response1 = await fetch(`/profile/customList`, params);
            if (response1.status == 200 || response1.status == 201) {
                const connections = await response1.json();
                fillData3(connections["data"]);
            } else {
                const connections = await response1.json();
		alert(`Failed! ${connections["msg"]}`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> ${connections["msg"]}.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
            }
        } else {
            const connections = await response.json();
	    alert(`Failed! ${connections["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${connections["msg"]}.
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

document.getElementById('recent').addEventListener('click',()=>{
    document.getElementById('people2').innerHTML = '';
    document.getElementById('people3').innerHTML = '';
    document.getElementById('chats').innerHTML = '';
    fetchData4();
});

function fillData4(chatsList) {
    let html = "";
    let str = "";
    chatsList.forEach(element => {
        let tag = document.createElement('div');
        tag.className = 'item mt-3 mb-3';
        tag.setAttribute('id',`${element.holder1}-${element.holder2}`);
        let tag1 = document.createElement('div');
        tag1.className = 'details';
        let ul = document.createElement('ul');
        ul.setAttribute('style','list-style: none;');
        let li = document.createElement('li');
        li.innerText = 'Members-';
        ul.appendChild(li);
        let li1 = document.createElement('li');
        li1.innerText = `${element.name1}, ${element.name2}`;
        ul.appendChild(li1);
        tag1.appendChild(ul);
        tag.appendChild(tag1);
        document.getElementById('chats').append(tag);
    });

    chatsList.forEach(element => {
        document.getElementById(`${element.holder1}-${element.holder2}`).addEventListener('click',()=>{
            if(element.holder1 == localStorage.getItem('tagname')){
                sessionStorage.setItem('tagname1',element.holder2);
                sessionStorage.setItem('tagname2',element.holder1);
                window.location.href = "/chat";
            }else{
                sessionStorage.setItem('tagname1',element.holder1);
                sessionStorage.setItem('tagname2',element.holder2);
                window.location.href = "/chat";
            }
        });
    });
}

async function fetchData4() {
    document.getElementById('all').style.display = 'none';
    document.getElementById('people2').style.display = 'none';
    document.getElementById('people3').style.display = 'none';
    document.getElementById('people4').style.display = 'initial';
    try {
        params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`/profile/chatsList`, params);
        if (response.status == 200 || response.status == 201) {
            const chatsList = await response.json();
            fillData4(chatsList["data"]);
        } else {
            const chatsList = await response.json();
	    alert(`Failed! ${chatsList["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${chatsList["msg"]}.
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
