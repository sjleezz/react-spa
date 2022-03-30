import member from './member.js';
import {homeButton, infoButton} from './navigation.js';
import loadDept from './loadDept.js';










const InsertData = function() {
    return ;
}


export default InsertData;



let body = document.querySelector("body");

// <header> 
//   <home button ...>
//   <info button ...>
// </header>
let header = document.createElement("header");
header.appendChild(homeButton);
header.appendChild(infoButton);
body.appendChild(header);

// <img ...>
let img3 = document.createElement("img");
img3.setAttribute("class", "floating_button")
img3.setAttribute("src", "./resource/icon_no_stroke_menu_normal.png");
img3.addEventListener("click", covidInfo);
body.appendChild(img3);

// <div ...>
//   <div ...>
//    <form>
//      <label ...>
//      <input ...>
//      <label ...>
//      <select ...>
//      <label ...>
//      <input ...>
//      <label ...>
//      <input ...>
//      <input ...>
//    </form>
//   </div>
// </div>
let div1 = document.createElement("div");
let div2 = document.createElement("div");
let form = document.createElement("form");
div1.setAttribute("class", "layout");
div2.setAttribute("class", "contents");
let label_names = ["이름", "부서", "격리 시작일", "전화 번호"];
for (let lb in label_names) {
    console.log(label_names[lb]);
    let label = document.createElement("label");
    if(label_names[lb] === "부서") {
        let select = document.createElement("select");
        let option = document.createElement("option");
        label.setAttribute("for", "dept");
        label.innerText = label_names[lb];
        option.setAttribute("value", "", "disabled selected");
        option.innerText = "부서를 선택해주세요";
        select.setAttribute("id", "dept");
        select.setAttribute("name", "department");
        select.appendChild(option);
        loadDept(select);   // ex) <option>AI Solution</option>
        form.appendChild(label);
        form.appendChild(select);
    }
    else {
        let input = document.createElement("input");
        switch(label_names[lb]) {
            case "이름" :
                label.setAttribute("for", "name");
                label.innerText = label_names[lb];
                input.setAttribute("type", "text");
                input.setAttribute("id", "name");
                input.setAttribute("name", "fullname");
                input.setAttribute("placeholder", "이름을 입력해주세요");
                break;
            case "격리 시작일" :
                label.setAttribute("for", "date"); 
                label.innerText = label_names[lb];   
                input.setAttribute("type", "date");
                input.setAttribute("id", "date")
                input.setAttribute("name", "isolated_date");
                input.setAttribute("value", "2022-01-01");
                input.setAttribute("min", "2019-01-01");
                input.setAttribute("max", "2030-12-31");
                break;
            case "전화 번호" :
                label.setAttribute("for", "phone");    
                label.innerText = label_names[lb];
                input.setAttribute("type", "text");
                input.setAttribute("id", "phone");
                input.setAttribute("name", "phone_number");
                input.setAttribute("placeholder", "전화번호를 입력해주세요");
                break; 
            default :
                break;
        }
        form.appendChild(label);
        form.appendChild(input);
    }
}
//<input ...>
let input3 = document.createElement("input");
input3.setAttribute("type", "submit")
input3.setAttribute("value", "제출");
input3.addEventListener("click", sendDataToServer);
form.appendChild(input3);
div2.appendChild(form);
div1.appendChild(div2);
body.appendChild(div1);


function sendDataToServer() {      // send data to server 
    let _name = document.querySelector("#name");
    let _dept = document.querySelector("#dept");
    let _date = document.querySelector("#date");
    let _phone = document.querySelector("#phone");

    // just save into local variables
    let thisMember = new member(_name.value, _dept.value, _date.value, _phone.value);

    // makes request
    const req = {
        name : thisMember.getName(),
        dept : thisMember.getDept(),
        isolated_date : thisMember.getDate(),
        phone : thisMember.getPhone()
    }
 
    fetch("/memData", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req)
    });
    alert('등록되었습니다!');
    
}

function sendDataInLocal () {    // save data in local variables
    let _name = document.querySelector("#name");
    let _dept = document.querySelector("#dept");
    let _date = document.querySelector("#date");
    let _phone = document.querySelector("#phone");
}

function covidInfo() {
    alert("covid information");
}

