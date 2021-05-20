// initialisation si pas de storage ou si storage corrompu
lsg = localStorage.getItem('group')
if (lsg == null || (lsg*1 != 1 && lsg*1 != -1 )){
  console.log("rien trouvé");
  group = 1;
  localStorage.setItem('group', group);
}
else {
  group = lsg*1
  console.log(group);
  if (group == -1) {
    document.body.classList.add("D1");
    console.log("D1");
  }
  else {
    document.body.classList.remove("D1");
    console.log("D2");
  }
}

const rep = (datas) => {
    console.log(datas.cours);
    let cours_affiche
    for (i in datas.cours) {
        //Cherche le cours en cours (pas fini et demarré)
        data = datas.cours[i]
        if (data.END > 60 * 10 && data.START < 0) {
            cours_affiche = data
        }

    }

    if (cours_affiche === undefined) {
        lower = datas.cours[0].START
        cours_affiche = datas.cours[0]
        //si aucun cours en cours alors on cherche le prochain cours
        for (i in datas.cours) {
            data = datas.cours[i]
            if (data.START < lower) {
                cours_affiche = data
                lower = data.START
            }
            else {
            }
        }
    }

    cours_divs = $(".cours_contener")
    cours_divs.removeClass("next_cours")
    for (i in cours_divs) {
        cours_div = cours_divs[i]
        if (cours_affiche.summary.toLowerCase().includes(cours_div.id) && cours_div.id != "") {
            $("#" + cours_div.id).addClass("next_cours")
        }
    }
};

const do_ajax = (group) => {
  if (group == 1){
    url = "http://51.83.99.197:5001/get_edt"}
  else{
    url = "http://51.83.99.197:5001/get_edt_d1"}
   $.ajax({
    url: url,
    method: "GET",
    crossDomain: true,
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',

    },dataType: "json",
    responseType: "text",
    success: (data) => rep(data)
}) //Vas chercher les données de l'emploi du temps sur un serveur intermedière ( qui les netoies)
}

do_ajax(group)


function change_group() {
  // a chaque appui sur le boutton on inverse la valeur
  // 1 = D2, -1 = D1
  group = -group;
  localStorage.setItem('group', group);
  document.body.classList.toggle("D1");
  console.log(group);
  do_ajax(group)
}
