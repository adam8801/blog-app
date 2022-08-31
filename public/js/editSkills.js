const skillj0 = document.getElementById('skillj0');
const skillj1 = document.getElementById('skillj1');
const skillj2 = document.getElementById('skillj2');
const skillj3 = document.getElementById('skillj3');
const skillj4 = document.getElementById('skillj4');
const skillj5 = document.getElementById('skillj5');
const skillj6 = document.getElementById('skillj6');
const skillj7 = document.getElementById('skillj7');
const skillj8 = document.getElementById('skillj8');
const skillj9 = document.getElementById('skillj9');
const skillj10 = document.getElementById('skillj10');
const skillj11 = document.getElementById('skillj11');
const skillj12 = document.getElementById('skillj12');
const skillj13 = document.getElementById('skillj13');
const skillj14 = document.getElementById('skillj14');
const skillj15 = document.getElementById('skillj15');
const skillj16 = document.getElementById('skillj16');
const skillj17 = document.getElementById('skillj17');
const skillj18 = document.getElementById('skillj18');
const skillj19 = document.getElementById('skillj19');
const skillj20 = document.getElementById('skillj20');
const skilld0 = document.getElementById('skilld0');
const skilld1 = document.getElementById('skilld1');
const skilld2 = document.getElementById('skilld2');
const skilld3 = document.getElementById('skilld3');
const skilld4 = document.getElementById('skilld4');
const skilld5 = document.getElementById('skilld5');
const skilld6 = document.getElementById('skilld6');
const skilld7 = document.getElementById('skilld7');
const skilld8 = document.getElementById('skilld8');
const skilld9 = document.getElementById('skilld9');
const skilld10 = document.getElementById('skilld10');
const skillh0 = document.getElementById('skillh0');
const skillh1 = document.getElementById('skillh1');
const skillh2 = document.getElementById('skillh2');
const skillh3 = document.getElementById('skillh3');
const skillde1 = document.getElementById('skillde1');
const skillde2 = document.getElementById('skillde2');
const skillde3 = document.getElementById('skillde3');
const skillde4 = document.getElementById('skillde4');
const skillde5 = document.getElementById('skillde5');
const skillde6 = document.getElementById('skillde6');
const skillde7 = document.getElementById('skillde7');
const skillde8 = document.getElementById('skillde8');
const skillde9 = document.getElementById('skillde9');
const skillde10 = document.getElementById('skillde10');
const skillde11 = document.getElementById('skillde11');
const skillde12 = document.getElementById('skillde12');
const skillde13 = document.getElementById('skillde13');
const skillde14 = document.getElementById('skillde14');
const skillde15 = document.getElementById('skillde15');
const skillde16 = document.getElementById('skillde16');
const skillde17 = document.getElementById('skillde17');
const skillde18 = document.getElementById('skillde18');
const skillde19 = document.getElementById('skillde19');
const skillde20 = document.getElementById('skillde20');
const skillde21 = document.getElementById('skillde21');
const skillde22 = document.getElementById('skillde22');
const skillde23 = document.getElementById('skillde23');
const skillde24 = document.getElementById('skillde24');
const skillde25 = document.getElementById('skillde25');
const skillde26 = document.getElementById('skillde26');
const skillde27 = document.getElementById('skillde27');
const skillde28 = document.getElementById('skillde28');
const skillde29 = document.getElementById('skillde29');
const skillde30 = document.getElementById('skillde30');
const skillde31 = document.getElementById('skillde31');
const skillt0 = document.getElementById('skillt0');
const skillt1 = document.getElementById('skillt1');
const skillt2 = document.getElementById('skillt2');
const skillt3 = document.getElementById('skillt3');
const skillt4 = document.getElementById('skillt4');
const skillt5 = document.getElementById('skillt5');
const skillt6 = document.getElementById('skillt6');
const skillt7 = document.getElementById('skillt7');
const skillt8 = document.getElementById('skillt8');
const skills0 = document.getElementById('skills0');
const skills1 = document.getElementById('skills1');
const skills2 = document.getElementById('skills2');
const skills3 = document.getElementById('skills3');
const skills4 = document.getElementById('skills4');
const back = document.getElementById('back');
const sendButton = document.getElementById('sendButton');

