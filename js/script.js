const URL = "https://api.github.com/graphql";

const username = localStorage.getItem("username");

const mytoken = "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";

const fetchUser = (username) => {
  fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mytoken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        user(login: "${username}") {
          login
          avatarUrl
          bio
          websiteUrl
          name
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories (orderBy: {field: UPDATED_AT, direction: DESC}, first: 20) {
            totalCount
            nodes {
              name
              description
              updatedAt
              url
              languages(orderBy:{field: SIZE, direction: DESC}, first: 1) {
                nodes {
                  color
                  name
                }
              }
            }
          }
        }
      }`,
    }),
  })
    .catch((error) => console.log(error))
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const {
        name,
        avatarUrl,
        bio,
        websiteUrl,
        followers,
        following,
        login,
        repositories,
      } = res.data.user;

      const containerOne = document.querySelector(".container-one");

      containerOne.querySelector("#img img").setAttribute("src", avatarUrl);
      containerOne.querySelector("#name").textContent = name;
      containerOne.querySelector("#login").textContent = login;
      containerOne.querySelector("#bio").textContent = bio;
      containerOne.querySelector("#following").textContent =
        following.totalCount;
      containerOne.querySelector("#follower").textContent =
        followers.totalCount;

      document.querySelector("#blog").textContent = websiteUrl;
      document.querySelector("#blog").setAttribute("href", websiteUrl); 

      document.querySelectorAll(".avatar-img").forEach((avatar) => {
        avatar.setAttribute("src", avatarUrl);
      });

      document.querySelectorAll(".mobile-avatar-img").forEach((avatar) => {
        avatar.setAttribute("src", avatarUrl);
      });

      document.querySelector("#total_repo").textContent = repositories.totalCount;


      const main = repositories.nodes
        .map((data) => {
          return `<div class="main-wrapper">
        <div class="repo-info">
        <div class="repo-info-one" >
        <a href="${data.url}" target="_blank" class="repo-name">${data.name}</a>
        <p class="repo-description">${data.description || ""}</p>
        <div class="color-language">
        <p class="color-ball" style="background-color: ${
          data.languages &&
          data.languages.nodes &&
          data.languages.nodes[0] &&
          data.languages.nodes[0].color
        };"></p>
        ${
          (data.languages &&
            data.languages.nodes &&
            data.languages.nodes[0] &&
            data.languages.nodes[0].name) ||
          ""
        }
        </div>
        <span class="update-last">Updated on ${new Date(
          data.updatedAt
        ).toLocaleString("default", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}</span>
          </div>
          <div class="star-repo"><i class="far fa-star"></i> Star</div>
          </div>
          </div>`;
        })
        .join("");

      document.querySelector(".container-two").innerHTML =
        document.querySelector(".container-two ").innerHTML + main;
    });
};

document.onload = () => {
  console.log("I'm ready");
  fetchUser(username);
};
document.onload();

/*navigation responsiveness*/

let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
});
