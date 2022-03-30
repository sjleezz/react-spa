import React from 'react';
import getData from './fetchData.js';

const DATA_ROUTING = '/data_main';
//const DATA_ROUTING = '/mock_data_main';

const HamburgerMenu = function() {
    return (
      <img className='floating_button' src='./resource/icon_no_stroke_menu_normal.png' onClick={covidInfo}></img>  
    );
}


const MainGate = function() {
    return (
        <h1 id="gate">Covid-19<br></br>Management Page</h1>
    );

} 

const SearchName = function() {
    return (
        <div className='main'>
            <input id='search' typeof='text' placeholder='이름 검색' onKeyUp={filter}></input>    
        </div>
    )
} 

const InsertMember = function() {
    let w = '100px', h = '100px';
    return (
        <div className='insert'>
            <img id='addMem' src='./resource/icon_no_stroke_edit_normal.png' 
            width={w} height={h} onClick={addMember} onMouseOver={notice}></img>
        </div>
    )
} 

const MemberTableRecord = function() {
    const rows = [];
    const mainDataCallBack = (data) => {
        for(let i = 0 ; i < data.length ; i++) {
            for (let key in data[i]) {
                if (key === "name") {
                    rows.push(<td className='name'>{data[i][key]}</td>);
                }
                else {
                    rows.push(<td className='isolated'>{key}</td>);
                    rows.push(<td className='isolated'>{data[i][key]}</td>);
                }
            }

        }
    }
    getData(mainDataCallBack, DATA_ROUTING);

    return (
       <tr className='record' onClick={showDetail}>
           <td>{rows}</td>
       </tr>
    );
}

const MemberTableHeader = function() {
    const rendering = () => {
        let tableHeaderNames = ["이름", "자가 격리 여부", "잔여 격리 기간"];
        let ths = [];
        for (let i=0 ; i<3 ; i++) {
            ths.push(<th key={i}>{tableHeaderNames[i]}</th>);
        }
    }
    return (
        <table id='datas'>
            {rendering()}
        </table>
        
    );
}

const MemberTable = function() {
    const rows = [];
    rows.push(<MemberTableHeader></MemberTableHeader>);
    rows.push(<MemberTableRecord></MemberTableRecord>);
    return (
        <table id='datas'>
            {rows}
        </table>
    );
} 

const Main = function() {
    return (
        <div>
            <MainGate></MainGate>
            <HamburgerMenu></HamburgerMenu>
            <SearchName></SearchName>
            <InsertMember></InsertMember>
            <MemberTable></MemberTable>
        </div>
        
    );
}

export default Main;


// div
div3.setAttribute("class", "bottom");
div4.setAttribute("class", "tail");
let div4_text = document.createTextNode("MediaZen Corporation");
div4.appendChild(div4_text);
div3.appendChild(div4);
body.appendChild(div3);


// search 기능
function filter() { 
    let search, record, name;
    search = document.getElementById("search").value.toUpperCase();
    record = document.getElementsByClassName("record");
    for (let i=0; i<record.length; i++) {
        name = record[i].getElementsByClassName("name");
        if(name[0].innerHTML.toUpperCase().indexOf(search) > -1) {
            record[i].style.display = "table-row";
        }
        else {
            record[i].style.display = "none";
        }
    }
}

function addMember () {
    // go to insert data page
    location.href = "http://localhost:3000/insert";
}

function showDetail (evt) {
    let selectedName = evt.currentTarget.firstChild.innerText;
    // go to show detail page
    location.href = "http://localhost:3000/newShow?selectedName="+selectedName;
}

function notice () {
    // notice
}

function covidInfo() {
    alert("covid information");
}

