const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getWeekday : (date : Date) => string = (date : Date) => days[date.getDay()];

export const getMonth : (date : Date) => string = (date : Date) => months[date.getMonth()];

export const formatTime : (hour : number, minutes: number) => string = (hour, minutes) => `${hour-12}:${minutes < 10 ? `${minutes}0` : minutes} ${hour > 12 ? 'PM' : 'AM'}` 
