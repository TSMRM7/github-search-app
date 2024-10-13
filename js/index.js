document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("github-form");
  const userList = document.getElementById("user-list");
  const reposList = document.getElementById("repos-list");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchQuery = event.target.search.value;
    searchGitHubUsers(searchQuery);
  });
});

function searchGitHubUsers(query) {
  fetch(`https://api.github.com/search/users?q=${query}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((data) => displayUsers(data.items));
}

function displayUsers(users) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";
  const reposList = document.getElementById("repos-list");
  reposList.innerHTML = "";

  users.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
        <button data-username="${user.login}">Show Repos</button>
      `;
    userItem
      .querySelector("button")
      .addEventListener("click", () => fetchUserRepos(user.login));
    userList.appendChild(userItem);
  });
}

function fetchUserRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((repos) => displayRepos(repos));
}

function displayRepos(repos) {
  const reposList = document.getElementById("repos-list");
  reposList.innerHTML = "";

  repos.forEach((repo) => {
    const repoItem = document.createElement("li");
    repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
    reposList.appendChild(repoItem);
  });
}
