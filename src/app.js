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

app.listen(5000, () => console.log("server online"));