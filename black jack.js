// 
/*
Blackjack
By Scott Chaplinski
3/17/2018
*/

//Card variables
let suits = ["fortune", "ebuka", "daniel", "emeka"];
let values = ["Ace", "King", "Queen", "Jack",
              "Ten", "Nine", "Eight", "Seven",
              "Six", "Five", "Four", "Three", "Two"];

//DOM variables              
let textArea = document.getElementById('p'),
    newGameButton = document.getElementById('g-btn'),
    hitButton = document.getElementById('hit-btn'),
    stayButton = document.getElementById('stay-btn');

//Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];


hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();


newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard()];
  playerCards = [ getNextCard(), getNextCard()];
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  // textArea.style.display =  "none";
  showStatus();
});

hitButton.addEventListener('click', function(){
    playerCards.push(getNextCard());
    // checkForEndOfGame();
    showStatus();
})     

stayButton.addEventListener('click', function(){
  gameOver = true;
  // checkForEndOfGame();
  showStatus();
})

function createDeck() {
  let deck = []; 
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
    let  card = { 
        suit: suits[suitIdx],
        value: values[valueIdx] 
      };
      deck.push( card );
    }
  }
  return deck;
}

function shuffleDeck(deck){
  for (let i = 0; i < deck.length; i++){
    let swapIdx = Math.trunc(Math.random() * deck.length);// i believe strictly that this is what it does; one; it takes the total value of each card which is 52 then times it by math.trunc function which now givesit say 2 or any value since it shuffles. Now, assuming any value given is 1, the value 1 is assigned to variable "temp" having deck[swapIDX](which is our supposed 1 from the multiplication between math.trunc) as its value. 
    let tmp = deck[swapIdx];// really don't fail to check out what deck[swapIDX] does
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card) {
  return card.value + ' of ' + card.suit;
}  


function checkForEndOfGame () {
  updateScores()// we want to make sure that th scores are current

  if (gameOver) // we know that the last value of game over is what we are considering
  {
  while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21)  {
    dealerCards.push(getNextCard());
    updateScores();
    }
  }

  if (playScore > 21) {
    playerWon = false;
    gameOver = true;
  } 
    else if (dealerScore > 21){
      playerWon = true;
      gameOver = true;
    }
}

function getCardNumericValue(stuff) { // why do we use it. 
  switch(stuff.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
     case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }

}

 function getScore(cardArray){
   let score = 0;
   let hasAce = false; // ace adds 10 points to the score. and also an ace can be with one point or ten points
    
   for (let i = 0; i < cardArray.length; i++){
     let card = cardArray[i];
     score += getCardNumericValue(card);// here is a situation where score will increment when score is read
     if (card.value === 'Ace'){//objects is a public one thats why we can get it from the object 
       hasAce = true;
     }
    }
     if (hasAce && score + 10 <= 21){
       return score + 10;
     }
     return score;
   }

function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}


function showStatus() {
  if(!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack';
    return;
  }
  
let dealerCardStrings= '';
for (let i=0; i < dealerCards.length; i++) {
  dealerCardStrings += getCardString(dealerCards[i]) + '\n';
}

updateScores();
let playerCardStrings ='';
for (let i=0; i <  playerCards.length; i++){
  playerCardStrings += getCardString(playerCards[i]) + '\n';
}
  
textArea.innerText= 'Dealer has:\n' + dealerCardStrings + '(score : ' + dealerScore +' )\n\n' +

'Player has:\n'+ playerCardStrings + '(score: '+ playerScore + ') \n\n';

if (gameOver){
  if (playerWon) {
    textArea.innerText += "You win";
  } else {
    textArea.innerText += "Dealer Wins";
  }
   newGameButton.style.display = 'inline';
   hitButton.style.display = 'none';
   stayButton.style.display = 'none';
}
 
  
  for (var i=0; i < deck.length; i++){
    // textArea.innerText += '\n' +
     getCardString(deck[i]);
  } 
}

function getNextCard() {
  return deck.shift();
}

/*
let deck = createDeck();

let playerCards = [ getNextCard(), getNextCard()];

console.log("Welcome to Blackjack!")

console.log("You are dealt: ");
console.log(" " + getCardString(playerCards[0]));
console.log(" " + getCardString(playerCards[1]));


*/

