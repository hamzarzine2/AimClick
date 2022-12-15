/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable operator-assignment */
/* eslint-disable no-extra-semi */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable import/named */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { getAuthenticatedUser } from "../../utils/auths";
import { clearPage, makeOverflowAuto } from "../../utils/render";
import profil from "../../img/profil.jpg";
import { readBestUserScore, readAllUserScore } from "../../models/games";
import getUserInfo from "../../models/users";
import { CircularFluidMeter } from 'fluid-meter';

const main = document.querySelector("main");

const UserPage = () => {
    clearPage();
    makeOverflowAuto();
    getUserPage();

};

/**
* function that display the UserPage
*/
async function getUserPage() {
    const user = await getUserInfo();
    const divGamesInfos = document.createElement('div');
    const divBestGames = document.createElement("div");
    const divAllGames = document.createElement("div");
    divBestGames.className = 'card';
    divBestGames.className = "divGames";
    divAllGames.className = 'card';
    divAllGames.className = "divGames2";
    divGamesInfos.id = "containerGamesInfo";

    // Display the user's profil
    await displayUserProfil();

    // Display the 3 best user's games    
    const userBestScore = await readBestUserScore(user.id_user);
    const userBestGames = displayBestUserGames(userBestScore);
    divBestGames.innerHTML = userBestGames;


    divGamesInfos.appendChild(divBestGames);
    divGamesInfos.appendChild(divAllGames);

    main.appendChild(divGamesInfos);

    // Display the previous button and the next button
    displayPreviousOrNextButton();

    // Display the first 3 user's games    
    const userAllScore = await readAllUserScore(user.id_user);
    displayAllUserGames(userAllScore);
    previousOrNextButton(userAllScore);

    // Display the user's circular bar of xp
    xpBar(user);
}

/**
* function that display the user's profil
*/
async function displayUserProfil() {
    const user = await getUserInfo();
    const divUserPage = document.createElement("div");
    divUserPage.className = "divUser";
    divUserPage.innerHTML = `  
            <div class="divProfil2" id="image">
            </div>    
            <div class="divUser2">
                    <div class="divProfil2">    
                            <p> Welcome to your profil <b> ${user.username} </b> </p>
                    </div>   
                    <div id="divNiv">
                            <p> <b><u> Level </u></b>
                            <br> 
                            <span id="divNumber">
                                ${user.level} 
                            </span>
                            </p>    
                    </div>
                    <div id="divXp"> </div>   
            </div>`;
    main.appendChild(divUserPage);
}


/**
* function that call the function for the previous button and for the next button with a click
*/
function previousOrNextButton(userAllScore) {
    let count = 0;
    const beforeButton = document.querySelector('#btnBefore');
    beforeButton.style.display = "none";

    beforeButton.addEventListener('click', () => {
        count -= 3;
        previousPage(userAllScore, count);
    });

    const afterButton = document.querySelector('#btnAfter');
    if (userAllScore.length <= 3) {
        afterButton.style.display = "none";
    }

    afterButton.addEventListener('click', () => {
        count += 3;
        nextPage(userAllScore, count);
    });
}


/**
* function that display the user's circular bar of xp
*/
function xpBar(user) {
    // eslint-disable-next-line no-new
    new CircularFluidMeter(document.querySelector("#divXp"), {
        initialProgress: user.xp,
        backgroundColor: "#fd6186",
        borderWidth: { value: 15 },
    });
}


/**
* function that display the previous button and the next button
*/
function displayPreviousOrNextButton() {
    const divPreviousNext = document.createElement("div");
    divPreviousNext.id = "divPreviousNext"
    divPreviousNext.innerHTML = ` <br> 
            <div id="divPreviousNextButton"  >
                <button type ="submbit" id="btnBefore" class="buttonClass Class btn btn-primary" ><-- Previous </button> 
                <button type ="submbit" id="btnAfter" class="buttonClass Class btn btn-primary" > Next --></button>
            </div>
            `;
    main.appendChild(divPreviousNext);
}


