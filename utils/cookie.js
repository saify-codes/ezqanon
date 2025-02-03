export function getAllCookies() {
  return document.cookie.split(";").map((cookie) => {
    const [name, value] = cookie.split("=");
    return { name, value };
  });
}
export function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [_name, _value] = cookie.split("=");
    if (_name === name) {
      return _value;
    }
  }

  return null;
}
