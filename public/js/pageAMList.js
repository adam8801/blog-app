fetchData();

document.getElementById('back').addEventListener('click',()=>{
    history.back();
});

function fillData(connections) {
    let html = ``;
    let str = ``;
    connections.forEach(element => {
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
            document.getElementById('list').append(tag);
    });

    connections.forEach(element => {
        document.getElementById(`${element.tagname}`).addEventListener('click',()=>{
            sessionStorage.setItem('tagname',element.tagname);
            window.location.href = "/otherProfile";
        })
    });
}

async function fetchData() {
    try {
        if(sessionStorage.getItem('type')==1){
            document.getElementById('head').innerText = `Admins`;
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
                const connections = await response.json();
                fillData(connections["data"]);
            } else {
                const connections = await response.json();
		alert(`Failed! ${connections["msg"]}`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> ${connections["msg"]}.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
            }
        }else{
            document.getElementById('head').innerText = `Members`;
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
                const connections = await response.json();
                fillData(connections["data"]);
            } else {
                const connections = await response.json();
		alert(`Failed! ${connections["msg"]}`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> ${connections["msg"]}.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
            }
        }
    } catch (err) {
        console.log(err);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
    }
}
