const calcInterval = (DATAS, i, key, ISOLATE_DATE_LIMIT) => {
    const today = new Date();
    let date = DATAS[i][key].split('-');
    const iso_day = new Date(Number(date[0]), Number(date[1])-1, Number(date[2]));
    const deadline = iso_day.getTime() + ISOLATE_DATE_LIMIT*24*60*60*1000;
    const intervalTime_msec = deadline - today.getTime();
    const intervalTime_hour = Math.round(intervalTime_msec/1000/60/60);
    const intervalTime_day = Math.round(intervalTime_hour/24);
    
    return intervalTime_hour;
}

export default calcInterval;
