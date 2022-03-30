import {homeButton, infoButton} from './navigation.js';
import getData from './fetchData.js';

const DATA_ROUTING = '/data_show';
//const DATA_ROUTING = '/mock_data_show';

const ISOLATE_DATE_LIMIT = 7;





const ShowDetail = function() {
    return ;
}



export default ShowDetail;








let body = document.querySelector("body");

// <nav ...>
//  <home button ...>
//  <info button ...>
// </nav>
let nav1 = document.createElement("nav");
nav1.setAttribute("id", "widget");
nav1.appendChild(homeButton);
nav1.appendChild(infoButton);
body.appendChild(nav1);


//  <div1 ...>
//      <div2 ...>
//          <img ...>
//      </div2>
//      <div3 ...></div3>
//      <div4 ...></div4>
//      <div5 ...>
//          <p ...>
//      </div5>
//  </div1>
let div1 = document.createElement('div');
let div2 = document.createElement('div');
let div3 = document.createElement('div');
let div4 = document.createElement('div');
let div5 = document.createElement('div');
div1.setAttribute("class", "card");

div2.setAttribute("class", "card-header");
let img = document.createElement("img");
img.setAttribute("src", "/resource/profile_image_placeholder.png");
img.setAttribute("alt", "Profile Image");
img.setAttribute("class", "profile-img");
div2.appendChild(img);
div1.appendChild(div2);

div3.setAttribute("id", "cBody");
div3.setAttribute("class", "card-body");
div1.appendChild(div3);

div4.setAttribute("class", "social-links");
div1.appendChild(div4);

div5.setAttribute("class", "card-footer");
let p = document.createElement("p");
p.setAttribute("class", "count");
p.innerText = "MediaZen | 자가 격리 인원 정보";
div5.appendChild(p);
div1.appendChild(div5);

body.appendChild(div1);


//  <nav>
//      <img ...>
//      <img ...>
//  </nav>
let nav2 = document.createElement("nav");
let img1 = document.createElement("img");
let img2 = document.createElement("img");
nav2.setAttribute("id", "side");
img1.setAttribute("class", "prev");
img1.setAttribute("src", "../resource/arrow_left.png");
img1.addEventListener("click", prev);
img2.setAttribute("class", "next");
img2.setAttribute("src", "../resource/arrow_right.png");
img2.addEventListener("click", next);
nav2.appendChild(img1);
nav2.appendChild(img2);

body.appendChild(nav2);

// URL에서 parameter (이름) 얻어옴
let hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
let param = {};
let thisName = "";
hashes[0] = hashes[0].split('=');
param[hashes[0][0]] = decodeURIComponent(hashes[0][1]);
thisName = param[hashes[0][0]];

let NAMES = [];
fetch(DATA_ROUTING).then((res)=>res.json()).then((data)=> {
    for (let i=0; i<data.length ; i++) {
        for (let key in data[i]) {
            if(key === 'name') {
                NAMES.push(data[i][key]);
            }
        }
    }
});

function showDetailDataCallBack (data) {
    let card_body = document.querySelector("#cBody");
    for(let i=0; i<data.length; i++) {
        if (data[i]['name'] === thisName) {
            for(let key in data[i]) {
                let val = data[i][key];
                let newTag = document.createElement("p");
                let iso_val = null;
                if (key === "isolated_date") {
                    const today = new Date();
                    const iso_day = new Date(Number(data[i][key].slice(0, 4)), Number(data[i][key].slice(5, 7))-1, Number(data[i][key].slice(8, 10)));
                    const deadline = iso_day.getTime() + ISOLATE_DATE_LIMIT*24*60*60*1000;
                    const intervalTime_msec = deadline - today.getTime();
                    const intervalTime_hour = Math.round(intervalTime_msec/1000/60/60);
                    const intervalTime_day = Math.round(intervalTime_hour/24);
                    if (intervalTime_hour < ISOLATE_DATE_LIMIT * 24  && intervalTime_hour > 0) { 
                        // 자가 격리 중
                        iso_val = intervalTime_day + "일 "+ intervalTime_hour % 24 + "시간";
                        newTag.setAttribute("class", "isIsolated");
                        newTag.setAttribute("style", "color:rgb(214, 122, 127)");
                    }
                    else { 
                        // 자가 격리 해제
                        iso_val = "-";
                        newTag.setAttribute("class", "isIsolated");
                        newTag.setAttribute("style", "color:#00ff00");
                    }
                    let newText = document.createTextNode("잔여 일 : "+ iso_val);
                    newTag.appendChild(newText);
                    let newTag2 = document.createElement("p");
                    let newText2 = document.createTextNode(val + " ~ ");
                    newTag2.setAttribute("class", "date");
                    newTag2.appendChild(newText2);
                    card_body.appendChild(newTag2);

                }
                else {
                    let newText = document.createTextNode(val);
                    newTag.setAttribute("class", key);
                    newTag.appendChild(newText);
                }
                card_body.appendChild(newTag);
            }
            break;
        }
    }
}

getData(showDetailDataCallBack, DATA_ROUTING); 

function prev() {
    // 이전 
    let idx = NAMES.indexOf(thisName);
    if (idx > 0 && idx < NAMES.length) {
        location.href = "http://localhost:3000/newShow?selectedName="+NAMES[idx-1];
    }
}

function next() {
    // 다음
    let idx = NAMES.indexOf(thisName);
    if (idx >= 0 && idx < NAMES.length-1) {
        location.href = "http://localhost:3000/newShow?selectedName="+NAMES[idx+1];
    }
}