import express from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    const usernameString = typeof username === "string";
    const avatarString = typeof avatar === "string";

    if ( !username || !avatar || !usernameString || !avatarString ) {
    return res.status(400).send("Todos os campos são obrigatórios!");
    }


    users.push({username, avatar});
    res.status(201).send(req.body);
});

app.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    const username = req.body.username;
  
    const isUserSigned = users.find((u) => u.username === username);
    if (!isUserSigned) {
      return res.status(401).send("UNAUTHORIZED");
    }
  
    const usernameString = typeof username === "string";
    const tweetString = typeof tweet === "string";
    if (!username || !tweet || !tweetString || !usernameString) {
      return res.status(400).send("Todos os campos são obrigatórios!");
    }
  
    tweets.unshift({ username, tweet });
    res.status(201).send("OK!");
});

app.listen(5000, () => console.log("server online"));