fetchData();

skillj0.addEventListener('change', () => {
    document.getElementById('javaScript').innerText = skillj0.value;
});
skillj1.addEventListener('change', () => {
    document.getElementById('c').innerText = skillj1.value;
});
skillj2.addEventListener('change', () => {
    document.getElementById('cPP').innerText = skillj2.value;
});
skillj3.addEventListener('change', () => {
    document.getElementById('python').innerText = skillj3.value;
});
skillj4.addEventListener('change', () => {
    document.getElementById('php').innerText = skillj4.value;
});
skillj5.addEventListener('change', () => {
    document.getElementById('html').innerText = skillj5.value;
});
skillj6.addEventListener('change', () => {
    document.getElementById('css').innerText = skillj6.value;
});
skillj7.addEventListener('change', () => {
    document.getElementById('java').innerText = skillj7.value;
});
skillj8.addEventListener('change', () => {
    document.getElementById('cS').innerText = skillj8.value;
});
skillj9.addEventListener('change', () => {
    document.getElementById('kotlin').innerText = skillj9.value;
});
skillj10.addEventListener('change', () => {
    document.getElementById('sql').innerText = skillj10.value;
});
skillj11.addEventListener('change', () => {
    document.getElementById('swift').innerText = skillj11.value;
});
skillj12.addEventListener('change', () => {
    document.getElementById('go').innerText = skillj12.value;
});
skillj13.addEventListener('change', () => {
    document.getElementById('pearl').innerText = skillj13.value;
});
skillj14.addEventListener('change', () => {
    document.getElementById('vbDotNet').innerText = skillj14.value;
});
skillj15.addEventListener('change', () => {
    document.getElementById('ruby').innerText = skillj15.value;
});
skillj16.addEventListener('change', () => {
    document.getElementById('rust').innerText = skillj16.value;
});
skillj17.addEventListener('change', () => {
    document.getElementById('matlab').innerText = skillj17.value;
});
skillj18.addEventListener('change', () => {
    document.getElementById('r').innerText = skillj18.value;
});
skillj19.addEventListener('change', () => {
    document.getElementById('noSql').innerText = skillj19.value;
});
skillj20.addEventListener('change', () => {
    document.getElementById('all').innerText = skillj20.value;
});
skilld0.addEventListener('change', () => {
    document.getElementById('frontend').innerText = skilld0.value;
});
skilld1.addEventListener('change', () => {
    document.getElementById('backend').innerText = skilld1.value;
});
skilld2.addEventListener('change', () => {
    document.getElementById('fullstack').innerText = skilld2.value;
});
skilld3.addEventListener('change', () => {
    document.getElementById('mobile').innerText = skilld3.value;
});
skilld4.addEventListener('change', () => {
    document.getElementById('web').innerText = skilld4.value;
});
skilld5.addEventListener('change', () => {
    document.getElementById('embedded').innerText = skilld5.value;
});
skilld6.addEventListener('change', () => {
    document.getElementById('software').innerText = skilld6.value;
});
skilld7.addEventListener('change', () => {
    document.getElementById('dataS').innerText = skilld7.value;
});
skilld8.addEventListener('change', () => {
    document.getElementById('devops').innerText = skilld8.value;
});
skilld9.addEventListener('change', () => {
    document.getElementById('game').innerText = skilld9.value;
});
skilld10.addEventListener('change', () => {
    document.getElementById('nS').innerText = skilld10.value;
});
skillh0.addEventListener('change', () => {
    document.getElementById('veri').innerText = skillh0.value;
});
skillh1.addEventListener('change', () => {
    document.getElementById('fpga').innerText = skillh1.value;
});
skillh2.addEventListener('change', () => {
    document.getElementById('ed').innerText = skillh2.value;
});
skillh3.addEventListener('change', () => {
    document.getElementById('bd').innerText = skillh3.value;
});
skillde1.addEventListener('change', () => {
    document.getElementById('node').innerText = skillde1.value;
});
skillde2.addEventListener('change', () => {
    document.getElementById('django').innerText = skillde2.value;
});
skillde3.addEventListener('change', () => {
    document.getElementById('angular').innerText = skillde3.value;
});
skillde4.addEventListener('change', () => {
    document.getElementById('react').innerText = skillde4.value;
});
skillde5.addEventListener('change', () => {
    document.getElementById('flutter').innerText = skillde5.value;
});
skillde6.addEventListener('change', () => {
    document.getElementById('tensor').innerText = skillde6.value;
});
skillde7.addEventListener('change', () => {
    document.getElementById('android').innerText = skillde7.value;
});
skillde8.addEventListener('change', () => {
    document.getElementById('spring').innerText = skillde8.value;
});
skillde9.addEventListener('change', () => {
    document.getElementById('rubyOR').innerText = skillde9.value;
});
skillde10.addEventListener('change', () => {
    document.getElementById('express').innerText = skillde10.value;
});
skillde11.addEventListener('change', () => {
    document.getElementById('core').innerText = skillde11.value;
});
skillde12.addEventListener('change', () => {
    document.getElementById('vueJs').innerText = skillde12.value;
});
skillde13.addEventListener('change', () => {
    document.getElementById('ember').innerText = skillde13.value;
});
skillde14.addEventListener('change', () => {
    document.getElementById('xamarin').innerText = skillde14.value;
});
skillde15.addEventListener('change', () => {
    document.getElementById('laravel').innerText = skillde15.value;
});
skillde16.addEventListener('change', () => {
    document.getElementById('arduino').innerText = skillde16.value;
});
skillde17.addEventListener('change', () => {
    document.getElementById('rPi').innerText = skillde17.value;
});
skillde18.addEventListener('change', () => {
    document.getElementById('linux').innerText = skillde18.value;
});
skillde19.addEventListener('change', () => {
    document.getElementById('proteus').innerText = skillde19.value;
});
skillde20.addEventListener('change', () => {
    document.getElementById('xilinx').innerText = skillde20.value;
});
skillde21.addEventListener('change', () => {
    document.getElementById('labview').innerText = skillde21.value;
});
skillde22.addEventListener('change', () => {
    document.getElementById('ltSpice').innerText = skillde22.value;
});
skillde23.addEventListener('change', () => {
    document.getElementById('simulink').innerText = skillde23.value;
});
skillde24.addEventListener('change', () => {
    document.getElementById('autoCad').innerText = skillde24.value;
});
skillde25.addEventListener('change', () => {
    document.getElementById('solidWork').innerText = skillde25.value;
});
skillde26.addEventListener('change', () => {
    document.getElementById('ansysFluent').innerText = skillde26.value;
});
skillde27.addEventListener('change', () => {
    document.getElementById('mP').innerText = skillde27.value;
});
skillde28.addEventListener('change', () => {
    document.getElementById('excel').innerText = skillde28.value;
});
skillde29.addEventListener('change', () => {
    document.getElementById('sketchUp').innerText = skillde29.value;
});
skillde30.addEventListener('change', () => {
    document.getElementById('autoCivil').innerText = skillde30.value;
});
skillde31.addEventListener('change', () => {
    document.getElementById('chemcad').innerText = skillde31.value;
});
skillt0.addEventListener('change', () => {
    document.getElementById('cs').innerText = skillt0.value;
});
skillt1.addEventListener('change', () => {
    document.getElementById('dl').innerText = skillt1.value;
});
skillt2.addEventListener('change', () => {
    document.getElementById('ml').innerText = skillt2.value;
});
skillt3.addEventListener('change', () => {
    document.getElementById('va').innerText = skillt3.value;
});
skillt4.addEventListener('change', () => {
    document.getElementById('bloackChain').innerText = skillt4.value;
});
skillt5.addEventListener('change', () => {
    document.getElementById('dataA').innerText = skillt5.value;
});
skillt6.addEventListener('change', () => {
    document.getElementById('iot').innerText = skillt6.value;
});
skillt7.addEventListener('change', () => {
    document.getElementById('robotics').innerText = skillt7.value;
});
skillt8.addEventListener('change', () => {
    document.getElementById('aerospace').innerText = skillt8.value;
});
skills0.addEventListener('change', () => {
    document.getElementById('at').innerText = skills0.value;
});
skills1.addEventListener('change', () => {
    document.getElementById('creativity').innerText = skills1.value;
});
skills2.addEventListener('change', () => {
    document.getElementById('ct').innerText = skills2.value;
});
skills3.addEventListener('change', () => {
    document.getElementById('CS').innerText = skills3.value;
});
skills4.addEventListener('change', () => {
    document.getElementById('ps').innerText = skills4.value;
});

