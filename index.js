const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Schema } = mongoose;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://zeeshanmalik1011:12345678910@cluster0.bafdy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  console.log("dataBase connect");
}

const Ideasharing = new Schema({
  IdeaName: String,
  IdeaDetail: String,
});

const Idea = mongoose.model("Idea", Ideasharing);

const server = express();

server.use(express.json());
server.use(express.static("dist"));
server.use(cors());

// create
server.post("/ideas", (req, res) => {
  const newIdea = new Idea(req.body);

  newIdea
    .save()
    .then(() => {
      console.log("succewsfuly added");
    })
    .catch((err) => {
      console.log("error not save", err);
    });

  res.json(newIdea);
});
//read
server.get("/ideas", async (req, res) => {
  const idea = await Idea.find({});
  res.json(idea);
});
//read by id or any value
server.get("/ideas/:id", async (req, res) => {
  const id = req.params.id;
  const idea = await Idea.findById({ _id: id });
  res.json(idea);
});

//update

server.patch("/ideas/:id", async (req, res) => {
  const id = req.params.id;

  await Idea.findByIdAndUpdate({ _id: id }, { IdeaName: "Hamza" });
  const updateidea = await Idea.findById({ _id: id });
  res.json(updateidea);
});
server.delete("/ideas/:id", async (req, res) => {
  const id = req.params.id;
  const idea = await Idea.deleteOne({ _id: id });
  res.json(idea);
});
server.listen(8080);
