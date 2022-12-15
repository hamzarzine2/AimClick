// eslint-disable-next-line import/newline-after-import
import { clearPage,makeOverflowAuto } from '../../utils/render';
import gif from '../../img/GifJeu.gif';
import custo from '../../img/Customize.png';

const main = document.querySelector('main');
const TutorielPage = () => {
  clearPage();
  makeOverflowAuto();

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div11 = document.createElement("div");
    const div12 = document.createElement("div");
    const div21 = document.createElement("div");
    const div22 = document.createElement("div");

    div1.id = "divTuto";
    div2.id = "divTuto";
    div11.id = "divTuto2";
    div12.id = "divTuto2";
    div21.id = "divTuto2";
    div22.id = "divTuto2";

    const img = document.createElement("img");
    const img1 = document.createElement("img");

    img.setAttribute("src","gif_path");
    img.src = gif;
    img.id = "gif";

    img1.src = custo;
    img1.id = "gif";

    div11.innerHTML = `The rules are simple. You have to click on the circle form several times before the time is up. Each every time you click successfully on the form, this last one change its place so you have to click on it again. 
    For one click on the form you have 5 points. Challenge yourself and increase your reactivity and try to reach as much point as possible.`

    div21.innerHTML = `If you are logged in, you can play ranked games which will be saved in your profile. Or you can simply play Quick game if 
    you don’t want to create an account but those won’t be saved. In Quick game, you can also custom the theme of your game`
    div12.appendChild(img);
    div22.appendChild(img1);
    div1.appendChild(div11);
    div2.appendChild(div21);
    div1.appendChild(div12);
    div2.appendChild(div22);
    main.appendChild(div1);
    main.appendChild(div2);
    
  };



  export default TutorielPage;
