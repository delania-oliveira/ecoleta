const express = require("express")
const server = express()

// get DB
const db = require("./database/db.js")

// config public path
server.use(express.static("public"))

// enable req.body 
server.use(express.urlencoded({ extended: true}))

//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//config routes
//home
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"})
})

server.get("/create-point", (req, res) => {

    //req.query: Query Strings 
    return res.render("create-point.html")
})
server.post("/savepoint", (req, res) => {
    
    // req.body: Body
    // insert data
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);        
    `
    const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
    ]
    function afterInsertData(err){
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
    
    
})

server.get("/search", (req, res) => {

    const search = req.query.search
    
    if(search == "") {
        //empty search
        return res.render("search-results.html", { total: 0}) 
    }


    //get data
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
       if(err) {
           return console.log(err)
       }
       const total = rows.length

       console.log(rows)
       // show data 
       return res.render("search-results.html", { places: rows, total: total})
    })
}) 

//start server
server.listen(3001)
