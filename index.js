const express = require('express')
const app = express()
const PORT = 5000
const path = require('path')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const upload = require('./src/middleware/uploadFiles')

// sequelize init
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

// set hbs
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

//serving static files
app.use(express.static('src/assets'))
app.use(express.static('src/uploads'))

// parsing data
app.use(express.urlencoded({ extended: false }))

//setup flash
app.use(flash())

//setup session
app.use(session({
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 2
  },
  store: new session.MemoryStore(),
  saveUninitialized: true,
  resave: false,
  secret: 'secretValue'
}))

// get
app.get('/home', home)
app.get('/add-project', addProject)
app.get('/contact', contact)
app.get('/blog-details/:id', blogDetails)
app.get('/delete-blog/:id', deleteBlog)
app.get('/edit-blog/:id', updateBlog)
app.get('/register', formRegister)
app.get('/login', formLogin)
app.get('/logout', logout)

//post
app.post('/add-project', upload.single('uploadimage'), addBlog)
app.post('/edit-blog/:id', editBlog)
app.post('/register', addUser)
app.post('/login', login)

// local server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Dummy data
// const dataBlog = [
//   {
//     // id: 1,
//     title: "Hari ini keren",
//     dateDuration: "3 bulan",
//     content: "Terlihat hari ini sangat cerah dan kemungkinan adanya hari baik.",

//   },
//   {
//     // id: 2,
//     title: "Hari ini cerah",
//     dateDuration: "3 bulan",
//     content: "Terlihat hari ini sangat cerah dan kemungkinan adanya hari baik.",
//   }
// ]


async function home(req, res) {
  try {
    const isLogin = req.session.isLogin
    var query = `SELECT projects.id, projectname, startdate, enddate, content, has_nodejs, has_nextjs, has_reactjs, has_typescript, image, dateduration, projects."createdAt", projects."updatedAt",
    users.name AS author FROM public.projects LEFT JOIN users ON projects.author = users.id ORDER BY projects.id DESC;`;

    if(isLogin) {
    const userId = req.session.idUser;
      var query = `SELECT projects.id, projectname, startdate, enddate, content, has_nodejs, has_nextjs, has_reactjs, has_typescript, image, dateduration, projects."createdAt", projects."updatedAt",
      users.name AS author FROM public.projects LEFT JOIN users ON projects.author = users.id WHERE users.id=${userId} ORDER BY projects.id DESC;`;
    }

    let obj = await sequelize.query(query, { type: QueryTypes.SELECT }); 

    res.render('index', { 
      obj,
      isLogin: req.session.isLogin,
      user: req.session.user,
      userId: req.session.idUser
    })
  } catch (error) {
    console.log(error)}
}

function addProject(req, res) {
  checkIsLogout(req, res)
  res.render('add-project')
}

function contact(req, res) {
  res.render('contact')
}

function duration (startdate, enddate){
  let start = new Date(startdate);
  let end = new Date(enddate);

  let difference = end - start;
  let day = difference / (1000 * 3600 * 24);
  let week = Math.floor(day / 7);
  let month = Math.floor(week / 4);
  let year = Math.floor(month / 12);
  var durasi = "";

  if (day > 0){
    durasi = `${day} hari`;
  }
  if (week > 0){
    durasi = `${week} minggu`;
  } 
  if (month > 0){
    durasi = `${month} bulan`;
  }
  if (year > 0){
    durasi = `${year} tahun`;
  } 
  return durasi;
}

function isChecked(checkbox){
  return checkbox == 'on'? true : false;

}

async function addBlog(req, res) {
  try{
    var { projectname, startdate, enddate, content, nodejs, nextjs, reactjs, typescript } = req.body
    var dateduration = duration(startdate, enddate);
    nodejs = isChecked(nodejs);
    nextjs = isChecked(nextjs);
    reactjs = isChecked(reactjs);
    typescript = isChecked(typescript);
    var author = req.session.idUser;
    const image = req.file.filename

    console.log(image)

    await sequelize.query(`
      INSERT INTO "projects"(
        projectname, author, startdate, enddate, content,
        has_nodejs, has_nextjs, has_reactjs, has_typescript,
        image, dateduration
      ) VALUES (
        '${projectname}', ${author}, '${startdate}', '${enddate}', '${content}',
        '${nodejs}', '${nextjs}', '${reactjs}', '${typescript}',
        '${image}', '${dateduration}'
      )
    `);
    
    res.redirect('/home')
  } catch (error) {
    console.log(error)
  }
}


