// this is a component that shows time of post

// import needed libraries from date-fns
import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timeStamp }) => {
  // create a variable for the time
  let timeAgo = "";
  // if we have a timestamp date provided (the normal case)
  if (timeStamp) {
    // parse the date
    const date = parseISO(timeStamp);
    // format it to be like (10 min ago,, 2 min ago,, etc)
    const timePeriod = formatDistanceToNow(date);
    // save it in the timeAgo variable
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timeStamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
