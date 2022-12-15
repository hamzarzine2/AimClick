/* eslint-disable no-console */
import { clearPage,makeOverflowAuto } from '../../utils/render';
import { getAuthenticatedUser } from '../../utils/auths';

const main = document.querySelector('main');
let user = null;

const FriendPage = () => {
  clearPage();
  makeOverflowAuto()
  displaySearch();
  user = getAuthenticatedUser();
};

/*
**function that display the search option and add the event listener to display all friend and searched user
*/
function displaySearch() {
  const userDiv = document.createElement('div');
  userDiv.id = 'divUsers';
  const searchDiv = document.createElement('div');
  searchDiv.id = 'searchDiv';
  searchDiv.innerHTML = `
    <input type="search" id="searchInput" class="form-control rounded search" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
    <br>
    <div id="friendButton">
        <button type="button" id="searchSubmit" class="btn btn-outline-primary buttonClass">search</button>
        <button type="button" id="friendAll" class="btn btn-outline-primary buttonClass">your friends</button>
    </div>
    `;
  main.appendChild(searchDiv);
  main.appendChild(userDiv);
  userDiv.style.display = 'none';
  const buttonSearch = document.querySelector('#searchSubmit');
  buttonSearch.addEventListener('click', displayUser);
  const buttonFriends = document.querySelector('#friendAll');
  buttonFriends.addEventListener('click', displayFriend);
}

/*
**on search click
**function that search users from the input
**return an array of found users
*/
async function search() {
  const input = document.querySelector('#searchInput').value;

  const options = {
    headers: {
      Authorization: user.token,
    },
  };

  const response = await fetch(
    `${process.env.API_BASE_URL}/users/getUser?pseudo=${input}`,
    options,
  );
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const users = await response.json();
  console.log("ppppppppppppppppppppppppppppp",users.level);
  return users;
}

/*
**function that display the found users in the search method
*/
async function displayUser() {
  const users = await search();
  await userAsDiv(users);
}

/*
**function that display all the user friends
*/
async function displayFriend() {
  const friend = await getUserFriends();
  await userAsDiv(friend);
}

/*
**display users as a div 
*/
async function userAsDiv(users) {
  const divUsers = document.querySelector('#divUsers');
  divUsers.style.display = '';

  let ligne = "<h1 class ='searchTitle'>USER</h1><br> <div id='gridContainer'>";
  const userFriends = await getUserFriends();
  if (users.length > 0) {
    users.forEach((element) => {
      ligne += `
          <div class="gridItem">
              <p><span>Name : </span> ${element.username}</p>
              <p><span>Level :</span> ${element.level}</p> 
              <p><span>Xp : </span>${element.xp}</p>
          `;

      if (!userFriends.some((e) => e.id_user === element.id_user) && element.id_user !== user.id) {
        ligne += `
              <button type="submit" id="addSubmit" class="buttonClass Class btn btn-primary" data-id="${element.id_user}" >Add as friend</button>
              `;
      }
      ligne += '</div>';
    });
  } else {
    ligne += ' <p class="noUser"> NO USER FOUND </p> ';
  }
  ligne += '</div>';

  divUsers.innerHTML = ligne;

  const allButton = document.querySelectorAll('#addSubmit');
  allButton.forEach((element) => {
    element.addEventListener('click', addFriend);
  });
}

/*
**function that add an user as a friend an display all user friends as response 
*/
async function addFriend(e) {
  e.preventDefault();

  const { id } = e.target.dataset;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      user1: user.id,
      user2: id,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: user.token,
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/addFriend`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  await response.json();
  displayFriend();
}

/*
**function that get all the users friends
** return an array of users
*/
async function getUserFriends() {
  const options = {
    headers: {
      Authorization: user.token,
    },
  };

  const response = await fetch(
    `${process.env.API_BASE_URL}/users/getUserFriends?id=${user.id}`,
    options,
  );
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const userFriends = await response.json();
  return userFriends;
}

export default FriendPage;
