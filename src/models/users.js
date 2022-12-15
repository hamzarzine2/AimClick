/* eslint-disable no-unreachable */
/* eslint-disable no-console */

import { getAuthenticatedUser } from '../utils/auths';

async function getUserInfo() {
    const pseudo = getAuthenticatedUser().username;
  
    const options = {
        headers: {
            Authorization: getAuthenticatedUser().token,
        },
    };
  
    const response = await fetch(`${process.env.API_BASE_URL}/users/getUser?pseudo=${pseudo}`, options);
  
    if (!response.ok) {
        throw new Error(`readUsersScore:: fetch error : ${response.status} : ${response.statusText}`);
    }
  
    const userId = await response.json();
    return userId[0];
  
  }

export default getUserInfo;