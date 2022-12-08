/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import $ from "jquery";
import { getRememberMe, setAuthenticatedUser, setRememberMe } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderPageTitle('Login');
  renderRegisterForm(); 
};

function renderRegisterForm() {
  const main = document.querySelector('main');
// eslint-disable-next-line spaced-comment
/***************************************************************************************
*    Author: Nothing4us
*    Availability: https://codepen.io/nothing4us/pen/JjZpBXL
*
************************************************************************************** */
  main.innerHTML=`
  <div class="pen-title">
  
  </div>
  <div class="rerun"><a href="">Reload</a></div>
  <div class="container">
    <div class="card"></div>
    <div class="card">
      <h1 class="title">Login</h1>
      <form>
        <div class="input-container">
          <input type="text" id="usernameLogin" required="required"/>
          <label for="username">Username</label>
          <div class="bar"></div>
        </div>
        <div class="input-container">
          <input type="password" id="passwordLogin" required="required"/>
          <label for="password">Password</label>
          <div class="bar"></div>
        </div>
        <div class="button-container">
          <button id="loginButton"><span>Go</span></button>
        </div>
      </form>
    </div>
    <div class="card alt">
      <div class="toggle"></div>
      <h1 class="title">Register
        <div class="close"></div>
      </h1>
      <form>
        <div class="input-container">
          <input type="username" id="usernameRegister" required="required"/>
          <label for="username">Username</label>
          <div class="bar"></div>
        </div>
        <div class="input-container">
          <input type="password" id="passwordRegister" required="required"/>
          <label for="password">Password</label>
          <div class="bar"></div>
        </div>
        <div class="input-container">
          <input type="password" id="repeatPassword" required="required"/>
          <label for="password">Repeat Password</label>
          <div class="bar"></div>
        </div>
        <div class="button-container">
          <button id="registerButton"><span>Next</span></button>
        </div>
      </form>
    </div>
  </div>
  
  `
  $('.toggle').on('click', () => {
    $('.container').stop().addClass('active');
  });
  
  $('.close').on('click', () => {
    $('.container').stop().removeClass('active');
  });

  const loginButton = document.querySelector("#loginButton");
  const registerButton=document.querySelector("#registerButton")
  loginButton.addEventListener('click',onLogin);
  registerButton.addEventListener('click',onRegister);

}

function onCheckboxClicked(e) {
  setRememberMe(e.target.checked);
}

async function onLogin(e) {
  e.preventDefault();
  const username = document.querySelector('#usernameLogin').value;
  const password = document.querySelector('#passwordLogin').value;


  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/login`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);
  
  Navbar();

  Navigate('/');
}


async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#usernameRegister').value;
  const password = document.querySelector('#passwordRegister').value;
  const passwordRepeat=document.querySelector('#repeatPassword').value;

  if(password !== passwordRepeat){
    console.log('pas bon mdp');
    return;
  }

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/register`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}


export default LoginPage;
