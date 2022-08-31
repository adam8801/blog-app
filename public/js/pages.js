let val1 = 0;
let val2 = 0;
let val3 = 0;

const skills = document.getElementById('skills');
const logOut = document.getElementById('logOut');

if(localStorage.getItem('freeze')==1){
    skills.style.display = 'none';
}

logOut.addEventListener('click',()=>{
    localStorage.clear();
    sessionStorage.clear();
    window.location.href="/";
});

fetchData1();

function fillData1(pages) {
    let html = ``;
    let str = ``;
    pages.forEach(element => {
        let tag = document.createElement('div');
        tag.className = 'item mt-3 mb-3';
        tag.setAttribute('id',`${element.pagename}`);
        let tag1 = document.createElement('div');
        tag1.className = 'details';
        let ul = document.createElement('ul');
        ul.setAttribute('style','list-style: none;');
        let l1 = document.createElement('li');
        l1.innerText = `${element.pagename}`;
        ul.appendChild(l1);
        let l2 = document.createElement('li');
        l2.innerText = `${element.subtitle}`;
        ul.appendChild(l2);
        let l3 = document.createElement('li');
        l3.innerText = `Members- ${element.members.length}`;
        ul.appendChild(l3);
        tag1.appendChild(ul);
        tag.appendChild(tag1);
        let i = document.createElement('li');
        i.className = 'fas fa-check-circle fa-2x mt-2';
        if(element.level == 2){
            i.setAttribute('style','color: rgb(7, 7, 133);');
        }else if(element.level == 1){
            i.setAttribute('style','color: rgb(98, 236, 6);');
        }else{
            i.setAttribute('style','color: black;');
        }
        tag.appendChild(i);
        document.getElementById('list1').append(tag);
    });

    document.getElementById('list2').innerHTML = ``;
    document.getElementById('list3').innerHTML = ``;
    pages.forEach(element => {
        document.getElementById(`${element.pagename}`).addEventListener('click',()=>{
            sessionStorage.setItem('pagename',element.pagename);
            sessionStorage.setItem('subtitle',element.subtitle);
            sessionStorage.setItem('members',JSON.stringify(element.members));
            window.location.href = "/pageI";
        });
    });
}

document.getElementById('more1').addEventListener('click',()=>{
    val1 += 5;
    fetchData1();
});

