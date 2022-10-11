export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user") || "");
  let empty: any;

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  } else {
    return { 'x-access-token': empty };
  }
}