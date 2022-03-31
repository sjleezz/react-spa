import {Link} from 'react-router-dom';
import homeImage from '../resource/home.png';
import infoImage from '../resource/home.png';

export const homeButton = (
    <img id='home' src={homeImage} width="40px" height="40px" onClick={returnHome}></img>
)

export const infoButton = (
    <img id='info' src={infoImage} width="40px" height="40px" onClick={info}></img>
)

function returnHome() {
    return (
        <Link to="/main"></Link>
    )
}

function info() {
    alert("develped by Mediazen AI Solution team");
}