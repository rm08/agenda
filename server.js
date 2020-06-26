const express = require("express");
const server = express();
const db = require("./src/database/db.js") 

server.use(express.static("src"))

server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("", {
    express: server,
    noCache: true
})


server.get("/", (req, res) => {
    return res.render("index.html")
 })

server.get("/novo-contato", (req, res) => {
    req.query

    return res.render("new.html")
})

// rota para salvar os dados do formulario no banco de dados
server.post("/savedata", (req, res) => {
    const query = `
    INSERT INTO lista (
        name,
        phone,
        address,
        address2,
        state,
        city
    ) VALUES (?,?,?,?,?,?);
    `
    const values = [
        req.body.name,
        req.body.phone,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("new.html", { saved: true })
    }
        
    db.run(query, values, afterInsertData)

})

//rota para listar dados na tabela
server.get("/listar-contatos", (req, res) => {
    db.all(`SELECT * FROM lista`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        const total = rows.length
        return res.render("search.html", {lista: rows, total: total})
    })
})


//editar contato
server.post('/editar/:id', function(req, res){
    db.all(`SELECT * FROM lista where id =` +[req.params.id], function(err, rows) {
        if(err) {
            return console.log(err)
        }
        return res.render("search.html", {editar: true, edit: rows, total: 1})
    })
})

server.post("/updatedata", (req, res) => {
    const query = `UPDATE lista SET name ="`+[req.body.name]+`",
    phone ="`+[req.body.phone]+`",
    address ="`+[req.body.address]+`",
    address2 ="`+[req.body.address2]+`",
    state ="`+[req.body.state]+`",
    city ="`+[req.body.city]+`"
    where id = ` +[req.body.id];

    function afterUpdateData(err) {
        if(err) {
            return console.log(err)
        }
        
        console.log("Editado com sucesso")
        console.log(this)

        return res.render("search.html", { up: true, total: 1 })
    }
        
    db.run(query, afterUpdateData)

})


//rota para deletar contato
server.post('/deldados/:id', function(req, res){
    const query = `DELETE FROM lista where id = ` + [req.params.id];

    function afterDeleteData(err) {
        if(err) {
            return console.log(err)
        }
        
        console.log("Cadastrado deletado com sucesso")
        console.log(this)

        return res.render("search.html", { deleted: true, total: 1 })
    }
    db.run(query, afterDeleteData)
})

server.listen(3000)


