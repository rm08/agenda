//importar dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//iniciar objeto para operar o banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db


// COMANDOS UTILIZADOS PARA CRIAR O BANCO
// db.serialize(() => {
//     db.run(`
//         CREATE TABLE IF NOT EXISTS lista (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             phone TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT
//         );
//     `)

// const query = `
//     INSERT INTO lista (
//         name,
//         phone,
//         address,
//         address2,
//         state,
//         city
//     ) VALUES (?,?,?,?,?,?);
//     `
// const values = [
//     "Rafael Massinatore",
//     "14998621144",
//     "Maria Terezinha",
//     "86",
//     "São Paulo",
//     "Araraquara"
// ]

// function afterInsertData(err) {
//     if(err) {
//         return console.log(err)
//     }

//     console.log("Cadastrado com sucesso")
//     console.log(this)
// }

// // db.run(query, values, afterInsertData)

// // Consultar dados da tabela
// db.all(`SELECT * FROM lista`, function(err, rows) {
//     if(err) {
//         return console.log(err)
//     }

//     console.log("Registros: ")
//     console.log(rows)
// })

// })

    //db.run(`DELETE FROM lista where id = ?`, [1], function(err) {
    //    if (err) {
    //        return console.log(err)
    //    }
    //    console.log("Registro deletado com sucesso!")
    //})