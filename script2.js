const burger = document.getElementById("burger");
const navbar = document.querySelector(".navbar");

if (burger && navbar) {
  burger.addEventListener("click", () => {
    navbar.classList.toggle("navbar--open");
  });
}
const formulaireFiltres = document.getElementById("formulaire-filtres");
const tableauModules = document.getElementById("tableau-modules");

if (formulaireFiltres && tableauModules) {
  async function rafraichirTableau() {
    const donnees = new FormData(formulaireFiltres);

    const parametres = new URLSearchParams(donnees).toString();
    const reponse = await fetch("module_lister.php?" + parametres + "&ajax=1");
    const html = await reponse.text();

    tableauModules.innerHTML = html;
    history.pushState(null, "", "module_lister.php?" + parametres);
  }
  formulaireFiltres.addEventListener("submit", function (evenement) {
    evenement.preventDefault();
    rafraichirTableau();
  });
}

const boutonsMenu = document.querySelectorAll(
  ".menu-facultes__toggle, .sous-menu__toggle"
);

boutonsMenu.forEach(function (bouton) {
  bouton.addEventListener("click", function (evenement) {
    evenement.stopPropagation();
    const conteneur = bouton.parentElement;
    conteneur.classList.toggle("ouvert");
  });
});
document.addEventListener("click", function () {
  document.querySelectorAll(".menu-facultes.ouvert, .a-sous-menu.ouvert")
    .forEach(function (conteneur) {
      conteneur.classList.remove("ouvert");
    });
});

const publications = document.querySelectorAll(".post");

publications.forEach(function (post) {
  const photos = post.querySelectorAll(".post__photo");
  const boutonPrecedent = post.querySelector(".post__prev");
  const boutonSuivant = post.querySelector(".post__next");
  const compteur = post.querySelector(".post__compteur");

  let indexActuel = 0; 

  function afficherPhoto(index) {

    photos.forEach(function (photo) {
      photo.classList.remove("post__photo--active");
    });
    photos[index].classList.add("post__photo--active");

    if (compteur) {
      compteur.textContent = (index + 1) + " / " + photos.length;
    }
  }

  if (boutonSuivant) {
    boutonSuivant.addEventListener("click", function () {
      indexActuel = (indexActuel + 1) % photos.length;
      afficherPhoto(indexActuel);
    });
  }

  if (boutonPrecedent) {
    boutonPrecedent.addEventListener("click", function () {
      indexActuel = (indexActuel - 1 + photos.length) % photos.length;
      afficherPhoto(indexActuel);
    });
  }
});
const blocErreur = document.getElementById("login-erreur");

if (blocErreur) {
  const params = new URLSearchParams(window.location.search);
  if (params.get("erreur") === "1") {
    blocErreur.hidden = false;
  }
}