import {Link} from 'react-router-dom';

export const homeButton = (
    <img id='home' src="./resource/home.png" width="40px" height="40px" onClick={returnHome}></img>
)

export const infoButton = (
    <img id='info' src="./resource/info.png" width="40px" height="40px" onClick={info}></img>
)

function returnHome() {
    return (
        <Link to="/main"></Link>
    )
}

function info() {
    alert("develped by Mediazen AI Solution team");
}