async function fetchData1() {
    document.getElementById('people1').style.display = 'initial';
    document.getElementById('people2').style.display = 'none';
    document.getElementById('people3').style.display = 'none';
    document.getElementById('list2').innerHTML = ``;
    document.getElementById('list3').innerHTML = ``;
    try {
        params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`/page/list/${val1}`, params);
        if (response.status == 200 || response.status == 201) {
            const pages = await response.json();
            if(pages["data"].length == 0){
		alert(`Failed! You have reached the bottom`);
                document.getElementById('message').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> You have reached the bottom.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            }else{
                fillData1(pages["data"]);
            }
        } else {
            const pages = await response.json();
	    alert(`Failed! ${pages["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${pages["msg"]}.
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

function fillData2(pages) {
    let html = ``;
    let str = ``;
    pages.forEach(element => {
        let tag = document.createElement('div');
        tag.className = 'item mt-3 mb-3';
        tag.setAttribute('id',`${element.pagename}`);
        let tag1 = document.createElement('div');
        tag1.className = 'details';
        let ul = document.createElement('ul');
        ul.setAttribute('style','list-style: none;');
        let l1 = document.createElement('li');
        l1.innerText = `${element.pagename}`;
        ul.appendChild(l1);
        let l2 = document.createElement('li');
        l2.innerText = `${element.subtitle}`;
        ul.appendChild(l2);
        let l3 = document.createElement('li');
        l3.innerText = `Members- ${element.members.length}`;
        ul.appendChild(l3);
        tag1.appendChild(ul);
        tag.appendChild(tag1);
        let i = document.createElement('li');
        i.className = 'fas fa-check-circle fa-2x mt-2';
        if(element.level == 2){
            i.setAttribute('style','color: rgb(7, 7, 133);');
        }else if(element.level == 1){
            i.setAttribute('style','color: rgb(98, 236, 6);');
        }else{
            i.setAttribute('style','color: black;');
        }
        tag.appendChild(i);
        document.getElementById('list2').append(tag);
    });

    document.getElementById('list1').innerHTML = ``;
    document.getElementById('list3').innerHTML = ``;
    pages.forEach(element => {
        document.getElementById(`${element.pagename}`).addEventListener('click',()=>{
            sessionStorage.setItem('pagename',element.pagename);
            sessionStorage.setItem('subtitle',element.subtitle);
            sessionStorage.setItem('members',JSON.stringify(element.members));
            window.location.href = "/pageI";
        });
    });
}

document.getElementById('more2').addEventListener('click',()=>{
    val2 += 5;
    fetchData2();
});

async function fetchData2(){
    document.getElementById('people1').style.display = 'none';
    document.getElementById('people2').style.display = 'initial';
    document.getElementById('people3').style.display = 'none';
    document.getElementById('list1').innerHTML = ``;
    document.getElementById('list3').innerHTML = ``;
    try {
        params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`/page/connectedList/${val2}`, params);
        if (response.status == 200 || response.status == 201) {
            const pages = await response.json();
            if(pages["data"].length == 0){
		alert(`Failed! You have reached the bottom`);
                document.getElementById('message').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> You have reached the bottom.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            }else{
                fillData2(pages["data"]);
            }
        } else {
            const pages = await response.json();
		alert(`Failed! ${pages["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${pages["msg"]}.
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

document.getElementById('connected').addEventListener('click',()=>{
    val2 = 0;
    fetchData2();
});

function fillData3(pages) {
    let html = ``;
    let str = ``;
    pages.forEach(element => {
        let tag = document.createElement('div');
        tag.className = 'item mt-3 mb-3';
        tag.setAttribute('id',`${element.pagename}`);
        let tag1 = document.createElement('div');
        tag1.className = 'details';
        let ul = document.createElement('ul');
        ul.setAttribute('style','list-style: none;');
        let l1 = document.createElement('li');
        l1.innerText = `${element.pagename}`;
        ul.appendChild(l1);
        let l2 = document.createElement('li');
        l2.innerText = `${element.subtitle}`;
        ul.appendChild(l2);
        let l3 = document.createElement('li');
        l3.innerText = `Members- ${element.members.length}`;
        ul.appendChild(l3);
        tag1.appendChild(ul);
        tag.appendChild(tag1);
        let i = document.createElement('li');
        i.className = 'fas fa-check-circle fa-2x mt-2';
        if(element.level == 2){
            i.setAttribute('style','color: rgb(7, 7, 133);');
        }else if(element.level == 1){
            i.setAttribute('style','color: rgb(98, 236, 6);');
        }else{
            i.setAttribute('style','color: black;');
        }
        tag.appendChild(i);
        document.getElementById('list3').append(tag);
    });

    document.getElementById('list2').innerHTML = ``;
    document.getElementById('list1').innerHTML = ``;
    pages.forEach(element => {
        document.getElementById(`${element.pagename}`).addEventListener('click',()=>{
            sessionStorage.setItem('pagename',element.pagename);
            sessionStorage.setItem('subtitle',element.subtitle);
            sessionStorage.setItem('level',element.level);
            sessionStorage.setItem('members',JSON.stringify(element.members));
            window.location.href = "/personalPage";
        });
    });
}

document.getElementById('more3').addEventListener('click',()=>{
    val3 += 5;
    fetchData3();
});

async function fetchData3(){
    document.getElementById('people1').style.display = 'none';
    document.getElementById('people2').style.display = 'none';
    document.getElementById('people3').style.display = 'initial';
    document.getElementById('list1').innerHTML = ``;
    document.getElementById('list2').innerHTML = ``;
    try {
        params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`/page/personalList/${val3}`, params);
        if (response.status == 200 || response.status == 201) {
            const pages = await response.json();
            if(pages["data"].length == 0){
		alert(`Failed! You have reached the bottom`);
                document.getElementById('message').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> You have reached the bottom.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            }else{
                fillData3(pages["data"]);
            }
        } else {
            const pages = await response.json();
		alert(`Failed! ${pages["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${pages["msg"]}.
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

document.getElementById('personal').addEventListener('click',()=>{
    val3 = 0;
    fetchData3();
});
