import {localhost} from './ipAddress';
const changeInfo = (token, name, address, phone) =>
  fetch(`http://${localhost}/api/change_info.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({token, name, address, phone}),
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default changeInfo;
