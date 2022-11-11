const normalizeDate = (datetime) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec']
  
    const date = new Date(datetime);
    return `${months[date.getMonth()]} ${date.getDay()}`
} 

export default normalizeDate;