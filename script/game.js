// ==================================================================================================================================================
// KONSTANTER ---------------------------------------------------------------------------------------------------------------------------------------

const rows = 4;
const columns = 4;

// ==================================================================================================================================================
// ARRAYER ------------------------------------------------------------------------------------------------------------------------------------------

board = []; // En 2D array med rader och kolumner

// ==================================================================================================================================================
// FUNKTIONER ---------------------------------------------------------------------------------------------------------------------------------------

function colorTile(tile, number) { // Funktionen färgar brickan
  if (page.theme === 'light') { // Om temat är ljus
    const backgroundLightness = 100 - Math.log2(number) * 10 + 10; // Sätter "backgroundLightness" till 100 - log2 av "number" * 10 + 10
    tile.style.setProperty('--tile-background-lightness', `${backgroundLightness}%`) // Sätter bakgrundsfärgen till "backgroundLightness"
    tile.style.setProperty('--tile-text-lightness', `${backgroundLightness <= 50 ? 90 : 10}%`) // Sätter textfärgen till 90 om "backgroundLightness" är mindre eller lika med 50 annars 10
  }
  else /*(page.theme === 'dark')*/ { // Annars om temat är mörkt
    const backgroundLightness = Math.log2(number) * 10 - 10; // Sätter "backgroundLightness" till log2 av "number" * 10 - 10
    tile.style.setProperty('--tile-background-lightness', `${backgroundLightness}%`) // Sätter bakgrundsfärgen till "backgroundLightness"
    tile.style.setProperty('--tile-text-lightness', `${backgroundLightness <= 50 ? 90 : 10}%`) // Sätter textfärgen till 90 om "backgroundLightness" är mindre eller lika med 50 annars 10
  }
}

function valueToColor(tile, number) {
  if (number > 0) { // Om brickans värde är större än 0
    tile.innerText = String(number); // Sätter brickans värde till "number"
    colorTile(tile, number); // Färgar brickan
  }
  else {
    if (page.theme === 'light') // Om temat är ljus
      tile.style.setProperty('--tile-background-lightness', '70%'); // Sätter brickans initial bakgrundsfärg till 30%
    else /*(page.theme === 'dark')*/ // Annars om temat är mörkt
    tile.style.setProperty('--tile-background-lightness', '30%'); // Sätter brickans initial bakgrundsfärg till 70%
  }
}

function updateColor() {
  for (let r = 0; r < rows;) { // För varje rad
    for (let c = 0; c < columns;) { // För varje kolumn
      let tile = document.getElementById(String(r) + ', ' + String(c)); // Hämtar brickan med koordinaterna "r, c"
      let number = board[r][c]; // Sätter "number" till värdet i arrayen
      valueToColor(tile, number); // Färgar brickan
      c+=1; // Ökar kolumnen med 1
    }
    r+=1; // Ökar raden med 1
  }
}

// ==================================================================================================================================================

function occupiedTile() { // Funktionen kollar om det finns en bricka med värdet 0
  let count = 0; // Sätter "count" till 0
  for (let r = 0; r < rows;) { // För varje rad
    for (let c = 0; c < columns;) { // För varje kolumn
      if (board[r][c] === 0) { // Om något värde i arrayen är 0
        return false; // Returnerar false
      }
      c+=1; // Ökar kolumnen med 1
    }
    r+=1; // Ökar raden med 1
  }
  return true; // Returnerar true
}

function spawnNewTile() { // Funktionen skapar en ny bricka
  if (occupiedTile()) { // Om det inte finns en bricka med värdet 0
    return; // Avslutar funktionen
  }
  let found = false; // Sätter "found" till false
  while (!found) { // Så länge "found" är false
    let r = Math.floor(Math.random() * rows); // Sätter "r" till ett slumpmässigt tal mellan 0 och antalet rader
    let c = Math.floor(Math.random() * columns); // Sätter "c" till ett slumpmässigt tal mellan 0 och antalet kolumner
    if (board[r][c] === 0) { // Om värdet i arrayen är 0
      board[r][c] = Math.random() > 0.5 ? 2 : 4; // Sätter värdet till 2 eller 4
      let tile = document.getElementById(String(r) + ', ' + String(c)); // Hämtar brickan med koordinaterna "r, c"
      tile.innerText = String(board[r][c]); // Sätter brickans värde till "board[r][c]"
      colorTile(tile, tile.innerText); // Färgar brickan
      found = true; // Sätter "found" till true
    }
  }
}

