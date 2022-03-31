// fetch from DB on async
const getData = (callback, src) => {
    fetch(src).then((res)=> res.json()).then((data)=>callback(data));    
}

export default getData;

