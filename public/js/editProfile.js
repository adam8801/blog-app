fetchPic();
fetchData();

let projectsArr = [];
let educationArr = [];
let hobbiesArr = [];
let workArr = [];
let achievementsArr = [];
let tf;

const newProject = document.getElementById('newProject');
const newEducation = document.getElementById('newEducation');
const newHobbies = document.getElementById('newHobbies');
const newWork = document.getElementById('newWork');
const newAchievements = document.getElementById('newAchievements');
const update = document.getElementById('update');
const status1 = document.getElementById('status');
const currentDesignation = document.getElementById('currentDesignation');
const location1 = document.getElementById('location');
const about = document.getElementById('about');
const back = document.getElementById('back');
const img = document.getElementById('img');
const pic = document.getElementById('pic');
const statusValidate = document.getElementById('status-validate');
const designationValidate = document.getElementById('designation-validate');
const locationValidate = document.getElementById('location-validate');
const aboutValidate = document.getElementById('about-validate');

back.addEventListener('click', () => {
    history.back();
});

status1.addEventListener('input',()=>{
    document.getElementById('status_index').innerText = status1.value.length;
});
currentDesignation.addEventListener('input',()=>{
    document.getElementById('currentDesignation_index').innerText = currentDesignation.value.length;
});
location1.addEventListener('input',()=>{
    document.getElementById('location_index').innerText = location1.value.length;
});
about.addEventListener('input',()=>{
    document.getElementById('about_index').innerText = about.value.length;
});

function fetchPic() {
    try{
        document.getElementById('pic').setAttribute("src", `/profiles/${localStorage.getItem('tagname')}.jpg`);
    }catch(err){
        1;
    }
}

async function fetchData() {
    try {
        params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch('/profile/getMyData', params);
        if (response.status == 200 || response.status == 201) {
            const profile = await response.json();
            fillData(profile["data"]);
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

function fillData(profile) {
    projectsArr = profile["projects"] ?? "";
    educationArr = profile["education"] ?? "";
    hobbiesArr = profile["hobbies"] ?? "";
    workArr = profile["work"] ?? "";
    achievementsArr = profile["achievements"] ?? "";
    status1.value = profile["status"] ?? "";
    currentDesignation.value = profile["currentDesignation"] ?? "";
    location1.value = profile["location"] ?? "";
    about.value = profile["about"] ?? "";
    profile["freeze"] === 0 ? document.getElementById('student').checked = true : document.getElementById('nonStudent').checked = true;
    profile["privateKey"] === 0 ? document.getElementById('public').checked = true : document.getElementById('private').checked = true;
    projectsPopulate();
    educationPopulate();
    hobbiesPopulate();
    workPopulate();
    achievementsPopulate();
}

img.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            document.getElementById('pic').setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
    }
});

function projectsPopulate() {
    const projects = document.getElementById('projects');
    let html = "";
    projectsArr.forEach((element, index) => {
        let tag = document.createElement('div');
        tag.className = 'list-tag p-2 m-1';
        let h6 = document.createElement('h6');
        h6.setAttribute('style','font-family: sans-serif; font-weight: bold; color: white;');
        h6.innerText = `${element}`;
        tag.appendChild(h6);
        projects.append(tag);
    });
}

function educationPopulate() {
    const education = document.getElementById('education');
    let html = "";
    educationArr.forEach((element, index) => {
        let tag = document.createElement('div');
        tag.className = 'list-tag p-2 m-1';
        let h6 = document.createElement('h6');
        h6.setAttribute('style','font-family: sans-serif; font-weight: bold; color: white;');
        h6.innerText = `${element}`;
        tag.appendChild(h6);
        education.append(tag);
    });
}

function hobbiesPopulate() {
    const hobbies = document.getElementById('hobbies');
    let html = "";
    hobbiesArr.forEach((element, index) => {
        let tag = document.createElement('div');
        tag.className = 'list-tag p-2 m-1';
        let h6 = document.createElement('h6');
        h6.setAttribute('style','font-family: sans-serif; font-weight: bold; color: white;');
        h6.innerText = `${element}`;
        tag.appendChild(h6);
        hobbies.append(tag);
    });
}

function workPopulate() {
    const work = document.getElementById('work');
    let html = "";
    workArr.forEach((element, index) => {
        let tag = document.createElement('div');
        tag.className = 'list-tag p-2 m-1';
        let h6 = document.createElement('h6');
        h6.setAttribute('style','font-family: sans-serif; font-weight: bold; color: white;');
        h6.innerText = `${element}`;
        tag.appendChild(h6);
        work.append(tag);
    });
}

function achievementsPopulate() {
    const achievements = document.getElementById('achievements');
    let html = "";
    achievementsArr.forEach((element, index) => {
        let tag = document.createElement('div');
        tag.className = 'list-tag p-2 m-1';
        let h6 = document.createElement('h6');
        h6.setAttribute('style','font-family: sans-serif; font-weight: bold; color: white;');
        h6.innerText = `${element}`;
        tag.appendChild(h6);
        achievements.append(tag);
    });
}

function spliter() {
    projectsArr = newProject.value.split(";");
    educationArr = newEducation.value.split(";");
    hobbiesArr = newHobbies.value.split(";");
    workArr = newWork.value.split(";");
    achievementsArr = newAchievements.value.split(";");
}

