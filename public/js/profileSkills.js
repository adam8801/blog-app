fetchData();

document.getElementById('back').addEventListener('click', () => {
    history.back();
});

function fillSkills(skills) {
    document.getElementById('head').innerText = `${sessionStorage.getItem('name')}'s Skills Set`;
    let a;
    for (key in skills) {
        if (document.getElementById(`${key}`) != undefined) {
            if (skills[key] == 0) {
                document.getElementById(`${key}`).style.display = 'none';
            } else {
                a = (skills[key] / 10) * 100;
                document.getElementById(`${key}`).children[1].children[0].style.width = `${a}%`;
                document.getElementById(`${key}`).children[1].children[0].innerText = `${a}%`;
            }
        }
    }
}

async function fetchData() {
    try {
        if (sessionStorage.getItem('otherSkills') == 0) {
            params = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };
            const response = await fetch('/skills/getData', params);
            if (response.status == 200 || response.status == 201) {
                const skills = await response.json();
                fillSkills(skills["data"]);
            } else {
                const skills = await response.json();
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> ${skills["msg"]}.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
            }
        } else {
            const data = {
                "tagname": sessionStorage.getItem('tagname'),
                "level" : 2
            };
            params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/skills/getOthersData', params);
            if (response.status == 200 || response.status == 201) {
                const skills = await response.json();
                fillSkills(skills["data"]);
            } else {
                const skills = await response.json();
                document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong>Failed!</strong> ${skills["msg"]}.
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