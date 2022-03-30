// fetch from DB on async
const getData = (callback) => {
    fetch(arguments[1]).then((res)=> res.json()).then((data)=>callback(data));    
}

export default getData;

