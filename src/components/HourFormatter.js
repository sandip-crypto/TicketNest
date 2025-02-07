const convertTo12HourFormat = (time24) => {
  if (!time24) return "";
  const [hours24, minutes] = time24.split(":");
  let period = "AM";
  let hours12 = Number.parseInt(hours24);

  if (hours12 >= 12) {
    period = "PM";
    if (hours12 > 12) {
      hours12 -= 12;
    }
  }
  if (hours12 === 0) {
    hours12 = 12;
  }

  return `${hours12}:${minutes} ${period}`;
};

export default convertTo12HourFormat;
