/* eslint-disable consistent-return */
const GAME_TYPE='';

let typeGame;


const getTypeGame  = () => {
    typeGame=localStorage.getItem(GAME_TYPE);

    if(typeGame === undefined)return;

    return typeGame;  
}


const setTypeGame = (game) => { 
    localStorage.setItem(GAME_TYPE,game)
};

const isTypeGame = () => typeGame !== undefined;

const clearTypeGame = () => {
  localStorage.removeItem(GAME_TYPE)
  typeGame = undefined;
};

export {getTypeGame, setTypeGame, isTypeGame, clearTypeGame};