const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    //console.log(data);
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    //console.log(err);
    createErrorCard(" User not found ! 😢 ");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = ``;
  }
});

function createUserCard(user) {
  const userName = user.name || user.login;
  const userBio = user.bio ? `<p> ${user.bio} </p>` : "";

  const cardHTML = `
   <div class="card">
        <img
          src=${user.avatar_url}
          alt=${user.name}
        />
        <div class="user-info">
          <div class="user-name">
            <h2> ${userName} </h2>
            <small>@${user.login}</small>
          </div>
        </div>

        <p>
          ${userBio}
        </p>

        <ul>
            <li>
              <i class="fa-solid fa-user-group"></i>
              <span> ${user.followers} <strong>Followers</strong></span>
            </li>
            <li> ${user.following} <strong>Following</strong></li>
            <li>
              <i class="fa-solid fa-bookmark"></i>
              <span> ${user.public_repos} <strong>Repository</strong></span>
            </li>
          </ul>
          

        <div class="repos" id="repos"></div>
    </div> 

   `;
  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  main.innerHTML = "";
  const cardErrorHTML = ` 
  <div class="card">

  <h2>${msg}</h2>

  </div>
  `;
  main.innerHTML = cardErrorHTML;
}

async function getRepos(userName) {
  try {
    const { data } = await axios(API_URL + userName + `/repos`);
    //console.log(data);
    addReposToCard(data)
  } catch (err) {
    //console.log(err);
    createErrorCard(" Operation Failed ! 😢 ")
  }
}

function addReposToCard(repos) {
  const reposEl = document.getElementById(`repos`)

  repos.slice(0,6).forEach((repo)=>{
    const reposlink = document.createElement(`a`)
    reposlink.href=repo.html_url
    reposlink.target = `_blank`
    reposlink.innerHTML = `<i class="fa-solid fa-book-bookmark"></i>${repo.name}`

    reposEl.appendChild(reposlink)
  })
}
