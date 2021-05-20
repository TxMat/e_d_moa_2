// initialisation si pas de storage ou si storage corrompu
if (localStorage.getItem('theme') == null || (localStorage.getItem('theme') > 3)) {
  currentTheme = 1;
  localStorage.setItem('theme', currentTheme);
}
// remise du theme precedent si storage valide
else {
  currentTheme = localStorage.getItem('theme')*1;
  if (localStorage.getItem('theme') == 2) {
      document.body.classList.add("light");
      console.log("light");
  }
  else if (localStorage.getItem('theme') == 3) {
      document.body.classList.remove("light");
      document.body.classList.add("goulag");
      console.log("goulag");
  }
  else if (localStorage.getItem('theme') == 1) {
      document.body.classList.remove("goulag");
      console.log("dark");
  }
}
function change_theme() {
  // a chaque appui sur le boutton on rajoute 1 au theme courant
  currentTheme += 1;
  localStorage.setItem('theme', currentTheme);
  console.log(currentTheme);
  // si le theme est plus grand que 3 on repart au 1 (car il n'y a que 3 themes)
  if (localStorage.getItem('theme') > 3 ) {
    currentTheme = 1;
    console.log("reset");
    localStorage.setItem('theme', currentTheme);
    }
  console.log(currentTheme);
  // application du theme
  if (localStorage.getItem('theme') == 2) {
      document.body.classList.add("light");
      console.log("light");
  }
  else if (localStorage.getItem('theme') == 3) {
      document.body.classList.remove("light");
      document.body.classList.add("goulag");
      console.log("goulag");
  }
  else if (localStorage.getItem('theme') == 1) {
      document.body.classList.remove("goulag");
      console.log("dark");
  }
};
