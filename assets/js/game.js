let player = {
  health: 100,
  power: 15
}

let opponent = {
  health: 100,
  power: 15
}

const attack = () => {
  let attkbutton = document.getElementById('attkbutton');
  let gameMessage = document.getElementById('game-message');

  let playerAttack = Math.floor(Math.random() * player.power);
  opponent.health -= playerAttack;
  printToScreen();
  attkbutton.disabled = true;

  gameMessage.innerText = "Opponent is about to attack!"

  setTimeout(() => {
    let opponentAttack = Math.floor(Math.random() * opponent.power);
    player.health -= opponentAttack;
    console.log(opponentAttack);
  }, 1000);

  console.log(playerAttack);

}

const printToScreen = () => {
  document.getElementById('opponent-health').innerText = opponent.health;
  document.getElementById('player-health').innerText = player.health;
}
