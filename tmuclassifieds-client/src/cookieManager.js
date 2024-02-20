export const setCookie = (name, value, age) => {
  document.cookie = "";
  document.cookie = `${name}=${value};max-age=${age}`;
}

export const getCookie = (name) => {
  let newName = name + "=";
  let cookiesArray = document.cookie.split(";");
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(newName) === 0) {
      return cookie.substring(newName.length, cookie.length);
    }
  }
  return "";
}
