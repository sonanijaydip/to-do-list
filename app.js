var mysql = require('mysql');
var express = require('express');

var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project'
});

connection.connect();

app.get('/admin/insert/:data', function(req, res) {

    var data = req.params.data;
    
    var insert_query = "INSERT INTO `todo_list`(`data`) VALUES ('"+data+"')"; 
    

    connection.query(insert_query,  function(err,results,field) {
        if (err) throw err;
        res.redirect('/user');
    });

})

app.get ('/user', function(req, res) {
    var select = "select * from todo_list";
    
    connection.query( select, function(err,results,field) {
        if (err) throw err;
        res.send(results);
    });
})

app.get ('/admin/delete/:id', function(req, res) {

    var id = req.params.id;

    var delete_que = "delete from todo_list where id ="+id;
    connection.query( delete_que, function(err,results,field) {
        if (err) throw err;
        res.redirect('/user');
    }); 
})

app.get ('/admin/update/:id/:data', function(req, res) {

    var id = req.params.id;
    var new_id = req.params.id;
    var data = req.params.data;

    var update_que = "UPDATE `todo_list` SET  `data`=' " +data+ " '   where id = " +id; 
    connection.query( update_que, function(err,results,field) {
        if (err) throw err;
        res.redirect('/user');
    }); 
})

app.listen(4000);