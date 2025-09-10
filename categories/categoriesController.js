const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
    let title = req.body.title;
    console.log(title);
    if(title != undefined || title != "" || title != " " || title != null){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories/new");
        });
    } else{
        res.redirect("/");
    }
});

module.exports = router;
