var express= require('express')
var router= express.Router()
var Students= require('./students')

router.get('/students/', (req, res) => {
  Students.showStu((error, students)=>{
    if(error){
      res.status(500).send('Server error')
    }
    res.render('index.html', {
      fruits: [
        '苹果',
        '香蕉',
        '火龙果',
        '西瓜'
      ],
      students
    })
  })
})

router.get('/students/add', (req, res) => {
  res.render('add.html')
})

router.post('/students/add', (req, res) => {
  Students.addStu(req.body, (err) => {
    if(err){
      res.status(500).send('Server err...')
    }
  })
  res.redirect('/students')
})

router.get('/students/edit', (req, res) => {
  Students.editStu(req.query.id, (err, student) => {
    if(err){
      res.status(500).send('Server err...')
    }
    res.render('edit.html', {
      student: student[0]
    })
  });
})

router.post('/students/edit', (req, res) => {
  Students.commitStu(req.body, (err) => {
    if(err){
      return res.status(500).send('Server err...')
    }
    res.redirect('/students')
  })
})

router.get('/students/delete', (req, res) => {
  Students.deleteStu(req.query.id, (err) => {
    if(err){
      return res.status(500).send('Server err...')
    }
    res.redirect('/students')
  })
})

module.exports= router