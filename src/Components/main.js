import React from 'react';
import getData from './fetchData.js';
import '../css/main_style.css';
import {filter, addMember, covidInfo, showDetail, notice} from './functions_main.js';
import HamburgerMenuImage from '../resource/icon_no_stroke_menu_normal.png';
import insertDataImage from '../resource/icon_no_stroke_edit_normal.png';



const HamburgerMenu = () => {
    return (
      <img className='floating_button' src={HamburgerMenuImage} onClick={covidInfo}></img>  
    );
}


const MainGate = () => {
    return (
        <h1 id="gate">Covid-19<br></br>Management Page</h1>
    );

} 

const SearchName = () => {
    return (
        <div className='main'>
            <input id='search' type='text' placeholder='이름 검색' onKeyUp={filter}></input>    
        </div>
    )
} 

const InsertMember = (props) => {
    let w = '100px', h = '100px';
    return (
        <div className='insert'>
            <img id='addMem' src={insertDataImage} 
            width={props.width} height={props.height} onClick={addMember} onMouseOver={notice}></img>
        </div>
    )
} 

const BottomLabel = () => {
    const bottomName = "Mediazen Corporation";
    return (
        <div className='bottom'>
            <div className='tail'>{bottomName}</div>
        </div>
    )
}

const MemberTableRecord = () => {
    const DATA_ROUTING = '/data_main';
    //const DATA_ROUTING = '/mock_data_main';   
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
        return ths;
    }
    return (
        <tr>
        {rendering()}
        </tr>
    );
}

const MemberTable = function() {
    return (
        <table id='datas'>
            <thead>
                <MemberTableHeader></MemberTableHeader>
            </thead>
            <tbody>
                <MemberTableRecord></MemberTableRecord>
            </tbody>
        </table>
    );
} 

const MainPage = () => {
    return (
        <div>
            <MainGate></MainGate>
            <HamburgerMenu></HamburgerMenu>
            <SearchName></SearchName>
            <InsertMember width="100px" height="100px"></InsertMember>
            <MemberTable></MemberTable>
            <BottomLabel></BottomLabel>
        </div>
        
    );
}

export default MainPage;