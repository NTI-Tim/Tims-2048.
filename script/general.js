// ==================================================================================================================================================
// VERKTYG ------------------------------------------------------------------------------------------------------------------------------------------

const root = document.documentElement; //förkortar "document.documentElement" till "root"



// ==================================================================================================================================================
// FÄRG CYKEL ---------------------------------------------------------------------------------------------------------------------------------------

const randomHue = Math.floor(Math.random() * 360); //Slumpar ett initial värde mellan 0 och 360
root.style.setProperty("--hue", randomHue); //Sätter "--hue" till "randomHue"

function update() {
  const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue")) //Hämtar värdet på "--hue"
  document.documentElement.style.setProperty("--hue", (hue + 0.05) % 360) //Sätter "--hue" till "hue + 0.05"
  requestAnimationFrame(update); //Anropar funktionen "update" varje bilduppdatering
}
requestAnimationFrame(update); //Anropar funktionen "update" första gången



// ==================================================================================================================================================
// OBJEKT -------------------------------------------------------------------------------------------------------------------------------------------

let page = JSON.parse(localStorage.getItem('page')) // Hämtar "page" från "localStorage" och omvandlar det till ett objekt
  || { // Annars skapar ett nytt objekt med följande standardvärden
  theme: getComputedStyle(root).getPropertyValue('--theme'), // Nuvarande tema
  colors: { // Objekt med färger
    primary: getComputedStyle(root).getPropertyValue('--primary-color'),
    accent: getComputedStyle(root).getPropertyValue('--accent-color'),
    background: getComputedStyle(root).getPropertyValue('--background-color'),
    text: getComputedStyle(root).getPropertyValue('--text-color'),
    // highScore: 0, // Högsta poäng
  },
};



// ==================================================================================================================================================
// INITIAL ------------------------------------------------------------------------------------------------------------------------------------------

if (root) { // Kör alltid den här koden i början
  if (page.theme === 'light') { // Om temat är ljust
    root.style.setProperty('--theme', 'light');
    root.style.setProperty('--primary-color', 'hsl(var(--hue), calc(var(--saturation) - 10%), var(--lightness))');
    root.style.setProperty('--accent-color', 'hsl(var(--hue), var(--saturation), calc(var(--lightness) + 20%))');
    root.style.setProperty('--background-color', 'hsl(var(--hue), var(--saturation), calc(var(--lightness) + 40%))');
    root.style.setProperty('--text-color', 'hsl(var(--hue), var(--saturation), calc(var(--lightness) - 35%))');
  }
  else /*(page.theme === 'dark')*/ { // Annars om temat är mörkt
    root.style.setProperty('--theme', 'dark');
    root.style.setProperty('--primary-color', 'hsl(var(--hue), calc(var(--saturation) - 10%), var(--lightness))');
    root.style.setProperty('--accent-color', 'hsl(var(--hue), var(--saturation), calc(var(--lightness) - 20%))');
    root.style.setProperty('--background-color', 'hsl(var(--hue), var(--saturation), calc(var(--lightness) - 40%))');
    root.style.setProperty('--text-color', 'hsl(var(--hue), var(--saturation), calc(var(--lightness) + 35%))');
  }
}



// ==================================================================================================================================================
// FUNKTIONER ---------------------------------------------------------------------------------------------------------------------------------------

function updatePage() { // Funktionen uppdaterar sidan med de nya färgerna
  root.style.setProperty('--theme', page.theme);
  root.style.setProperty('--primary-color', page.colors.primary);
  root.style.setProperty('--accent-color', page.colors.accent);
  root.style.setProperty('--background-color', page.colors.background);
  root.style.setProperty('--text-color', page.colors.text);
}

function toggleTheme() { // Funktionen byter tema
  if (page.theme === 'light') { // Om temat är ljust
    page.theme = 'dark';
    page.colors.primary = 'hsl(var(--hue), calc(var(--saturation) - 10%), var(--lightness))';
    page.colors.accent = 'hsl(var(--hue), var(--saturation), calc(var(--lightness) - 20%))';
    page.colors.background = 'hsl(var(--hue), var(--saturation), calc(var(--lightness) - 40%))';
    page.colors.text = 'hsl(var(--hue), var(--saturation), calc(var(--lightness) + 35%))';
  }
  else /*(page.theme === 'dark')*/ { // Annars om temat är mörkt
    page.theme = 'light';
    page.colors.primary = 'hsl(var(--hue), calc(var(--saturation) - 10%), var(--lightness))';
    page.colors.accent = 'hsl(var(--hue), var(--saturation), calc(var(--lightness) + 20%))';
    page.colors.background = 'hsl(var(--hue), var(--saturation), calc(var(--lightness) + 40%))';
    page.colors.text = 'hsl(var(--hue), var(--saturation), calc(var(--lightness) - 35%))';
  }
  localStorage.setItem('page', (JSON.stringify(page))); // Sparar objektet "page" till local storage
  updatePage(); // Uppdaterar sidan med de nya färgerna
  updateColor(); // Uppdaterar färgerna på brickorna
}



// ==================================================================================================================================================
// VERKTYG ------------------------------------------------------------------------------------------------------------------------------------------

localStorage.setItem('page', (JSON.stringify(page))); // Sparar objektet "page" till local storage




// ==================================================================================================================================================
// STOPPUR ------------------------------------------------------------------------------------------------------------------------------------------

let startTime; // Tidpunkten då stoppuret startades
let elapsedTime = Date.now(); // Hur lång tid som har gått sedan stoppuret startades
let timerInterval; // Variabel för att lagra intervallet som uppdaterar stoppuret
const startTimeNew = Date.now(); // Tidpunkten då stoppuret startades

function formatTime(milliseconds) { // Funktionen formaterar tiden i HH:MM:SS format
  const seconds = Math.floor(milliseconds / 1000) % 60; // Sekunder
  const minutes = Math.floor(milliseconds / (1000 * 60)) % 60; // Minuter
  const hours = Math.floor(milliseconds / (1000 * 60 * 60)); // Timmar
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; // Returnerar tiden i HH:MM:SS format
}

function updateDisplay() { // Funktionen uppdaterar stoppuret
  document.getElementById("time").innerHTML = formatTime(Date.now() - startTimeNew); // Uppdaterar tiden
}

function startStopwatch() { // Funktionen startar stoppuret
  startTime = Date.now() - elapsedTime; // Tidpunkten då stoppuret startades
  timerInterval = setInterval(function () { // Startar intervallet som uppdaterar stoppuret
    elapsedTime = Date.now() - startTime; // Hur lång tid som har gått sedan stoppuret startades
    updateDisplay(); // Uppdaterar stoppuret
  }, 1000); // Uppdaterar stoppuret varje sekund
}

document.addEventListener("DOMContentLoaded", startStopwatch()); // Kör funktionen "startStopwatch" när sidan har laddats klart