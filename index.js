import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 443;

const auth = 'b4zYtVzNzfAvpSbsSt2P9Ku9Hp4z2v2iVFVUGbS0MmY';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", async (req, res) => {
    try {
        res.render("index.ejs")
    } catch (error) {
      
    }

    app.post("/random", async (req, res) => {
        try {
            const result = await axios.get(`https://api.unsplash.com/photos/random?client_id=${auth}`);
            const {full:imageUrl} = result.data.urls;
            res.render("index.ejs", {
                imageUrl: imageUrl
            })
        } catch (error) {
            
        }
    })

    app.post('/submit', async (req, res) => {
        const imageTopic = req.body.imageTopic;
        try {
            const result = await axios.get(`https://api.unsplash.com/photos/random?client_id=${auth}&query=${imageTopic}`);
            const {full: imageUrl} = result.data.urls;
            console.log(imageUrl)
            res.render("index.ejs", {
                imageUrl: imageUrl 
            })
        } catch (error) {
            
        }
 

    })
  
})

app.listen(port, () => {
    console.log("Listening on port 3000");
})

