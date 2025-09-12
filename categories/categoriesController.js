const express = require("express");
const router = express.Router();
const Category = require("./Category");
//const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
    let title = req.body.title;
    console.log(title);
    if(title && title.trim() !== ""){
        Category.create({
            title: title,
            slug: title.split(" ").join("-").toLowerCase()
        }).then(() => {
            res.redirect("/admin/categories/new");
        });
    } else{
        res.redirect("/");
    }
});

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories});
    });
});

router.post("/categories/delete", (req, res) => {
    let id = req.body.id;
    if(id && !isNaN(id)) {
        Category.destroy({
            where: {id: id}
        }).then(() => {
            res.redirect("/admin/categories");
        });
    } else {
        console.log("ID inválido");
    }
});

module.exports = router;
