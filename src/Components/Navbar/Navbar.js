// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import Navigate from '../Router/Navigate';

const SITE_NAME = 'aimClicker';

const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {
const authenticatedUser = getAuthenticatedUser();

const anonymousUserNavbar = `
<nav class="navbar navbar-expand-lg navbar-light  navbar-custom">
      <div class="container-fluid navbar-custom" id="navbar">
        <div id="logo">
        <a class="navbar-brand " href="/" id = "logo" >${SITE_NAME}</a>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/" data-uri="/">Home</a>
            </li>      
            <li id="loginItem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/login">Login/Register</a>
            </li>    
          </ul>
        </div>
      </div>
    </nav>
`;

  const authenticatedUserNavbar = `
<nav class="navbar navbar-expand-lg navbar-light navbar-custom">
      <div class="container-fluid navbar-custom">
        <a class="navbar-brand" href="/" id="logo" >${SITE_NAME}</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
            </li>
            <li id="test" class="nav-item">
              <a class="nav-link" href="#" data-uri="/friend">Friend</a>
            </li>              
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/logout">Logout</a>
            </li>    
            <li class="nav-item">
              <a class="nav-link disabled" href="#">${authenticatedUser?.username}</a>
            </li>           
          </ul>
        </div>
      </div>
    </nav>
`;

  const navbar = document.querySelector('#navbarWrapper');

  navbar.innerHTML = isAuthenticated() ? authenticatedUserNavbar : anonymousUserNavbar;

  const logo = document.querySelector('#logo');
  logo.addEventListener('click',redirectHome)
}


function redirectHome(){
  Navigate("/");
}

export default Navbar;
