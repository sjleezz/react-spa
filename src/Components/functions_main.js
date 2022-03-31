import React from "react";
import {Link} from 'react-router-dom';

// search 기능
export const filter = () => { 
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

export const addMember = () => {
    // go to insert data page
    return(
        <Link to="/insertData"></Link>
    )
}

export const covidInfo = () => {
    alert("covid information");
}

export const showDetail = (e) => {
    let selectedName = e.target.value;
    // go to show detail page
    return (
        <Link to="/showDetail"></Link>
    )
}

export const notice = () => {
    // notice
}