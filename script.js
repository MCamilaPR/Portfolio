console.log("hi");
//Variable for the toggle button
const menuButton = document.querySelector(".menu-toggle");

//variable for the new element
const nav = document.querySelector("nav");

//function, which listens for the user to click the menu button

//when the user clicks the button, add the open class to the nav el
menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
});

//grab all link elements inside the navigation
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

fetch("https://api.github.com/users/diegot-code/repos")
  .then((response) => response.json())
  .then((data) => {
    //limit the number to 6

    const limitedData = data.slice(0, 6);
    //repo container var
    const reposConatiner = document.getElementById("reposContainer");
    //foreach loop
    for (let i = 0; i < limitedData.length; i++) {
      const repo = limitedData[i];

      const repoInfoDiv = document.createElement("div");

      //add a class
      repoInfoDiv.classList.add("repo-info");

      repoInfoDiv.innerHTML = `<h3>${repo.name}</h3>
      <p class="desc">${repo.description || ""}</p>
      <ul id="language-${repo.name}"></ul>
      <a href="${repo.html_url}" target="_blank">View on GitHub &rarr; </a>`;

      reposContainer.appendChild(repoInfoDiv);

      fetch(repo.languages_url)
        .then((Response) => Response.json())
        .then((langData) => {
          const languagesList = document.getElementById(
            `language-${repo.name}`
          );

          Object.keys(langData).forEach((language) => {
            const newLanguageEl = document.createElement("li");
            newLanguageEl.textContent = language;
            languagesList.appendChild(newLanguageEl);
          });
        });
    }
  })
  .catch((error) => {
    console.error(error);
  });
