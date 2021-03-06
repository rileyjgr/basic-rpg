// Js for the game
// stuff to add
// 1. Health bars
// 2. get crit working

let player = {
  health: 100,
  power: 15,
  lives: 5
}

let opponent = {
  health: 300,
  power: 20,
  crit: 5000000000000000000000000
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
// const player1shot = () => {
//   let randomNum = Math.floor(Math.random() * 2);
//   if (randomNum === 1) {
//     opponentAttack = determineAttack(opponent.crit);
//   } else {
//     let opponentAttack = determineAttack(opponent.power);
//   }
// }

const isGameOver = (health) => {
  return health <= 0;
}

const outOfLives = (lives) => {
  return lives <= 0;
}

// restarts the game
const restart = () => {
  player.health = 100;
  // only if they fail the first level
  opponent.health = 300;

  if (score.wins >= 1) {
    opponent.health = 300 + (score.wins * 100);
    opponent.power = 20 * (score.wins * 1);
  }

  nextLevel();

  document.getElementById("attkbutton").disabled = false;
  document.getElementById("heal").disabled = false;
  document.getElementById("fire").disabled = false;
  document.getElementById('opp-damage').innerText = "";
  printToScreen();
}

// this works but its lazy
const restCounter = () => {
  let resetButton = document.getElementById('reset-Count');
  location.reload();
}

const printToScreen = () => {
  document.getElementById('opponent-health').innerText = opponent.health;
  document.getElementById('player-health').innerText = player.health;
  document.getElementById('game-num').innerText = currentGame.game;
  document.getElementById('win-Counter').innerText = score.wins;
  document.getElementById('lose-Counter').innerText = score.loses;
  document.getElementById('live-Counter').innerText = player.lives;
}

let reTry =() => {
  let tryAgain = document.getElementById('retryLevel');
  console.log(player.lives)
  restart();
}

const bufferPeriod = () => {
  setTimeout(() => {
    // let opponentAttack = determineAttack(opponent.power);

    printToScreen();
    let randomNum = Math.floor(Math.random() * 50);
    if (randomNum === 1) {
          let opponentAttack = determineAttack(opponent.crit);
          player.health -= opponentAttack;
          document.getElementById('opp-damage').innerText = "You got critted for " + opponentAttack + ". You died so fast you missed what happened. Try again";
    } else {
        let opponentAttack = determineAttack(opponent.power);
        player.health -= opponentAttack;
        document.getElementById('opp-damage').innerText = "Your Opponent hit you for " + opponentAttack + " Damage";
    }

    if (isGameOver(player.health)){
      endGame("You lost");
      score.loses++;
      player.lives--;
      currentGame.game++;
      document.getElementById('retryLevel').disabled = false;
      document.getElementById('restbutton').disabled = true;
      document.getElementById('livesLeft').innerText = "You have " + player.lives + " lives left";
    }

    // this calls the function above to check if there are less than or equal to 0 lives remaining for the player. If less than 0 disable all buttons besides restart game
    // But this isnt working
    // debugger;
    if (outOfLives(player.lives)) {

      document.getElementById('game-message').innerText = "You are out of lives. You lost. Restart the game.";
      document.getElementById('retryLevel').disabled = true;
      document.getElementById('restbutton').disabled = true;
    }

  }, 250);
}

const setOver = () => {
  if (isGameOver(opponent.health)){
    endGame("You won!");
    score.wins++;
    currentGame.game++;
    document.getElementById('restbutton').disabled = false;
    document.getElementById('retryLevel').disabled = true;
    return;
  }
}

const nextLevel = () => {
  if(score.wins === 1) {
    document.getElementById("img1").src = "img2";
    document.getElementById("img2").hidden = false;
    document.getElementById("img1").hidden = true;
    document.getElementById('game-message').innerText = "Welcome to Level 2!";
  }

  if(score.wins === 2) {
    document.getElementById("img2").src = "img3";
    document.getElementById("img3").hidden = false;
    document.getElementById("img2").hidden = true;
    document.getElementById('game-message').innerText = "Welcome to Level 3!";
  }

  if(score.wins === 3) {
    document.getElementById("img3").src = "img4";
    document.getElementById("img4").hidden = false;
    document.getElementById("img3").hidden = true;
    document.getElementById('game-message').innerText = "Welcome to Level 4!";
  }

  if(score.wins === 4) {
    document.getElementById("img4").src = "img5";
    document.getElementById("img5").hidden = false;
    document.getElementById("img4").hidden = true;
    document.getElementById('game-message').innerText = "Welcome to Level 5! This is your final Opponent";
  }

  if(score.wins === 5) {
    document.getElementById("attkbutton").disabled = true;
    document.getElementById("heal").disabled = true;
    document.getElementById("fire").disabled = true;
    document.getElementById("restbutton").disabled = true;
    document.getElementById('game-message').innerText = "You beat the game! Nice Job!";
  }

}
