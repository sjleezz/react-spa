import express from 'express';
import path from 'path';
//import fs from 'fs';
import ITEMS from '../ITEMS.js';

const router = express.Router();
const __dirname = path.resolve();
const indexHtml = path.resolve(__dirname, '../../build/index.html');


router.get('*', (req, res) => {
    res.send(indexHtml);
});

export default router; // ES6 문법. commonJS 문법은 module.exports = router; 였다.

// 받을 데이터 routing (main) 
// main에 원시 데이터를 모두 보내고, showDetail 등에 보낼 때에는 프론트 단에서 데이터를 가공(checkIsolatedTime.js)하여 보내는 방식으로 한다.
// app.all("/data_main", function(req, res){
//   res.type("application/json");
//   res.send(JSON.stringify(ITEMS));
// });

// // insert page에서 입력받은 데이터 수신, local array에 저장 
// app.post("/memData", (req, res)=>{
//   ITEMS.push(req.body);
// });


//const dataBuffer = fs.readFileSync('./public/resource/MOCK_DATA.json');
//const dataJSON = dataBuffer.toString();
//const mock_json_data = JSON.parse(dataJSON);

// // mock data test용 routing (main)
// app.all('/mock_data_main', (req, res) => {
//   res.type("application/json");
//   res.send(JSON.stringify(checkIsolatedTime(mock_json_data)));
// });

// // mock data test용 routing (show detail)
// app.all('/mock_data_show', (req, res) => {
//   res.type("application/json");
//   res.send(JSON.stringify(mock_json_data));
// });


