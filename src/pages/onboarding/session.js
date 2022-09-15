import Cookies from "js-cookie";

export const setSessionCookie = (response) => {
  Cookies.remove("session");
  Cookies.set("session", response.data.data, { expires: 0.2 });
};
