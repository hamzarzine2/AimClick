/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import $ from 'jquery';
import {  setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import {addModal,showLoad} from '../Popup/LoadingPopUp';

const LoginPage = () => {
  clearPage();
  renderPageTitle('Login');
  addModal();
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
  main.innerHTML += `
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
        <div class ="errorDiv" id="errorLogin">
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
        <div class ="errorDiv input-container" id="errorRegister">
        </div>
        <div class="button-container">
          <button id="registerButton"><span>Next</span></button>
        </div>
      </form>
    </div>
  </div>
  
  `;
  $('.toggle').on('click', () => {
    $('.container').stop().addClass('active');
  });

  $('.close').on('click', () => {
    $('.container').stop().removeClass('active');
  });

  const loginButton = document.querySelector('#loginButton');
  const registerButton = document.querySelector('#registerButton');
  loginButton.addEventListener('click', onLogin);
  registerButton.addEventListener('click', onRegister);
}



async function onLogin(e) {
  e.preventDefault();
  const errorDiv=document.querySelector("#errorLogin");
  const loginButton = document.querySelector('#loginButton');
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
  loginButton.innerHTML="<span>LOADING...</span>"
  const response = await fetch(`${process.env.API_BASE_URL}/users/login`, options);
  errorDiv.style.display="";

  if (!response.ok) {
    errorDiv.innerHTML="<p>password or username wrong</p>"
    loginButton.innerHTML='<span>Go</span>'
    return;
  }

  const authenticatedUser = await response.json();

  errorDiv.style.display="none";
  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}

async function onRegister(e) {
  e.preventDefault();
  const errorDiv=document.querySelector("#errorRegister");
  const registerButton = document.querySelector('#registerButton');

  const username = document.querySelector('#usernameRegister').value;
  const password = document.querySelector('#passwordRegister').value;
  const passwordRepeat = document.querySelector('#repeatPassword').value;

  if (password.length<8) {
    errorDiv.innerHTML='<p>Your Password should be at least 8 characters</p>'
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

  registerButton.innerHTML="<span>LOADING...</span>"

  const response = await fetch(`${process.env.API_BASE_URL}/users/register`, options);

  if (password !== passwordRepeat) {
    errorDiv.innerHTML='<p>Password wrong</p>'
    registerButton.innerHTML="<span>GO</span>"
    return;
  }
  if (!response.ok) {
    errorDiv.innerHTML='<p>Username already in use</p>'
    registerButton.innerHTML="<span>GO</span>"
    return;
  }
  
  const authenticatedUser = await response.json();

  errorDiv.style.display="none";

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}

export default LoginPage;
