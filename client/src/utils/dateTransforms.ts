const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
const months = ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export const getWeekday : (date : Date) => string = (date : Date) => days[date.getDay()];

export const getMonth : (date : Date) => string = (date : Date) => months[date.getMonth()];

export const formatTime : (hour : number, minutes: number) => string = (hour, minutes) => `${hour > 12 ? hour-12 : hour}:${minutes < 10 ? `${minutes}0` : minutes} ${hour > 12 ? 'PM' : 'AM'}` 

export const formatTimeForInput : (hour : number, minutes: number) => string = (hour, minutes) => `${hour > 12 ? hour: '0'+hour}:${minutes < 10 ? `${minutes}0` : minutes}` 
