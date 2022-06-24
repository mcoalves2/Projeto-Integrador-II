const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', /* MySQL User */
  password: '1234', /* MySQL Password */
  database: 'pi2' /* MySQL Database */
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});

/**
 * Get All Items
 *
 * @return response()
 */
app.get('/api/tarefas',(req, res) => {
  let sqlQuery = "SELECT * FROM tarefas";

  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(results);
    
  });
});

/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/api/tarefas/:id',(req, res) => {
  let sqlQuery = "SELECT * FROM tarefas WHERE id=" + req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/tarefas',(req, res) => {
 let data = {titulo: req.body.titulo, descricao: req.body.descricao,
              dt_inicio: req.body.dt_inicio, dt_fim: req.body.dt_fim,
              hora_inicio: req.body.hora_inicio, hora_fim: req.body.hora_fim,
              responsavel: req.body.responsavel};
  let sqlQuery = "INSERT INTO tarefas SET ?";

  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results)); 
  });
});

/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/tarefas/:id',(req, res) => {
  let sqlQuery = "UPDATE tarefas SET titulo='"+req.body.titulo+"', descricao='"+req.body.descricao+"', dt_inicio='"+req.body.dt_inicio+ "', dt_fim='"+req.body.dt_fim+"', hora_inicio='"+req.body.hora_inicio+"', hora_fim='"+req.body.hora_fim+"', responsavel='"+req.body.responsavel+ "', WHERE id="+req.params.id;
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/tarefas/:id',(req, res) => {
  let sqlQuery = "DELETE FROM tarefas WHERE id="+req.params.id+"";

  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});
