fetchPic();
fetchData();

function fetchPic() {
    try{
        document.getElementById('pic').setAttribute("src", `/pages/${sessionStorage.getItem('pagename')}.jpg`);
        document.getElementById('head').innerText = `${sessionStorage.getItem('pagename')} - ${sessionStorage.getItem('subtitle')}`;
    }catch(err){
        1;
    }
}

document.getElementById('back').addEventListener('click', () => {
    history.back();
});

function fillData(page) {
    sessionStorage.setItem('about',page["about"]);
    sessionStorage.setItem('admins',JSON.stringify(page["admins"]));
    sessionStorage.setItem('allPost',page["allPost"]);
    if(page["creator"] != null){
        sessionStorage.setItem("adminType",1);
    }else{
        sessionStorage.setItem("adminType",0);
    }
    sessionStorage.setItem('members',JSON.stringify(page["members"]));
    sessionStorage.setItem('privateKey',page["privateKey"]);
    sessionStorage.setItem('rmembers',JSON.stringify(page["rmembers"]));
    sessionStorage.setItem('subtitle',page["subtitle"]);
}

async function fetchData() {
    try {
        const data = {
            "pagename": sessionStorage.getItem('pagename'),
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
        const response = await fetch('/page/getPersonalData', params);
        if (response.status == 200 || response.status == 201) {
            const page = await response.json();
            fillData(page["data"]);
        } else {
            const page = await response.json();
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${page["msg"]}.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        }
    } catch (err) {
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
    }
}

document.getElementById("img").addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            document.getElementById('pic').setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
    }
});

document.getElementById("admins").addEventListener("click",()=>{
    sessionStorage.setItem('type',2);
    window.location.href = "/personalPageAMRList";
});

document.getElementById("members").addEventListener("click",()=>{
    sessionStorage.setItem('type',1);
    window.location.href = "/personalPageAMRList";
});

document.getElementById("request").addEventListener("click",()=>{
    sessionStorage.setItem('type',0);
    window.location.href = "/personalPageAMRList";
});

function checkSize() {
    let size = document.getElementById('img').files[0].size / 1048576;
    if (size < 3) {
        return true;
    } else {
        return false;
    }
}

document.getElementById('submit').addEventListener('click', async function() {
    try{
        if (document.getElementById('img').files[0] != undefined) {
            let size = checkSize();
            if (size) {
                const formData = new FormData();
                formData.append('img', document.getElementById('img').files[0]);
                params = {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'name' : sessionStorage.getItem('pagename')
                    },
                    body: formData
                };
                const response1 = await fetch("/page/addImage", params);
                if (response1.status == 200 || response1.status == 201) {
			alert(`Success! Image Upload`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong> Image Uploaded.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                } else {
		    alert(`Operation Failed! Image Upload Failed`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Operation Failed!</strong> Image Uploaded Failed.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                }
            } else {
		alert(`Operation Failed! Image Upload failed due to size`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Operation Failed!</strong> Image Uploaded Failed due to size.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
            }
    
        }
    }catch(err){
	 alert(`Failed! Some error occurred`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
    }
});
