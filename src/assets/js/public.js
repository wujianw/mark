export const getBeforeDate = n => {
    let d = new Date(),
        year = d.getFullYear(),
        mon = d.getMonth()+1,
        day = d.getDate()
    if(day <= n){
        if(mon > 1) {
            mon = mon-1
        }
        else {
            year = year-1;
            mon = 12;
        }
    }
    d.setDate(d.getDate()-n)
    year = d.getFullYear()
    mon=d.getMonth()+1
    day=d.getDate()
    let s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day)
    return s;
}
