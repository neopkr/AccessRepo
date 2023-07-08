const { Repository, RepositoryDirectory } = require("../../dist/RepositoryLoader");
require("dotenv").config();

const repo = new Repository(process.env.GITHUB_KEY, "neopkr", "neonhub");
repo.init();

repo.on("initialized", () => {
    console.log(repo.RepoURL());

});


const dir = new RepositoryDirectory(process.env.GITHUB_KEY, "neopkr", "neonhub");

dir.ReadFile("README.md")
  .then(data => {
    if (data !== null) {
      console.log(data); // Imprimir el contenido del archivo si no es nulo
    } else {
      console.log("El archivo no existe o no se pudo leer");
    }
  })
  .catch(error => {
    console.error("Error occurred:", error);
  });