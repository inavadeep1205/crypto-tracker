import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index");
})
const price_fetch = await axios.get("https://api.exchangerate.host/live?access_key=609a256b694bf7a5785a7a04c98a7023");


app.post("/view", async (req, res) => {
    try{
        const api = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${req.body.coins}USDT`)
        console.log(api.data)
        const data = api.data;
        res.render("index", {
            header : data.symbol,
            price : data.price,
            inr_price : price_fetch.data.quotes.USDINR
        });
    }catch(err){
        res.render("index", {
            error: err.status
        })
    }

})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

