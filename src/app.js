import express, { json } from 'express';
import cors from 'cors';


const app = express();
app.use(json());
app.use(cors());


const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const { avatar } = req.body;
    const { user } = req.headers;

    const usernameString = typeof user === "string";
    const avatarString = typeof avatar === "string";

    if ( !user || !avatar || !usernameString || !avatarString ) {
    return res.status(400).send("Todos os campos são obrigatórios!");
    }

    if(users.find(({username}) => username === user)) {
      return res.status(409).send("Nome de usuário já em uso, por favor, escolha outro!")
    }


    users.push({username: user, avatar});
    res.status(201).send(req.body);
});

app.post("/tweets", (req, res) => {
    const { tweet, username } = req.body;
  
    const isUserSigned = users.find((u) => u.username === username);
    if (!isUserSigned) {
      return res.status(401).send("UNAUTHORIZED");
    }
  
    const usernameString = typeof username === "string";
    const tweetString = typeof tweet === "string";
    if (!username || !tweet || !tweetString || !usernameString) {
      return res.status(400).send("Todos os campos são obrigatórios!");
    }
    let avatar = users.find((u)=> u.username === username)
    tweets.unshift({ username, tweet, avatar: avatar.avatar });
    res.status(201).send("OK!");
});

app.get("/tweets", (req, res) => {
    const { Page } = req.query;

    let start = 0;
    let end = 10;

    if(Page && tweets.length > 10) {
      for(let i = 1; i <= Page; i++){
        start+=10;
        end+=10;
      }

      return res.send(tweets.slice(start, end))
    }
      res.send(tweets.slice(start, end));
    });

app.get("/tweets/:USERNAME", (req, res) => {
        const { USERNAME } = req.params;

        if(!users.find((u)=> u.username === USERNAME)){res.send([])}

        const userTweets = tweets.filter((u, i)=> USERNAME === tweets[i].username)
        res.status(200).send(userTweets.slice(0, 10))
    });


app.listen(5000, () => console.log("server online"));