async function fetchData() {
    try {
        params = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch('/skills/getData', params);
        if (response.status == 200 || response.status == 201) {
            const skills = await response.json();
            fillData(skills);
        } else {
            const skills = await response.json();
	   alert(`Failed! ${skills["msg"]}`);
            document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> ${skills["msg"]}.
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

back.addEventListener('click',()=>{
    history.back();
});

sendButton.addEventListener('click',()=>{
    try {
        document.getElementById('load').style.display = 'block';
        sendButton.style.display = 'none';
        postSkills();
    } catch (err) {
	alert(`Failed! Some error occurred`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <strong>Failed!</strong> Some error occurred.
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    }
});

async function postSkills() {
    const data = {
        "version" : "2",
        "rank" : localStorage.getItem('admin'),
        "javaScript" : parseInt(skillj0.value),
        "c" : parseInt(skillj1.value),
         "cPlusPlus" : parseInt(skillj2.value),
         "python" : parseInt(skillj3.value),
        "php" : parseInt(skillj4.value),
        "html" : parseInt(skillj5.value),
        "css": parseInt(skillj6.value),
        "java" : parseInt(skillj7.value),
        "cSharp" : parseInt(skillj8.value),
        "kotlin" : parseInt(skillj9.value),
        "sql" : parseInt(skillj10.value),
        "swift" : parseInt(skillj11.value),
        "go" : parseInt(skillj12.value),
        "pearl" : parseInt(skillj13.value),
        "vbDotNet" : parseInt(skillj14.value),
        "ruby" : parseInt(skillj15.value),
        "rust" : parseInt(skillj16.value),
        "matlab" : parseInt(skillj17.value),
        "r" : parseInt(skillj18.value),
        "noSql" : parseInt(skillj19.value),
        "assemblyLevelLanguage" : parseInt(skillj20.value),
        "frontend" : parseInt(skilld0.value),
        "backend" : parseInt(skilld1.value),
        "fullstack" : parseInt(skilld2.value),
        "mobile" : parseInt(skilld3.value),
        "web" : parseInt(skilld4.value),
        "embedded" : parseInt(skilld5.value),
        "software" : parseInt(skilld6.value),
        "dataScientist" : parseInt(skilld7.value),
        "devops" : parseInt(skilld8.value),
       "game" : parseInt(skilld9.value),
        "networkSecurity" : parseInt(skilld10.value),
       "verilog" : parseInt(skillh0.value),
       "fpga" : parseInt(skillh1.value),
        "engineeringDesign" : parseInt(skillh2.value),
        "boardDesign" : parseInt(skillh3.value),
        "nodeJs" : parseInt(skillde1.value),
        "django" : parseInt(skillde2.value),
        "angular" : parseInt(skillde3.value),
        "react" : parseInt(skillde4.value),
        "flutter" : parseInt(skillde5.value),
        "tensorFlow" : parseInt(skillde6.value),
        "android" : parseInt(skillde7.value),
        "spring" : parseInt(skillde8.value),
        "rubyOnRails" : parseInt(skillde9.value),
        "express" : parseInt(skillde10.value),
        "DotNetCore" : parseInt(skillde11.value),
       "vueDotjs" : parseInt(skillde12.value),
        "ember" : parseInt(skillde13.value),
        "xamarin" : parseInt(skillde14.value),
        "laravel" : parseInt(skillde15.value),
        "arduino" : parseInt(skillde16.value),
        "raspberryPi" : parseInt(skillde17.value),
       "linux" :  parseInt(skillde18.value),
       "proteus" : parseInt(skillde19.value),
        "xilinx" : parseInt(skillde20.value),
        "labview" : parseInt(skillde21.value),
        "ltSpice" : parseInt(skillde22.value),
        "simulink" : parseInt(skillde23.value),
        "autoCad" : parseInt(skillde24.value),
        "solidWork" : parseInt(skillde25.value),
        "ansysFluent" : parseInt(skillde26.value),
        "microsoftProject" : parseInt(skillde27.value),
        "excel" : parseInt(skillde28.value),
        "sketchUp" : parseInt(skillde29.value),
        "autoCadCivil3d" : parseInt(skillde30.value),
       "chemcad" : parseInt(skillde31.value),
        "cyberSecurity" : parseInt(skillt0.value),
        "DL" : parseInt(skillt1.value),
        "ML" : parseInt(skillt2.value),
        "VrAr" : parseInt(skillt3.value),
        "blockchain" : parseInt(skillt4.value),
        "dataAnalytics" : parseInt(skillt5.value),
        "iot" : parseInt(skillt6.value),
        "robotics" : parseInt(skillt7.value),
        "aerospace" : parseInt(skillt8.value),
        "analyticalThinking" : parseInt(skills0.value),
        "creativity" : parseInt(skills1.value),
        "criticalThinking" : parseInt(skills2.value),
        "communicationSkill" : parseInt(skills3.value),
        "problemSolving" : parseInt(skills4.value)
    };
    params = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/skills/edit', params);
    if (response.status == 200 || response.status == 201) {
	alert(`Success! Updated Successfully`);
        document.getElementById('message').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                        <strong>Success!</strong> Updated Successfully.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    } else {
        const skills = await response.json();
	alert(`Failed! ${skills["msg"]}`);
        document.getElementById('message').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Failed!</strong> ${skills["msg"]}.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
        document.getElementById('load').style.display = 'none';
        sendButton.style.display = 'initial';
    }
}

function fillData(skills) {
    skillj0.value = skills["data"]["javaScript"];
    document.getElementById('javaScript').innerText = skillj0.value;
    skillj1.value = skills["data"]["c"];
    document.getElementById('c').innerText = skillj1.value;
    skillj2.value = skills["data"]["cPlusPlus"];
    document.getElementById('cPP').innerText = skillj2.value;
    skillj3.value = skills["data"]["python"];
    document.getElementById('python').innerText = skillj3.value;
    skillj4.value = skills["data"]["php"];
    document.getElementById('php').innerText = skillj4.value;
    skillj5.value = skills["data"]["html"];
    document.getElementById('html').innerText = skillj5.value;
    skillj6.value = skills["data"]["css"];
    document.getElementById('css').innerText = skillj6.value;
    skillj7.value = skills["data"]["java"];
    document.getElementById('java').innerText = skillj7.value;
    skillj8.value = skills["data"]["cSharp"];
    document.getElementById('cS').innerText = skillj8.value;
    skillj9.value = skills["data"]["kotlin"];
    document.getElementById('kotlin').innerText = skillj9.value;
    skillj10.value = skills["data"]["sql"];
    document.getElementById('sql').innerText = skillj10.value;
    skillj11.value = skills["data"]["swift"];
    document.getElementById('swift').innerText = skillj11.value;
    skillj12.value = skills["data"]["go"];
    document.getElementById('go').innerText = skillj12.value;
    skillj13.value = skills["data"]["pearl"];
    document.getElementById('pearl').innerText = skillj13.value;
    skillj14.value = skills["data"]["vbDotNet"];
    document.getElementById('vbDotNet').innerText = skillj14.value;
    skillj15.value = skills["data"]["ruby"];
    document.getElementById('ruby').innerText = skillj15.value;
    skillj16.value = skills["data"]["rust"];
    document.getElementById('rust').innerText = skillj16.value;
    skillj17.value = skills["data"]["matlab"];
    document.getElementById('matlab').innerText = skillj17.value;
    skillj18.value = skills["data"]["r"];
    document.getElementById('r').innerText = skillj18.value;
    skillj19.value = skills["data"]["noSql"];
    document.getElementById('noSql').innerText = skillj19.value;
    skillj20.value = skills["data"]["assemblyLevelLanguage"];
    document.getElementById('all').innerText = skillj20.value;
    skilld0.value = skills["data"]["frontend"];
    document.getElementById('frontend').innerText = skilld0.value;
    skilld1.value = skills["data"]["backend"];
    document.getElementById('backend').innerText = skilld1.value;
    skilld2.value = skills["data"]["fullstack"];
    document.getElementById('fullstack').innerText = skilld2.value;
    skilld3.value = skills["data"]["mobile"];
    document.getElementById('mobile').innerText = skilld3.value;
    skilld4.value = skills["data"]["web"];
    document.getElementById('web').innerText = skilld4.value;
    skilld5.value = skills["data"]["embedded"];
    document.getElementById('embedded').innerText = skilld5.value;
    skilld6.value = skills["data"]["software"];
    document.getElementById('software').innerText = skilld6.value;
    skilld7.value = skills["data"]["dataScientist"];
    document.getElementById('dataS').innerText = skilld7.value;
    skilld8.value = skills["data"]["devops"];
    document.getElementById('devops').innerText = skilld8.value;
    skilld9.value = skills["data"]["game"];
    document.getElementById('game').innerText = skilld9.value;
    skilld10.value = skills["data"]["networkSecurity"];
    document.getElementById('nS').innerText = skilld10.value;
    skillh0.value = skills["data"]["verilog"];
    document.getElementById('veri').innerText = skillh0.value;
    skillh1.value = skills["data"]["fpga"];
    document.getElementById('fpga').innerText = skillh1.value;
    skillh2.value = skills["data"]["engineeringDesign"];
    document.getElementById('ed').innerText = skillh2.value;
    skillh3.value = skills["data"]["boardDesign"];
    document.getElementById('bd').innerText = skillh3.value;
    skillde1.value = skills["data"]["nodeJs"];
    document.getElementById('node').innerText = skillde1.value;
    skillde2.value = skills["data"]["django"];
    document.getElementById('django').innerText = skillde2.value;
    skillde3.value = skills["data"]["angular"];
    document.getElementById('angular').innerText = skillde3.value;
    skillde4.value = skills["data"]["react"];
    document.getElementById('react').innerText = skillde4.value;
    skillde5.value = skills["data"]["flutter"];
    document.getElementById('flutter').innerText = skillde5.value;
    skillde6.value = skills["data"]["tensorFlow"];
    document.getElementById('tensor').innerText = skillde6.value;
    skillde7.value = skills["data"]["android"];
    document.getElementById('android').innerText = skillde7.value;
    skillde8.value = skills["data"]["spring"];
    document.getElementById('spring').innerText = skillde8.value;
    skillde9.value = skills["data"]["rubyOnRails"];
    document.getElementById('rubyOR').innerText = skillde9.value;
    skillde10.value = skills["data"]["express"];
    document.getElementById('express').innerText = skillde10.value;
    skillde11.value = skills["data"]["DotNetCore"];
    document.getElementById('core').innerText = skillde11.value;
    skillde12.value = skills["data"]["vueDotjs"];
    document.getElementById('vueJs').innerText = skillde12.value;
    skillde13.value = skills["data"]["ember"];
    document.getElementById('ember').innerText = skillde13.value;
    skillde14.value = skills["data"]["xamarin"];
    document.getElementById('xamarin').innerText = skillde14.value;
    skillde15.value = skills["data"]["laravel"];
    document.getElementById('laravel').innerText = skillde15.value;
    skillde16.value = skills["data"]["arduino"];
    document.getElementById('arduino').innerText = skillde16.value;
    skillde17.value = skills["data"]["raspberryPi"];
    document.getElementById('rPi').innerText = skillde17.value;
    skillde18.value = skills["data"]["linux"];
    document.getElementById('linux').innerText = skillde18.value;
    skillde19.value = skills["data"]["proteus"];
    document.getElementById('proteus').innerText = skillde19.value;
    skillde20.value = skills["data"]["xilinx"];
    document.getElementById('xilinx').innerText = skillde20.value;
    skillde21.value = skills["data"]["labview"];
    document.getElementById('labview').innerText = skillde21.value;
    skillde22.value = skills["data"]["ltSpice"];
    document.getElementById('ltSpice').innerText = skillde22.value;
    skillde23.value = skills["data"]["simulink"];
    document.getElementById('simulink').innerText = skillde23.value;
    skillde24.value = skills["data"]["autoCad"];
    document.getElementById('autoCad').innerText = skillde24.value;
    skillde25.value = skills["data"]["solidWork"];
    document.getElementById('solidWork').innerText = skillde25.value;
    skillde26.value = skills["data"]["ansysFluent"];
    document.getElementById('ansysFluent').innerText = skillde26.value;
    skillde27.value = skills["data"]["microsoftProject"];
    document.getElementById('mP').innerText = skillde27.value;
    skillde28.value = skills["data"]["excel"];
    document.getElementById('excel').innerText = skillde28.value;
    skillde29.value = skills["data"]["sketchUp"];
    document.getElementById('sketchUp').innerText = skillde29.value;
    skillde30.value = skills["data"]["autoCadCivil3d"];
    document.getElementById('autoCivil').innerText = skillde30.value;
    skillde31.value = skills["data"]["chemcad"];
    document.getElementById('chemcad').innerText = skillde31.value;
    skillt0.value = skills["data"]["cyberSecurity"];
    document.getElementById('cs').innerText = skillt0.value;
    skillt1.value = skills["data"]["DL"];
    document.getElementById('dl').innerText = skillt1.value;
    skillt2.value = skills["data"]["ML"];
    document.getElementById('ml').innerText = skillt2.value;
    skillt3.value = skills["data"]["VrAr"];
    document.getElementById('va').innerText = skillt3.value;
    skillt4.value = skills["data"]["blockchain"];
    document.getElementById('bloackChain').innerText = skillt4.value;
    skillt5.value = skills["data"]["dataAnalytics"];
    document.getElementById('dataA').innerText = skillt5.value;
    skillt6.value = skills["data"]["iot"];
    document.getElementById('iot').innerText = skillt6.value;
    skillt7.value = skills["data"]["robotics"];
    document.getElementById('robotics').innerText = skillt7.value;
    skillt8.value = skills["data"]["aerospace"];
    document.getElementById('aerospace').innerText = skillt8.value;
    skills0.value = skills["data"]["analyticalThinking"];
    document.getElementById('at').innerText = skills0.value;
    skills1.value = skills["data"]["creativity"];
    document.getElementById('creativity').innerText = skills1.value;
    skills2.value = skills["data"]["criticalThinking"];
    document.getElementById('ct').innerText = skills2.value;
    skills3.value = skills["data"]["communicationSkill"];
    document.getElementById('CS').innerText = skills3.value;
    skills4.value = skills["data"]["problemSolving"];
    document.getElementById('ps').innerText = skills4.value;
}