async function blogDetails(req, res) {
  try{
    const { id } = req.params
    const query = `SELECT projects.id, projectname, startdate, enddate, content, has_nodejs, has_nextjs, has_reactjs, has_typescript, image, dateduration, projects."createdAt", projects."updatedAt",
    users.name AS author FROM public.projects LEFT JOIN users ON projects.author = users.id WHERE projects.id=${id}`

    const obj = await sequelize.query(query, {type: QueryTypes.SELECT})

    res.render('blog-details', { home: obj[0] })
  } catch (error) {
    console.log(error)
  }
}

async function deleteBlog(req, res) {
  try {
    const { id } = req.params
    checkIsLogout(req, res)

    await sequelize.query(`DELETE from "projects" WHERE id=${id}`)
    res.redirect('/home')
  } catch (error) {
    
  }
}

async function updateBlog(req, res) {
  try {
    const { id } = req.params
    const query = `SELECT * FROM "projects" WHERE id=${id}`
    const obj = await sequelize.query(query, {type: QueryTypes.SELECT})

    checkIsLogout(req, res)
  
    res.render('edit-project', { 
      home: obj[0],
      isLogin: req.session.isLogin,
      user: req.session.user,
    })
  } catch (error) {
  }
}

async function editBlog(req, res) {
  try {
    const { id } = req.params
    
    var { projectname, startdate, enddate, content, nodejs, nextjs, reactjs, typescript } = req.body
    const dateduration = duration(startdate, enddate);
    nodejs = isChecked(nodejs);
    nextjs = isChecked(nextjs);
    reactjs = isChecked(reactjs);
    typescript = isChecked(typescript);

  await sequelize.query(`
      UPDATE "projects" SET
        projectname = '${projectname}', startdate = '${startdate}', enddate = '${enddate}', content = '${content}',
        has_nodejs = '${nodejs}', has_nextjs = '${nextjs}', has_reactjs = '${reactjs}', has_typescript = '${typescript}',
        image = 'img.jpg', dateduration = '${dateduration}' WHERE id= ${id};
    `);

    console.log("databaru")
    res.redirect('/home');
  } catch (error) {
  }
}

function formRegister(req, res) {
  res.render('register')
}

async function addUser(req, res) {
  try {
    const { name, email, password } = req.body
    const salt = 10
    
    await bcrypt.hash(password, salt, (err, hashPassword) => {
      const query = `INSERT INTO users (name, email, password, "createdAt", "updatedAt") 
      VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`

      sequelize.query(query)
      res.redirect('login')
    })
  } catch (error) {
    console.log(error)
  }
}

function formLogin(req, res) {
  res.render('login')
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    const query = `SELECT * FROM users WHERE email = '${email}'`
    let obj = await sequelize.query(query, { type : QueryTypes.SELECT })

    if(!obj.length) {
      req.flash('danger', "User has not been registered")
      return res.redirect('/login')
    }

    await bcrypt.compare(password, obj[0].password, (err, result) => {
      if(!result) {
        req.flash('danger', 'Wrong password')
        return res.redirect('/login')
      } else {
        req.session.isLogin = true
        req.session.idUser = obj[0].id
        req.session.user = obj[0].name
        req.flash('success', 'Login success')
        res.redirect('/home')
      }
    })
  } catch (error) {
    console.log(error)
  }
}

function checkIsLogout(req, res){
  if(!req.session.isLogin){
    req.flash('danger', 'You are not authenticated')
    return res.redirect('/login')
  }
}

function logout(req, res) {
   req.session.destroy()
   res.redirect('/home')
}