/**
* function that display the previous user's scores with a click
*/
function previousPage(userAllScore, count) {
    hideShowButtonNextPrevious(count, userAllScore);
    let ligne = "";
    ligne = "<br> <div id=\"divLigne\"> <p> All Your Games </p>  </div>  <div id='gridContainer'>";
    if (userAllScore.length > 0) {
        for (let i = count; i < count + 3; i++) {
            let element = userAllScore[i];
            ligne += `
                <div class="gridItem">
                    <p><span>Score :</span> ${element.best_score}</p>
                    <p><span>Xp :</span> ${element.xp}</p> 
                `;
            ligne += '</div>';
        }
    }
    ligne += '</div>';
    const divAllGames = document.querySelector(".divGames2");
    divAllGames.innerHTML = ligne;
}


/**
* function that display the next user's scores with a click
*/
function nextPage(userAllScore, count) {
    hideShowButtonNextPrevious(count, userAllScore);
    let ligne = "";
    ligne = "<br> <div id=\"divLigne\"> <p> All Your Games </p>  </div>  <div id='gridContainer'> ";
    if (userAllScore.length > 0) {
        let valueFor = count + 3;
        if (userAllScore.length - count < 3) {
            valueFor = userAllScore.length
        }
        for (let i = count; i < valueFor; i++) {
            console.log(i);
            let element = userAllScore[i];
            ligne += `
                <div class="gridItem">
                    <p><span>Score :</span> ${element.best_score}</p>
                    <p><span>Xp :</span> ${element.xp}</p> 
                `;
            ligne += '</div>';
        };
    }
    ligne += '</div>';
    const divAllGames = document.querySelector(".divGames2");
    divAllGames.innerHTML = ligne;
}


/**
* function that display the 3 best user's games
*/
function displayBestUserGames(userBestGames) {
    let ligne = "";
    ligne = "<br> <div id=\"divLigne\"> <p> Your Best Games </p> </div> <div id='gridContainer'>";
    if (userBestGames.length > 0) {
        userBestGames.forEach((element) => {
            ligne += `
                  <div class="gridItem">
                      <p><span>Score :</span> ${element.best_score}</p>
                      <p><span>Xp :</span> ${element.xp}</p> 
                    </div>`;
        });
    } else {
        ligne += ' <p class="noUser"> NO USER\'S GAMES FOUND</p> ';
    }
    ligne += '</div>';

    return ligne;
}


/**
* function that display the 3 first user's games
*/
function displayAllUserGames(userAllScore) {
    let ligne = "";
    ligne = "<br> <div id=\"divLigne\"> <p> All Your Games </p>  </div>  <div id='gridContainer'> ";
    if (userAllScore.length > 0) {
        let valueFor = 3;
        if (userAllScore.length < 3) {
            valueFor = userAllScore.length
        }
        for (let i = 0; i < valueFor; i++) {
            let element = userAllScore[i];
            ligne += `
                  <div class="gridItem">
                      <p><span >Score : </span> ${element.best_score} </p>
                      <p><span>Xp : </span> ${element.xp} </p> 
                  `;
            ligne += '</div>';
        };
    } else {
        ligne += ' <p class="noUser"> NO USER\'S GAMES FOUND</p> ';
    }
    ligne += '</div>';
    const divAllGames = document.querySelector(".divGames2");
    divAllGames.innerHTML = ligne;

    return ligne;
}


/**
* function that hide the previous button and the next button
*/
function hideShowButtonNextPrevious(count, userAllScore) {
    const beforeButton = document.querySelector('#btnBefore');
    if (count === 0) {
        beforeButton.style.display = "none";
    } else {
        beforeButton.style.display = "";
    }
    const afterButton = document.querySelector('#btnAfter');
    if (count >= userAllScore.length - 3) {
        afterButton.style.display = "none";
    } else {
        afterButton.style.display = "";
    }
}

export default UserPage;