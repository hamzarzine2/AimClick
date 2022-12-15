import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import LoginRegisterPage from '../Pages/LoginRegisterPage';
import { GamePage } from '../Pages/GamePage';
import TutorielPage from '../Pages/TutorielPage';
import FriendPage from '../Pages/FriendPage';
import UserPage from '../Pages/UserPage';

const routes = {
  '/': HomePage,
  '/login': LoginRegisterPage,
  '/register': LoginRegisterPage,
  '/logout': Logout,
  '/game': GamePage,
  '/tutoriel': TutorielPage,
  '/friend': FriendPage,
  '/user': UserPage,
};

export default routes;
