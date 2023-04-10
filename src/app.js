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
  
    tweets.unshift({ username, tweet, avatar: users[users.length-1].avatar });
    res.status(201).send("OK!");
});

app.get("/tweets", (req, res) => {
    const tenTweets = [];
    if (tweets.length > 10) {
        for (let i = tweets.length - 10; i < tweets.length; i++) {
          const { username, tweet } = tweets[i];
          const avatar = users.find((u) => u.username === username).avatar;
          tenTweets.push({ username, avatar, tweet });
        }
        return res.send(tenTweets);
      }
      res.send(tweets);
    });

app.listen(5000, () => console.log("server online"));