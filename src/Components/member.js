export default class member {
    constructor(_name, _dept, _date, _phone) {
        this.name = _name;
        this.dept = _dept;
        this.date = _date;
        this.phone = _phone;
    } 
    getName() {return this.name}
    getDept() {return this.dept}
    getDate() {return this.date}
    getPhone() {return this.phone}
}; 

