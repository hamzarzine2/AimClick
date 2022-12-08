/* eslint-disable no-console */

import { getAuthenticatedUser } from "../utils/auths";

const readUsersScore = async () => {
  try {
    const options={
      headers: {
        Authorization: getAuthenticatedUser().token
      }
     }
     
    const response = await fetch(`${process.env.API_BASE_URL}/users/getUsersScore`,options);

    if (!response.ok) {
      throw new Error(`readAllMovies:: fetch error : ${response.status} : ${response.statusText}`);
    }
   
    const usersScore = await response.json();
    return usersScore;
  } catch (err) {
    console.error('readAllMovies::error: ', err);
    throw err;
  }
};


export default readUsersScore;
