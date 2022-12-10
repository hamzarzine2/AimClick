/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { getAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import profil from '../../img/profil.jpg';

const UserPage = () => {
  clearPage();
  getUserPage();
};

function getUserPage() {
  const main = document.querySelector('main');
  const divUserPage = document.createElement('div');
  const user = getAuthenticatedUser();
  divUserPage.className = 'divUser';
  // https://www.synonyme-du-mot.com/les-articles/comment-mettre-deux-div-cote-a-cote
  // https://youtu.be/0SktamdLLAQ
  divUserPage.innerHTML = `
        <div>
            <div class="divProfil">
                <img src="${profil}" />
            </div>
          
        </div>

        <div>
            <div class="divProfil2">    
                <p> Bienvenue sur votre profil ${user.username} </p>
            </div>
            <div class="divProfil">
                <p> Niveau : 13 </p>   
            </div>
            <div class="divProfil">
                <p> 16/25 xp </p>   
            </div>
        </div>

        `;

  main.appendChild(divUserPage);
}

export default UserPage;
