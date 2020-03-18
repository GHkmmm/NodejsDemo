var mysql= require('mysql')

var connection= mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hgmkk2299',
  database: 'test'
})

connection.connect()

exports.showStu= function(callback){
  connection.query('select * from students', (err, res) => {
    if(err){
      return callback(err)
    }
    callback(null, res)
  })
}

exports.addStu= function(student, callback){
  var sql= 'INSERT INTO students VALUES(NULL, ?, ?, ?, ?)'
  var params= [student.name, student.age, student.gender, student.hobbies]
  connection.query(sql, params, (err, res) => {
    if(err){
      return callback(err)
    }
    callback(null)
  })
}

exports.editStu= function(id, callback){
  var sql= 'select * from students where id=?'
  var params=[id]
  connection.query(sql, params, (err, res) => {
    if(err){
      return callback(err)
    }
    callback(null, JSON.parse(JSON.stringify(res)))
  })
}

exports.commitStu= function(student, callback){
  var sql= 'UPDATE students SET name= ?,age= ?,gender=?,hobbies=? WHERE (id = ?)'
  params= [student.name, student.age, student.gender, student.hobbies, student.id]
  connection.query(sql, params, (err, res) => {
    if(err){
      return callback(err)
    }
    callback(null)
  })
}

exports.deleteStu= function(id, callback){
  var sql= 'DELETE FROM students WHERE (id= ?)'
  var params= [id]
  connection.query(sql, params, (err, res) => {
    if(err){
      return callback(err)
    }
    callback(null)
  })
}