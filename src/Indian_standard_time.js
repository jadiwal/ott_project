var get_india_date=()=>{
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();
    
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    return ISTTime.toISOString();
  }
  export default get_india_date;