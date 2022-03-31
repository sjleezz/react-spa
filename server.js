import express, { response } from 'express';
import path from 'path';
import fs from 'fs';
import {calcInterval} from './calcIntervalTime.js';

const dataBuffer = fs.readFileSync('./public/resource/MOCK_DATA.json');
const dataJSON = dataBuffer.toString();
const mock_json_data = JSON.parse(dataJSON);

const __dirname = path.resolve();
const app = express();

app.listen(3001, function() {
  console.log("start! express server on port 3000");
})

// request 와 response 라는 인자를 줘서 콜백 함수를 만든다.
// localhost:port 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
})

app.get('/test', function(req,res) {
    res.sendFile({ test: "hi"});
  })

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  })

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// 받을 데이터 routing (main) 
app.all("/data_main", function(req, res){
  res.type("application/json");
  res.send(JSON.stringify(checkIsolatedTime(ITEMS)));
});

// 받을 데이터 routing (show detail)
app.all("/data_show", function(req, res){
  res.type("application/json");
  res.send(JSON.stringify(ITEMS));
});

// insert page에서 입력받은 데이터 수신, local array에 저장 
app.post("/memData", (req, res)=>{
  ITEMS.push(req.body);
});

// mock data test용 routing (main)
app.all('/mock_data_main', (req, res) => {
  res.type("application/json");
  res.send(JSON.stringify(checkIsolatedTime(mock_json_data)));
});

// mock data test용 routing (show detail)
app.all('/mock_data_show', (req, res) => {
  res.type("application/json");
  res.send(JSON.stringify(mock_json_data));
});

// local array
let ITEMS = [
  {name: "홍길동",
  dept: "Cloud Platform",
  isolated_date : "2022-03-10",
  phone : "01012345678"
  },
  {name: "김철수",
  dept: "Cloud Solution",
  isolated_date : "2022-03-06",
  phone : "01098765432"
  },
  {name: "이성재",
  dept: "AI Solution",
  isolated_date : "2022-03-11",
  phone : "01097267772"
  },
  {name: "김영희",
  dept: "AI platform",
  isolated_date : "2022-02-28",
  phone : "01088889999"
  },
  {name: "박진수",
  dept: "APP 개발부",
  isolated_date : "2022-03-14",
  phone : "01022223333"
  },
  {name: "권세환",
  dept: "부서 1",
  isolated_date : "2022-03-01",
  phone : "01033334444"
  },
  {name: "표규혁",
  dept: "부서 2",
  isolated_date : "2022-03-02",
  phone : "01044445555"
  },
  {name: "장주미",
  dept: "부서 3",
  isolated_date : "2022-3-14",
  phone : "01055556666"
  },
  {name: "권준욱",
  dept: "부서 4",
  isolated_date : "2022-03-9",
  phone : "01066667777"
  }
];


// 이름 / 자가 격리 여부 / 잔여 기간
function checkIsolatedTime(DATAS) {
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