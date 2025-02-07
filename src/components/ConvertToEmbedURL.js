const convertToEmbedURL = (url) => {
  const urlObj = new URL(url);
  if (urlObj.hostname === "www.youtube.com" && urlObj.searchParams.get("v")) {
    return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
  } else if (urlObj.hostname === "youtu.be") {
    return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
  }
  return url;
};

export default convertToEmbedURL;
