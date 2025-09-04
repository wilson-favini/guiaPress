const express = require("express");
const app = express();
const bodyparser = require("body-parser");
//importando a conexão BD
const connection = require("./database/database");
// importando as rotas de controle
const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");

// view engine
app.set("view engine", "ejs");

//para reconhecer arquivos staticos
app.use(express("public"));

//body parser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Banco de dados
connection
    .authenticate().then(() => {
        console.log("Conexão realizada com sucesso!");
    }).catch((error) => {
        console.log(error);
    });

app.use("/", categoriesController);
app.use("/", articlesController);


app.get("/", (req, res) => {
    res.render("index");
});

app.listen(8080, () => {
    console.log("Servidor funcionando");
});