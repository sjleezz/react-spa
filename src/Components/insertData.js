import member from './member.js';
import {homeButton, infoButton} from './navigation.js';
import {DEPARTMENTS} from './CONSTANT_DATAS.js'
import '../css/insert_style.css';
import HamburgerMenuImage from '../resource/icon_no_stroke_menu_normal.png';

const HamburgerMenu = () => {
    return (
      <img className='floating_button' src={HamburgerMenuImage} onClick={covidInfo}></img>  
    );
}

const HomeButton = () => {
    return (
        <img id='home' src='./resource/home.png' width={this.props.width} height={this.props.height}></img>
    )
}

const InfoButton = () => {
    return (
        <img id='info' src='./resource/info.png' width={this.props.width} height={this.props.height}></img>
    )
}

const Navigator = () => {
    return (
        <header>
            <HomeButton width="40px" height="40px"></HomeButton>
            <InfoButton width="40px" height="40px"></InfoButton>
        </header>
    )
}

const LoadEachDeptOption = () => {
    const rows = [];
    let pleaseSelect = "부서를 선택해주세요";
    rows.push(<option>{pleaseSelect}</option>);
    let cnt = 0;
    while (cnt < DEPARTMENTS.length) {
        rows.push(<option>{DEPARTMENTS[cnt]}</option>);
        cnt++;
    }
    return rows;
}

const DeptOptions = () => {
    return (
        <select id='dept' name='department'>
            <LoadEachDeptOption></LoadEachDeptOption>
        </select>
    )
}

const DataForms = () => {
    const rendering = () => {
        const rows = [];
        const label_names = ["이름", "부서", "격리 시작일", "전화 번호"];
        for (let lb in label_names) {
            if(label_names[lb] === "부서") {
                rows.push(
                    <DeptOptions></DeptOptions>
                );
            }
            else {
                switch(label_names[lb]) {
                    case "이름" :
                        rows.push(<label htmlFor='name'>{label_names[lb]}</label>);
                        rows.push(<input type="text" id='name' name='fullname' placeholder="이름을 입력해주세요"></input>);
                        break;
                    case "격리 시작일" :
                        rows.push(<label htmlFor='date'>{label_names[lb]}</label>);
                        rows.push(<input type="date" id='date' name='isolated_date' min="2019-01-01" max="2050-12-31"></input>);
                        break;
                    case "전화 번호" :
                        rows.push(<label htmlFor='phone'>{label_names[lb]}</label>);
                        rows.push(<input type="text" id='phone' name='phone_number' placeholder="전화번호를 입력해주세요"></input>);
                        break; 
                    default :
                        break;
                }
            }
        }
        rows.push(<input type="submit" value="제출"></input>)
        return rows;
    }
    
    return (
        <form>
            {rendering()}
        </form>
    )
}

const FormData = () => {
    return (
        <div className='layout'>
            <div className='contents'>
                <DataForms></DataForms>
            </div>
        </div>
    );
}




const InsertDataPage = function() {
    return (
        <div>
            <HamburgerMenu></HamburgerMenu>
            <Navigator></Navigator>
            <FormData></FormData>
        </div>
    )
}


export default InsertDataPage;


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

