let player = {
  health: 100,
  power: 15
}

let opponent = {
  health: 100,
  power: 15
}

// player attack
const attack = () => {
  let attkbutton = document.getElementById('attkbutton');
  let restbutton = document.getElementById('restbutton');
  let gameMessage = document.getElementById('game-message');

  let playerAttack = determineAttack(player.power);
  opponent.health -= playerAttack;
  printToScreen();

  if (isGameOver(opponent.health)){
    endGame("You won!");
    return;
  }


  gameMessage.innerText = "Opponent is about to attack!"

// opponent attack

  setTimeout(() => {
    let opponentAttack = determineAttack(opponent.power);
    player.health -= opponentAttack;
    printToScreen();

    if (isGameOver(player.health)){
      endGame("You lost");
      return;
    }


  }, 250);

}

const endGame = (message) => {
  document.getElementById('game-message').innerText = message;
  document.getElementById('attkbutton').hidden = true;
  document.getElementById('restbutton').hidden = false;
}

const determineAttack = (power) => {
  return Math.floor(Math.random() * power);
}

const isGameOver = (health) => {
  return health <= 0;
}

const restart = () => {
  player.health = 100;
  opponent.health = 100;
  document.getElementById('game-message').innerText = "";
  document.getElementById('attkbutton').hidden = false;
  document.getElementById('restbutton').hidden = true;
  printToScreen();
}

const printToScreen = () => {
  document.getElementById('opponent-health').innerText = opponent.health;
  document.getElementById('player-health').innerText = player.health;
}