// ==================================================================================================================================================

function updateTile(tile, number) { // Funktionen uppdaterar brickan
  tile.innerText = ''; // Tar bort brickans värde
  tile.classList.value = ''; // Tar bort brickans klasser
  tile.classList.add('tile'); // Lägger till klassen "tile" igen
  valueToColor(tile, number); // Färgar brickan
}

function createBoard() { // Funktionen skapar spelplanen
  for (let r = 0; r < rows;) { // För varje rad
    board.push([]); // Lägg till en tom array i arrayen "board"
    for (let c = 0; c < columns;) { // För varje kolumn
      board[r].push(0); // Lägg till en "0:a" i arrayen "board"
      c+=1; // Ökar kolumnen med 1
    }
    r+=1; // Ökar raden med 1
  }
}

function setGame() { // Funktionen skapar spelplanen
  createBoard(); // Skapar spelplanen
  for (let r = 0; r < rows;) { // För varje rad
    for (let c = 0; c < columns;) { // För varje kolumn
      let tile = document.createElement('div'); // Skapar en html "div" tagg
      tile.id = String(r) + ', ' + String(c); // Sätter id till dess koordinater "r, c"
      let number = board[r][c]; // Sätter "number" till värdet i arrayen
      updateTile(tile, number); // Uppdaterar brickan
      document.getElementById('game-board').append(tile); // Lägger till en "tile" i html "game-board"
      c+=1; // Ökar kolumnen med 1
    }
    r+=1; // Ökar raden med 1
  }
  spawnNewTile(); // Skapar en initial "2:a" eller "4:a" på spelplanen
  spawnNewTile(); // Skapar en initial "2:a" eller "4:a" på spelplanen
}

// ==================================================================================================================================================

function addZeros(row){ // Funktionen lägger till "0:or" längst bak i arrayen
  while (row.length < columns) { // Om arrayen har färre värden än antal kolumner
    row.push(0); // Lägger till en "0:a" i slutet av arrayen
  }
  return row; // Returnerar arrayen
}

function removeZeros(row){ // Funktionen tar bort alla "0:or" i arrayen
  return row.filter(number => number != 0); // Skapar en ny array utan alla "0:or"
}

function updateZeros(row){ // Funktionen uppdaterar alla "0:or" i arrayen
  removeZeros(row); // Tar bort alla "0:or" i arrayen
  addZeros(row); // Lägger till "0:or" i slutet av arrayen
  return row; // Returnerar arrayen
}

// ==================================================================================================================================================

function leftArrange(row) { // Funktionen skjuter alla värden till vänster i arrayen
  row = removeZeros(row); // Tar bort alla "0:or" i arrayen
  for (let i = 0; i < row.length-1;){ // För varje värde i uppdaterade arrayen
    if (row[i] === row[i+1]) { // Om vänstra värdet är lika med högra värdet
      row[i] *= 2; // Multiplicerar vänstra värdet med 2
      row[i+1] = 0; // Sätter högra värdet till 0
      score += row[i]; // Lägger till vänstra värdet till "score"
    }
    i+=1; // Ökar i med 1
  }
  row = updateZeros(row); // Uppdaterar alla "0:or" i arrayen
  return row; // Returnerar arrayen
}

function rightArrange(row) { // Funktionen skjuter alla värden till höger i arrayen
  row.reverse(); // Vänder på arrayen
  row = leftArrange(row); // Skjuter alla värden till vänster i arrayen
  row.reverse(); // Vänder tillbaks på arrayen
  return row; // Returnerar arrayen
}

// ==================================================================================================================================================

function moveLeft() {
  for (let r = 0; r < rows;) { // För varje rad
    let row = board[r]; // Sätter "row" till raden i "board" arrayen
    row = leftArrange(row); // Skjuter alla värden till vänster i arrayen
    board[r] = row; // Sätter raden i "board" arrayen till den uppdaterade "row" arrayen
    for (let c = 0; c < columns;){ // För varje kolumn
      let tile = document.getElementById(String(r) + ', ' + String(c)); // Sätter "tile" till brickan med koordinaterna "r, c"
      let number = board[r][c]; // Sätter "number" till värdet i arrayen
      updateTile(tile, number); // Uppdaterar html med nya brickan
      c+=1; // Ökar kolumnen med 1
    }
    r+=1; // Ökar raden med 1
  }
}

