import {Link} from 'react-router-dom';
import {homeButton, infoButton} from './navigation.js';
import getData from './fetchData.js';
import calcInterval from './calcIntervalTime.js';
import placeholderImage from '../resource/profile_image_placeholder.png';
import prevImage from '../resource/arrow_left.png';
import nextImage from '../resource/arrow_right.png';

const DATA_ROUTING = '/data_show';
//const DATA_ROUTING = '/mock_data_show';

const ISOLATE_DATE_LIMIT = 7;
const thisName = "임시 이름";

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

const GateSection = () => {

    return (
        <nav id='widget'>
            {homeButton}
            {infoButton}
        </nav>
    )
}

const pTagSection = () => {
    const rendering = () => {
        const pTags = [];
        // call back function
        const showDetailDataCallBack = (data) => {
            for(let i=0; i<data.length; i++) {
                if (data[i]['name'] === thisName) {
                    for(let key in data[i]) {
                        const val = data[i][key];
                        const iso_val = null;
                        if (key === "isolated_date") {
                            const intervalTime_hour = calcInterval();
                            const intervalTime_day = Math.round(intervalTime_hour/24);
                            const isoStyle = "";
                            if (intervalTime_hour < ISOLATE_DATE_LIMIT * 24  && intervalTime_hour > 0) { 
                                // 자가 격리 중
                                iso_val = intervalTime_day + "일 "+ intervalTime_hour % 24 + "시간";
                                isoStyle = "color:rgb(214, 122, 127)";
                            }
                            else { 
                                // 자가 격리 해제
                                iso_val = "-";
                                isoStyle = "color:#00ff00";
                            }
                            const isoText = "잔여 일 : "+ iso_val;
                            const dateText = val + " ~ ";
                            pTags.push(<p className='isIsolated' style={isoText}>{}</p>);
                            pTags.push(<p className='date' style={dateText}>{}</p>);
        
                        }
                        else {
                            pTags.push(<p className={key}>{val}</p>);
                        }
                    }
                    break;
                }
            }
        }
        getData(showDetailDataCallBack, DATA_ROUTING); 
        return pTags;
    }
    
    

    return (
        {rendering}
    )
}

const CardSection = () => {
    const rendering = () => {
        const rows = [];
        const pTag = [];
        rows.push(
            <div className='card-header'>
                <img className='profile-img' src={placeholderImage} alt="Profile Image"></img>
            </div>
        );
        

        

        rows.push(
            <div id='cBody' className='card-body'>
                
            </div>
        );  

        rows.push(

            );

        return rows;
    }
    return {rendering};
}

const SideSection = () => {
    return (
        <nav id='side'>
            <img className='prev' src={prevImage} onClick={prev}></img>
            <img className='next' src={nextImage} onClick={next}></img>
        </nav>
    )
}

const MainSection = () => {
    return (
        <div className='card'>
            <CardSection></CardSection>
            <SideSection></SideSection>
        </div>
    )
}


const ShowDetailPage = () => {
    return (
        <div>
            <GateSection></GateSection>
            <MainSection></MainSection>
        </div>
    )
}

export default ShowDetailPage;





function prev() {
    // 이전 
    let idx = NAMES.indexOf(thisName);
    if (idx > 0 && idx < NAMES.length) {
        <Link to={
            {
                pathname : "/showDetail",
                state : {
                    selectedName : NAMES[idx-1]
                }
            }
        }></Link>
    }
}

function next() {
    // 다음
    let idx = NAMES.indexOf(thisName);
    if (idx >= 0 && idx < NAMES.length-1) {
        <Link to={
            {
                pathname : "/showDetail",
                state : {
                    selectedName : NAMES[idx+1]
                }
            }
        }></Link>
    }
}