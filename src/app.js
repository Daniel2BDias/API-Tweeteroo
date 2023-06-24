import express, { json } from 'express';
import cors from 'cors';


const app = express();
app.use(json());
app.use(cors());


const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const { avatar, username } = req.body;
    

    const usernameIsString = typeof username === "string";
    const avatarIsString = typeof avatar === "string";

    if ( !username || !avatar || !usernameIsString || !avatarIsString ) {
    return res.status(400).send("Todos os campos são obrigatórios!");
    }

    if(users.find((user) => user.username === username)) {
      return res.status(409).send("Nome de usuário já em uso, por favor, escolha outro!")
    }


    users.push({username, avatar});
    res.status(201).send(req.body);
});

app.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    const { user } = req.headers;
  
    const signedUp = users.find((u) => u.username === user);

    if (!signedUp) {
      return res.status(401).send("UNAUTHORIZED");
    }
  
    const usernameIsString = typeof user === "string";
    const tweetIsString = typeof tweet === "string";
    if (!user || !tweet || !tweetIsString || !usernameIsString) {
      return res.status(400).send("Todos os campos são obrigatórios!");
    }

    const avatar = users.find((u)=> u.username === user);

    tweets.unshift({ username: user, tweet, avatar: avatar.avatar });
    res.status(201).send("OK!");
});

app.get("/tweets", (req, res) => {
    const { page } = req.query;

    let start = 0;
    let end = 10;

    if(page < 1) return res.status(400).send("BAD REQUEST");

    if(page > 1) {
      for(let i = 1; i < page; i++){
        start+=10;
        end+=10;
      }

      return res.send(tweets.slice(start, end));
    }
      res.send(tweets.slice(start, end));
    });

app.get("/tweets/:USERNAME", (req, res) => {
        const { USERNAME } = req.params;

        const userTweets = tweets.filter((u, i)=> USERNAME === tweets[i].username);
        
        res.status(200).send(userTweets.slice(0, 10));
    });


app.listen(5000, () => console.log("server online"));