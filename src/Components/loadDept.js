import {DEPARTMENTS} from './CONSTANT_DATAS.js'

export default function(select) {
    let cnt = 0;
    while (cnt < DEPARTMENTS.length) {
        let newOption = document.createElement("option");
        let newText = document.createTextNode(DEPARTMENTS[cnt]);
        newOption.appendChild(newText); // <option> ~~ </option>
        select.appendChild(newOption);
        cnt++;
        
    }
}

