getProfileDetails();

back.addEventListener('click', () => {
    history.back();
});

function getProfileDetails() {
    document.getElementById('name').innerText = `${sessionStorage.getItem('name')} Profile`;
    document.getElementById('currentD').innerText = `Current Designation -\n ${sessionStorage.getItem('currentDesignation')}`;
    document.getElementById('location').innerText = `Current Location -\n ${sessionStorage.getItem('location')}`;
    let g = sessionStorage.getItem('gender');
    g == 0 ? document.getElementById('gender').innerText = `Gender -\n Male` :
    g == 1 ? document.getElementById('gender').innerText = `Gender -\n Female` :
     document.getElementById('gender').innerText = `Gender -\n Other`;
    document.getElementById('dob').innerText = `DOB(DD/MM/YYYY) -\n ${sessionStorage.getItem('dob')}`;
    document.getElementById('about').innerText = `About -\n ${sessionStorage.getItem('about')}`;
    let arr = JSON.parse(sessionStorage.getItem('hobbies'));
    let html = '';
    arr.forEach(element => {
        html += `-- ${element}\n`;
    });
    document.getElementById('hobbies').innerText = html;
    arr = JSON.parse(sessionStorage.getItem('education'));
    html = '';
    arr.forEach(element => {
        html += `-- ${element}\n`;
    });
    document.getElementById('education').innerText = html;
    arr = JSON.parse(sessionStorage.getItem('work'));
    html = '';
    arr.forEach(element => {
        html += `-- ${element}\n`;
    });
    document.getElementById('work').innerText = html;
    arr = JSON.parse(sessionStorage.getItem('projects'));
    html = '';
    arr.forEach(element => {
        html += `-- ${element}\n`;
    });
    document.getElementById('projects').innerText = html;
    arr = JSON.parse(sessionStorage.getItem('achievements'));
    html = '';
    arr.forEach(element => {
        html += `-- ${element}\n`;
    });
    document.getElementById('achievements').innerText = html;      
}
