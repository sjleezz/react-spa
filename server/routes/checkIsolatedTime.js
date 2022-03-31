import calcInterval from './calcIntervalTime.js';

// 이름 / 자가 격리 여부 / 잔여 기간
const checkIsolatedTime = (DATAS) => {
    let ISO_ITEMS = [];
    const ISOLATE_DATE_LIMIT = 7;
    const isoYes = '자가 격리 중';
    const isoNo = '자가 격리 해제';
    
    for(let i = 0 ; i < DATAS.length ; i++) {
      let result = {};
      for (let key in DATAS[i]) {
        if (key === "name") {
          // 이름
          result[key] = DATAS[i][key];
          
        }
        else if (key === "isolated_date") {
          let intervalTime_hour = calcInterval(DATAS, i, key, ISOLATE_DATE_LIMIT);
          let intervalTime_day = Math.round(intervalTime_hour/24);
  
            if (intervalTime_hour < ISOLATE_DATE_LIMIT * 24  && intervalTime_hour > 0) { 
              // 자가 격리 중
              result[isoYes] = intervalTime_day + "일 "+ intervalTime_hour % 24 + "시간";
            }
            else { 
              // 자가 격리 해제
              result[isoNo] = "-";
            }
            
        }
        else if(key === "dept" || key === "phone") {
            // 무시
        }
      }
      ISO_ITEMS.push(result)
    }
    return ISO_ITEMS;
  }

  export default checkIsolatedTime;