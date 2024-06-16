// TODO: If less than 24 hours
function convertUnixDate(unixDate) {
  let date;
  try {
    date = new Date(unixDate);
  } catch(err) {
    return "Date unknown!";
  }

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export default {convertUnixDate};