function check() {
    if ((status1.value === undefined) || (status1.value == "")) {
        statusValidate.innerText = "Can't be left Empty";
        designationValidate.innerText = "";
        locationValidate.innerText = "";
        aboutValidate.innerText = "";
        return 1;
    } else if ((currentDesignation.value === undefined) || (currentDesignation.value == "")) {
        statusValidate.innerText = "";
        designationValidate.innerText = "Can't be left Empty";
        locationValidate.innerText = "";
        aboutValidate.innerText = "";
        return 1;
    } else if ((location1.value === undefined) || (location1.value == "")) {
        statusValidate.innerText = "";
        designationValidate.innerText = "";
        locationValidate.innerText = "Can't be left Empty";
        aboutValidate.innerText = "";
        return 1;
    } else if ((about.value === undefined) || (about.value == "")) {
        statusValidate.innerText = "";
        designationValidate.innerText = "";
        locationValidate.innerText = "";
        aboutValidate.innerText = "Can't be left Empty";
        return 1;
    } else if (status1.value.length > 100) {
        statusValidate.innerText = "Exceeds the given length";
        designationValidate.innerText = "";
        locationValidate.innerText = "";
        aboutValidate.innerText = "";
        return 2;
    } else if (currentDesignation.value.length > 50) {
        statusValidate.innerText = "";
        designationValidate.innerText = "Exceeds the given length";
        locationValidate.innerText = "";
        aboutValidate.innerText = "";
        return 2;
    } else if (location1.value.length > 50) {
        statusValidate.innerText = "";
        designationValidate.innerText = "";
        locationValidate.innerText = "Exceeds the given length";
        aboutValidate.innerText = "";
        return 2;
    } else if (about.value.length > 250) {
        statusValidate.innerText = "";
        designationValidate.innerText = "";
        locationValidate.innerText = "";
        aboutValidate.innerText = "Exceeds the given length";
        return 2;
    } else if (
        projectsArr.length > 10 || educationArr.length > 10 || hobbiesArr.length > 10
        || workArr.length > 10 || achievementsArr.length > 10
    ) {
        statusValidate.innerText = "";
        designationValidate.innerText = "";
        locationValidate.innerText = "";
        aboutValidate.innerText = "";
        return 3;
    } else if (
        (document.getElementById('student').checked || document.getElementById('nonStudent').checked) &&
        (document.getElementById('private').checked || document.getElementById('public').checked)
    ) {
        statusValidate.innerText = "";
        designationValidate.innerText = "";
        locationValidate.innerText = "";
        aboutValidate.innerText = "";
        return 0;
    } else {
        statusValidate.innerText = "";
        designationValidate.innerText = "";
        locationValidate.innerText = "";
        aboutValidate.innerText = "";
        return 3;
    }
}

function checkSize() {
    let size = img.files[0].size / 1048576;
    if (size < 3) {
        return true;
    } else {
        return false;
    }
}

async function updateProfile() {
    tf = document.getElementById('img').files[0] != undefined ? checkSize() : true;
    if (tf) {
    const data = {
        "status": status1.value,
        "currentDesignation": currentDesignation.value,
        "location": location1.value,
        "boxed" : true,
        "hobbies": hobbiesArr,
        "work": workArr,
        "achievements": achievementsArr,
        "about": about.value,
        "freeze": document.getElementById("student").checked ? 0 : 1,
        "privateKey": document.getElementById("public").checked ? 0 : 1,
        "projects": projectsArr,
        "education": educationArr,
        "flag" : img.files[0] != undefined ? 1 : 0
    };
    params = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/profile/update', params);
    if (response.status == 200 || response.status == 201) {
	alert(`Success! Updated Successfully`);
        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong> Details Updated Successfully.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
        if (img.files[0] != undefined) {
            let size = checkSize();
            if (size) {
                const formData = new FormData();
                formData.append('img', img.files[0]);
                params = {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                };
                const response1 = await fetch("/profile/addImage", params);
                if (response1.status == 200 || response1.status == 201) {
		    alert(`Success!`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong> Image Uploaded.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                    document.getElementById('load').style.display = 'none';
                    update.style.display = 'initial';
                } else {
		    alert(`Operation Failed! Image Upload Failed`);
                    document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Operation Failed!</strong> Image Uploaded Failed.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                    document.getElementById('load').style.display = 'none';
                    update.style.display = 'initial';
                }
            } else {
		alert(`Operation Failed! Image Upload failed due to size`);
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Operation Failed!</strong> Image Uploaded Failed due to size.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                document.getElementById('load').style.display = 'none';
                update.style.display = 'initial';
            }

        } else {
            document.getElementById('load').style.display = 'none';
            update.style.display = 'initial';
        }
    } else {
        const profile = await response.json();
	alert(`Failed! ${profile["msg"]}`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Failed!</strong> ${profile["msg"]}.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
        document.getElementById('load').style.display = 'none';
        update.style.display = 'initial';
    }
    }else{
        alert(`Failed! Image size too large`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Image size too large.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        update.style.display = 'initial';
    }
}

update.addEventListener('click', () => {
    try {
        document.getElementById('load').style.display = 'block';
        update.style.display = 'none';
        spliter();
        let validate;
        validate = check();
        if (validate == 1) {
	    alert(`Operation Failed! You should fill all the details`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> You should fill all the details.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            update.style.display = 'initial';
        } else if (validate == 2) {
	    alert(`Operation Failed! Fill the details according to the given instructions`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Operation Failed!</strong> Fill the details according to the given instructions.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            update.style.display = 'initial';
        } else if (validate == 0) {
            updateProfile();
        } else {
	    alert(`Failed! Please check the data entered`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
            document.getElementById('load').style.display = 'none';
            update.style.display = 'initial';
        }

    } catch (err) {
	alert(`Failed! Some error occurred`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        update.style.display = 'initial';
    }
});
