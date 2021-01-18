import {localhost} from './ipAddress';
const signIn = (email, password) =>
  fetch(`http://${localhost}/api/login.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
module.exports = signIn;
