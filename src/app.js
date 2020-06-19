const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(project);
  return response.json(project)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;
  const UpdateRepo = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  const repositorioIndex = repositories.findIndex(repo => repo.id === id);
  if (repositorioIndex < 0) {
    return response.status(400).json({ error: "project not found" });
  } else {
    repositories[repositorioIndex] = UpdateRepo;
    return response.json(UpdateRepo);
  }

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorioIndex = repositories.findIndex(repo => repo.id === id);

  if (repositorioIndex < 0) {
    return response.status(400).json({ error: "project not found" });
  } else {
    repositories.splice(repositorioIndex, 1);
    return response.status(204).send("Sucesso!");
  }

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorioIndex = repositories.findIndex(repo => repo.id === id);
  if (repositorioIndex < 0) {
    return response.status(400).json({ error: "project not found" });
  } else {
    repositories[repositorioIndex].likes += 1;
    return response.json(repositories[repositorioIndex]);
  }

});

module.exports = app;
