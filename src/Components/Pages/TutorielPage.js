// eslint-disable-next-line import/newline-after-import
import { clearPage } from '../../utils/render';
const main = document.querySelector('main');

const TutorielPage = () => {
  clearPage();

  main.innerHTML += `
  <div id="ex1" class="modal">
  <p>Thanks for clicking. That felt good.</p>
  <a href="#" rel="modal:close">Close</a>
</div>

<!-- Link to open the modal -->
<p><a href="#ex1" rel="modal:open">Open Modal</a></p>

    <h1> Tutoriel </h1>
    <div id="divTutorial"> The rules are simple. You have to click on the black form several times before the time is up. Each every time you click successfully on the form, this last one change its place so you have to click on it again. 
    For one click on the form you have 5 points. Challenge yourself and increase your reactivity and try to reach as much point as possible. </div>

    <div id="divTutorial">If you are logged in, you can play ranked games which will be saved in your profile. Or you can simply play Quick game if you don’t want to create an account but those won’t be saved.</div>`;
};

export default TutorielPage;
