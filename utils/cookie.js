export function getAllCookies() {
  return document.cookie.split(";").map((cookie) => {
    const [name, value] = cookie.split("=");
    return { name, value };
  });
}
export function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [_name, _value] = cookie.split("=").map(pair => pair.trim());
    if (_name === name) {
      return _value;
    }
  }

  return null;
}
export function setCookie(name, value, expiry){
  document.cookie = `${name}=${value}; ${expiry? "expires=" + new Date(expiry).toUTCString() : ''}`
}
export function deleteCookie(name){
  document.cookie = `${name}=; max-age=-1`
}
