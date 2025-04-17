// deposite some money
// dermine the number of lines to bet on
// collect a bet amount 

const prompt = require("prompt-sync")()

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};
  
const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

const deposite = () => {
    while(true){    
        const depositeAmount = prompt("Enter deposite :");
        const number = parseFloat(depositeAmount);

        if(isNaN(number) || number <= 0){
            console.log("Invalid deposit amount, try again");
        }else{
            return number
        }
    }
}

const getNumberOfLines = () => {
    const lines =prompt("Enterc number of line (1-3):");
    
    while(true){
        if(lines <= 0 || lines > 3 || isNaN(lines)){
            console.log("Invalid Try Again")
        }
        else{
            return lines;
        }
    }
}

const betAmount = (balance, lines) => {
    while(true){    
        const depositeBet = prompt("Enter bet per line:");
        const bet = parseFloat(depositeBet);

        if(isNaN(bet) || bet <= 0 || bet * lines > balance ){
            console.log("Invalid bet amount, try again");
        }else{
            return bet
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = []
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}

const transpose = (reels) => {
    const rows = [];
  
    for (let i = 0; i < ROWS; i++) {
      rows.push([]);
      for (let j = 0; j < COLS; j++) {
        rows[i].push(reels[j][i]);
      }
    }
  
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
      let rowString = "";
      for (const [i, symbol] of row.entries()) {
        rowString += symbol;
        if (i != row.length - 1) {
          rowString += " | ";
        }
      }
      console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let row = 0; row < lines; row++) {
      const symbols = rows[row];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += bet * SYMBOL_VALUES[symbols[0]];
      }
    }
  
    return winnings;
  };
  
  const game = () => {
    let balance = deposite();
  
    while (true) {
      console.log("You have a balance of $" + balance);
      const numberOfLines = getNumberOfLines();
      const bet = betAmount(balance, numberOfLines);
      balance -= bet * numberOfLines;
      const reels = spin();
      const rows = transpose(reels);
      printRows(rows);
      const winnings = getWinnings(rows, bet, numberOfLines);
      balance += winnings;
      console.log("You won, $" + winnings.toString());
  
      if (balance <= 0) {
        console.log("You ran out of money!");
        break;
      }
  
      const playAgain = prompt("Do you want to play again (y/n)? ");
  
      if (playAgain != "y") break;
    }
  };
  
  game();