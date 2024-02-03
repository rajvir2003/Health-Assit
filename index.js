import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const newsAPI_Key = "7f5b3c4b4e2f4ba9a04cbc3350388f72";

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/news", async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${newsAPI_Key}`);
    let newsArtices = response.data.articles;
    const result = newsArtices.filter((news) => news.urlToImage != null && news.content != null);
    console.log(result);
    res.render("news.ejs", { news : result });
  }
  catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});