function moveRight() {
  for (let r = 0; r < rows;) { // För varje rad
    let row = board[r]; // Sätter "row" till raden i "board" arrayen
    row = rightArrange(row); // Skjuter alla värden till höger i arrayen
    board[r] = row; // Sätter raden i "board" arrayen till den uppdaterade "row" arrayen
    for (let c = 0; c < columns;){ // För varje kolumn
      let tile = document.getElementById(String(r) + ', ' + String(c)); // Sätter "tile" till brickan med koordinaterna "r, c"
      let number = board[r][c]; // Sätter "number" till värdet i arrayen
      updateTile(tile, number); // Uppdaterar html med nya brickan
      c+=1; // Ökar kolumnen med 1
    }
    r+=1; // Ökar raden med 1
  }
}

function moveUp() {
  for (let c = 0; c < columns;) { // För varje kolumn
    let row = []; // Skapar en tom array
    for (let r = 0; r < rows;) { // För varje rad
      row.push(board[r][c]); // Lägger till värdet i arrayen
      r+=1; // Ökar raden med 1
    }
    row = leftArrange(row); // Skjuter alla värden till vänster i arrayen
    for (let r = 0; r < rows;){ // För varje rad
      board[r][c] = row[r]; // Sätter raden i "board" arrayen till den uppdaterade "row" arrayen
      let tile = document.getElementById(String(r) + ', ' + String(c)); // Sätter "tile" till brickan med koordinaterna "r, c"
      let number = board[r][c]; // Sätter "number" till värdet i arrayen
      updateTile(tile, number); // Uppdaterar html med nya brickan
      r+=1; // Ökar raden med 1
    }
    c+=1; // Ökar kolumnen med 1
  }
}

function moveDown() {
  for (let c = 0; c < columns;) { // För varje kolumn
    let row = []; // Skapar en tom array
    for (let r = 0; r < rows;) { // För varje rad
      row.push(board[r][c]); // Lägger till värdet i arrayen
      r+=1; // Ökar raden med 1
    }
    row = rightArrange(row); // Skjuter alla värden till vänster i arrayen
    for (let r = 0; r < rows;){ // För varje rad
      board[r][c] = row[r]; // Sätter raden i "board" arrayen till den uppdaterade "row" arrayen
      let tile = document.getElementById(String(r) + ', ' + String(c)); // Sätter "tile" till brickan med koordinaterna "r, c"
      let number = board[r][c]; // Sätter "number" till värdet i arrayen
      updateTile(tile, number); // Uppdaterar html med nya brickan
      r+=1; // Ökar raden med 1
    }
    c+=1; // Ökar kolumnen med 1
  }
}

// ==================================================================================================================================================

// function highScore(highScore) {
//   if (score > highScore) {
//     highScore = score;
//   }
//   document.getElementById('highScore').innerHTML = highScore;
// }

// ==================================================================================================================================================
// INITIAL ------------------------------------------------------------------------------------------------------------------------------------------

let score = 0; //Sätter poäng till 0
// let highScore = 0; //Sätter highscore till 0

window.onload = function() {
  setGame();
}

// ==================================================================================================================================================
// KNAPPLYSSNARE ------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('keydown', (e) => { //Lyssnar efter knapptryck
  if (e.code === 'ArrowLeft' || e.key.toLowerCase() === 'a') { //Om knapptryck är vänsterpil eller a
    moveLeft(); //Kör funktionen moveLeft
  }
  else if (e.code === 'ArrowRight' || e.key.toLowerCase() === 'd') { //Om knapptryck är högerpil eller d
    moveRight(); //Kör funktionen moveRight
  }
  else if (e.code === 'ArrowUp' || e.key.toLowerCase() === 'w') { //Om knapptryck är uppåtpil eller w
    moveUp(); //Kör funktionen moveUp
  }
  else if (e.code === 'ArrowDown' || e.key.toLowerCase() === 's') { //Om knapptryck är nedåtpil eller s
    moveDown(); //Kör funktionen moveDown
  }
  else { //Om knapptryck inte är någon av ovanstående
    return; //Avsluta
  }
  spawnNewTile(); //Skapar en ny "2:a" eller "4:a" på spelplanen
  document.getElementById('score').innerText = score; //Uppdaterar poäng
})



// function isMovePossible() {
  
// }
