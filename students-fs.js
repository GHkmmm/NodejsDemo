var fs= require('fs')

/**
 * 展示学生列表
 */
exports.ShowStudens= function(callback){
  fs.readFile('./db.json', 'utf8', (error, data) => {
    if(error){
      return callback(error)
    }
    callback(null, JSON.parse(data).students)
  })
}

/**
 * 添加学生信息
 */
exports.addStudent= function(student, callback){
  fs.readFile('./db.json', (err, data) => {
    if(err){
      return callback(err)
    }

    var students= JSON.parse(data).students
    student.id= (( students[students.length-1].id*1)+1)+''
    students.push(student)
    var FileData= JSON.stringify({students})

    fs.writeFile('./db.json', FileData, (err) => {
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 编辑学生信息
 */
exports.editStu= function(id, callback){
  fs.readFile('./db.json', (err, data) => {
    if(err){
      return callback(err)
    }
    var students= JSON.parse(data).students
    var student= students.find( (item) => item.id===id )
    callback(null, student)
  })
}

/**
 * 提交编辑完成的学生信息
 */
exports.commitStu= function(student, callback){
  fs.readFile('./db.json', (err, data) => {
    if(err){
      return callback(err)
    }
    var students= JSON.parse(data).students
    var stu= students.find( (item) => item.id===student.id )
    for(var key in student){
      stu[key]= student[key]
    }
    var fileData= JSON.stringify({students})
    fs.writeFile('./db.json', fileData, (err) => {
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 删除学生信息
 */
exports.deleteStu= function(id, callback){
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if(err){
      return callback(err)
    }
    var students= JSON.parse(data).students
    var index= students.findIndex( (item) => item.id===id)
    students.splice(index, 1)

    var dataFile= JSON.stringify({students})

    fs.writeFile('./db.json', dataFile, (err) => {
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}