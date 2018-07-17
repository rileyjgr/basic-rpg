// Js for the game
let player = {
  health: 100,
  power: 15
}

let opponent = {
  health: 300,
  power: 20,
  crit: 5000
}

let score = {
  wins: 0,
  loses: 0
}

let currentGame = {
  game: 0
}

let fire = {
  power: 60
}

let hpPot = {
  heal: 30
}

// player attack
const attack = () => {
  let attkbutton = document.getElementById('attkbutton');
  let restbutton = document.getElementById('restbutton');
  let gameMessage = document.getElementById('game-message');
  let playerAttack = determineAttack(player.power);
  opponent.health -= playerAttack;
  printToScreen();

  setOver();
  // I wanna change this to display damage done.

  document.getElementById('game-message').innerText = "You jumped on their head and did: " + playerAttack + " Damage";
  bufferPeriod();

}

// fire spell (this is getting sloppy tho I should make this better, alot of this is unnessary)
const fireSpell = () => {
  let fireAttack = document.getElementById('fire');
  let boom = determineAttack(fire.power);
  opponent.health -= boom;
  printToScreen();

  document.getElementById('game-message').innerText = "Wow you used a fireball and did: " + boom + " Damage";

  //Not sure why but this isnt working, the text below
  //gameMessage.innerText = "Wow you used a fireball, try getting some skill."
  setOver();
  bufferPeriod();

}

const heal = () => {
  let healSpell = document.getElementById('heal');
  let giveMeHp = hpPot.heal;
  player.health += giveMeHp;
  document.getElementById('game-message').innerText = "You ate a shroom and gained  " + giveMeHp + " health";
  printToScreen();
  bufferPeriod();

}

const endGame = (message) => {
  document.getElementById('game-message').innerText = message;
  document.getElementById('restbutton').hidden = false;
  document.getElementById("attkbutton").disabled = true;
  document.getElementById("heal").disabled = true;
  document.getElementById("fire").disabled = true;
}

const determineAttack = (power) => {
  return Math.floor(Math.random() * power);
}

// I want to get this working
const player1shot = () => {
  let specialNumber = 1;
  let randomNum = Math.floor(Math.random() * 100);
  if (randomNum === specialNumber) {
    return opponentAttack = determineAttack(opponent.crit);
    gameMessage.innerText = "Wow you got hit with a crit!"
  }
}

const isGameOver = (health) => {
  return health <= 0;
}

//Would of liked to get these functions working but couldnt figure it out
//disable the buttons not sure why this isnt working
// const disableAttacks = (health) => {
//      document.getElementById("attkbutton").hidden = true;
//      document.getElementById("heal").hidden = true;
//      document.getElementById("fire").hidden = true;
//      return;
// }
// const enableAttacks = (health) => {
//      document.getElementById("attkbutton").disablede = false;
//      document.getElementById("heal").disabled = false;
//      document.getElementById("fire").disabled = false;
//      return;
// }



// restarts the game
const restart = () => {
  player.health = 100;

  if (score.wins >= 1) {
    opponent.health = 300 + (score.wins * 100);
  }

  if (score.loses > score.wins ) {
    opponent.health = 300 - (100 / score.loses);
  }

  document.getElementById("attkbutton").disabled = false;
  document.getElementById("heal").disabled = false;
  document.getElementById("fire").disabled = false;
  document.getElementById('game-message').innerText = "Use an attack to begin the next game";
  document.getElementById('opp-damage').innerText = "";
  printToScreen();
}

const restCounter = () => {
  let resetButton = document.getElementById('reset-Count');
  document.getElementById("attkbutton").disabled = false;
  document.getElementById("heal").disabled = false;
  document.getElementById("fire").disabled = false;
  player.health = 100;
  opponent.health = 300;
  currentGame.game = 0;
  score.wins = 0;
  score.loses = 0;
  printToScreen();
}

const printToScreen = () => {
  document.getElementById('opponent-health').innerText = opponent.health;
  document.getElementById('player-health').innerText = player.health;
  document.getElementById('game-num').innerText = currentGame.game;
  document.getElementById('win-Counter').innerText = score.wins;
  document.getElementById('lose-Counter').innerText = score.loses;
}


const bufferPeriod = () => {
  setTimeout(() => {
    let opponentAttack = determineAttack(opponent.power);
    player.health -= opponentAttack;
    printToScreen();

    document.getElementById('opp-damage').innerText = "Your Opponent hit you for " + opponentAttack + " Damage";

    if (isGameOver(player.health)){
      endGame("You lost");
      document.getElementById('attkbutton').disable = true;
      score.loses++;
      currentGame.game++;
      return;
    }

  }, 250);
}

const setOver = () => {
  if (isGameOver(opponent.health)){
    endGame("You won!");
    score.wins++;
    currentGame.game++;
    return;
  }
}
