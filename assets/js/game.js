// Js for the game
let player = {
  health: 100,
  power: 15
}

let opponent = {
  health: 100,
  power: 15,
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
  //document.getElementById('fire').disabled = true;

  opponent.health -= playerAttack;
  printToScreen();

  if (isGameOver(opponent.health)){
    endGame("You won!");
    disableAttacks();
    score.wins++;
    currentGame.game++;
    return;
  }

  // I wanna change this to display damage done.

  gameMessage.innerText = "May RNGjesus be on your side!"

// opponent attack

  setTimeout(() => {
    let opponentAttack = determineAttack(opponent.power);
    player.health -= opponentAttack;
    printToScreen();

    if (isGameOver(player.health)){
      endGame("You lost");
      disableAttacks();
      score.loses++;
      currentGame.game++;
      return;
    }


  }, 250);

}

// fire spell (this is getting sloppy tho I should make this better, alot of this is unnessary)
const fireSpell = () => {
  let fireAttack = document.getElementById('fire');
  let boom = determineAttack(fire.power);
  opponent.health -= boom;
  printToScreen();


  if (isGameOver(opponent.health)){
    endGame("You won!");
    disableAttacks();
    score.wins++;
    currentGame.game++;
    return;
  }

  //Not sure why but this isnt working, the text below
  //gameMessage.innerText = "Wow you used a fireball, try getting some skill."

  setTimeout(() => {
    let opponentAttack = determineAttack(opponent.power);
    player.health -= opponentAttack;
    printToScreen();

    if (isGameOver(player.health)){
      endGame("You lost");
      disableAttacks();
      score.loses++;
      currentGame.game++;
      return;
    }


  }, 250);

}

const heal = () => {
  let healSpell = document.getElementById('heal');
  let giveMeHp = hpPot.heal;
  player.health += giveMeHp;
  printToScreen();

  setTimeout(() => {
    let opponentAttack = determineAttack(opponent.power);
    player.health -= opponentAttack;
    printToScreen();

    if (isGameOver(player.health)){
      endGame("You lost");
      score.loses++;
      currentGame.game++;
      return;
    }


  }, 250);

}

const endGame = (message) => {
  document.getElementById('game-message').innerText = message;
  document.getElementById('restbutton').hidden = false;
}

const determineAttack = (power) => {
  return Math.floor(Math.random() * power);
}

// I want to get this working
const player1shot = (crit) => {
  let specialNumber = 1;
  let randomNum = Math.floor(Math.random() * 100);
  if (randomNum === specialNumber) {
    return opponentAttack = determineAttack(opponent.crit);
    gameMessage.innerText = "Wow you got hit with a crit!"
  }
}

const isGameOver = (health) => {
  disableAttacks();
  return health <= 0;
}

//disable the buttons not sure why this isnt working
const disableAttacks = (health) => {
     document.getElementById("attkbutton").disable = true;
     document.getElementById("heal").disable = true;
     document.getElementById("fire").disable = true;
}


const restart = () => {
  player.health = 100;
  opponent.health = 100;
  document.getElementById('game-message').innerText = "Swing to start the next game!";
  document.getElementById("attkbutton").disable = false;
  document.getElementById("heal").disable = false;
  document.getElementById("fire").disable = false;
  printToScreen();
}


const printToScreen = () => {
  document.getElementById('opponent-health').innerText = opponent.health;
  document.getElementById('player-health').innerText = player.health;
  document.getElementById('game-num').innerText = currentGame.game;
  document.getElementById('win-Counter').innerText = score.wins;
  document.getElementById('lose-Counter').innerText = score.loses;
}
