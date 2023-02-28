export const getDateDiff = (date_at, today, return_date_if_more_than_days=false) => {
    const time1 = date_at.getTime();
    const time2 = today.getTime();
    const diff = Math.abs(time1 - time2) / 1000,
      second = 1,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7,
      month = day * 30.5,
      year = month * 12;
  
    const time = diff / year > 1
      ? `${Math.floor(diff / year)} year${Math.floor(diff / year) > 1 ? "s" : ""}`
      : diff / month > 1
      ? `${Math.floor(diff / month)} month${Math.floor(diff / month) > 1 ? "s" : ""}`
      : diff / week > 1
      ? `${Math.floor(diff / week)} week${Math.floor(diff / week) > 1 ? "s" : ""}`
      : diff / day > 1
      ? `${Math.floor(diff / day)} day${Math.floor(diff / day) > 1 ? "s" : ""}`
      : diff / hour > 1
      ? `${Math.floor(diff / hour)} hour${Math.floor(diff / hour) > 1 ? "s" : ""}`
      : diff / minute > 1
      ? `${Math.floor(diff / minute)} minute${
          Math.floor(diff / minute) > 1 ? "s" : ""
        }`
      : `${Math.floor(diff / second)} second${
          Math.floor(diff / second) > 1 ? "s" : ""
        }`;
      if(return_date_if_more_than_days){
        if(["week","month","year"].some(e=>time.match(new RegExp(e)))){
          return new Date(date_at).toLocaleString("en-us", {
            dateStyle: "short",
            timeStyle: "short",
            hour12: false
          })
        }
      }
      return time
  };