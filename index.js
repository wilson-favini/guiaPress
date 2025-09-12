const express = require("express");
const app = express();
const bodyparser = require("body-parser");
//importando a conexão BD
const connection = require("./database/database");
// importando as rotas de controle
const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");
//importanto os models
const Category = require("./categories/Category");
const Article = require("./articles/articles");

// view engine
app.set("view engine", "ejs");

//para reconhecer arquivos staticos
app.use(express("public"));

//body parser/express
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Banco de dados
connection
    .authenticate().then(() => {
        console.log("Conexão realizada com sucesso!");
    }).catch((error) => {
        console.log(error);
    });

//sincronizando os modelos com o banco de dados
async function syncModels() {
    try {
        await Category.sync();
        await Article.sync();
        console.log("modelos soncronizados com sucesso!");
    } catch (error) {
        console.log("Erro na sincronização com o banco de dados: \n" + error);
    }
};
syncModels();

app.use("/", categoriesController);
app.use("/", articlesController);


app.get("/", (req, res) => {
    res.render("index");
});

app.listen(8080, () => {
    console.log("Servidor funcionando");
});
