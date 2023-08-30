const express = require('express')
const app = express()
const PORT = 5000
const path = require('path')

// sequelize init
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

// set hbs
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

//serving static files
app.use(express.static('src/assets'))

// parsing data
app.use(express.urlencoded({ extended: false }))

// get
app.get('/home', home)
app.get('/add-project', addProject)
app.get('/contact', contact)
app.get('/blog-details/:id', blogDetails)
app.get('/delete-blog/:id', deleteBlog)
app.get('/edit-blog/:id', updateBlog)

//post
app.post('/add-project', addBlog)
app.post('/edit-blog/:id', editBlog)

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
    const query = `SELECT id, projectname, startdate, enddate, content, has_nodejs, has_nextjs, has_reactjs, has_typescript, image, dateduration, "createdAt", "updatedAt"
    FROM public.projects`;
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log(obj)

    res.render('index', { obj })
  } catch (error) {
    console.log(error)}
}

function addProject(req, res) {
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

    await sequelize.query(`INSERT INTO projects(projectname, startdate, enddate, content, has_nodejs, has_nextjs, has_reactjs, has_typescript, image, dateduration, "createdAt", "updatedAt") VALUES ('${projectname}', '${startdate}), '${enddate}', ${content}, '${nodejs}', '${nextjs}', '${reactjs}', '${typescript}', 'img.jpg', '${dateduration}', NOW(), NOW())`);

    res.redirect('/home')
  } catch (error){
    console.log(error)
  }
}


function blogDetails(req, res) {
  const { id } = req.params

  res.render('blog-details', { home: dataBlog[id] })
}

function deleteBlog(req, res) {
  const { id } = req.params

  dataBlog.splice(id, 1)
  res.redirect('/home')
}

function updateBlog(req, res) {
  const { id } = req.params

  res.render('edit-project', { home: dataBlog[id]})
}

function editBlog(req, res) {
  const { id } = req.params
  console.log(id)
  var { title, startdate, enddate, content, nodejs, nextjs, reactjs, typescript } = req.body
  const dateDuration = duration(startdate, enddate);
  nodejs = isChecked(nodejs);
  nextjs = isChecked(nextjs);
  reactjs = isChecked(reactjs);
  typescript = isChecked(typescript);

  const form = {
    title,
    content,
    dateDuration,
    startdate,
    enddate,
    nodejs,
    nextjs,
    reactjs,
    typescript,
  }
  dataBlog[id] = form;
  console.log(dataBlog);
  res.redirect('/home');
}