
let scores, roundScore, activePlayer, prevDiceRoll, gamePlaying;
 
init();

window.addEventListener("load", function(){
  setTimeout(
      function open(event){
          document.querySelector(".popup").style.display = "block";
      },
      1000
  )
});
document.querySelector("#close").addEventListener("click", function(){
  document.querySelector(".popup").style.display = "none";
});

document.querySelector('.btn-roll').addEventListener('click', function () {

  if (gamePlaying) {

    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
    document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
    
    if(dice1 === 6 && prevDiceRoll === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
  
    } else if (dice1 !== 1 && dice2 !== 1) {
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else { 
        nextPlayer();
    }
 
    prevDiceRoll = dice1;

  }

});

document.querySelector('.btn-bank').addEventListener('click', function () {

  if (gamePlaying) {

    scores[activePlayer] += roundScore;

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    let input = document.getElementById('winningScore').value;
    let winningScore;

    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {

      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice1').style.display = 'none';
      document.getElementById('dice2').style.display = 'none';

      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); 
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      gamePlaying = false;

    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  
  gamePlaying = true;
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
 
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

};