export const getGroupIcon = (name) => {
  const words = name.split(" ");
  const firstLetter = words[0][0].toUpperCase();

  if (words.length === 1) {
    return firstLetter;
  }

  const lastLetter = words[words.length - 1][0].toUpperCase();
  return firstLetter + lastLetter;
};

export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formattedDate = date.toLocaleDateString("en-GB", {
    timeZone: userTimeZone, 
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    timeZone: userTimeZone, 
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${formattedDate} • ${formattedTime}`;
};