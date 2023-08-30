let dataBlog = [];

function addBlog(event) {
  event.preventDefault();

  let project = document.getElementById("input-project-name").value;
  let startDate = document.getElementById("input-start-date").value;
  let endDate = document.getElementById("input-end-date").value;
  let description = document.getElementById("input-description").value;
  let reactJs = document.getElementById("react-js").checked;
  let nodeJs = document.getElementById("node-js").checked;
  let nextJs = document.getElementById("next-js").checked;
  let typescript = document.getElementById("typescript").checked;
  let image = document.getElementById("input-blog-image").files;

  image = URL.createObjectURL(image[0]);
  console.log(image);
  
  let start = new Date(startDate);
  let end = new Date(endDate);

  let difference = end.getTime() - start.getTime();
  let day = difference / (1000 * 3600 * 24);
  let week = Math.floor(day / 7);
  let month = Math.floor(week / 4);
  let year = Math.floor(month / 12);
  let durasi = "";

  if (day > 0){
    durasi = day + " hari";
  } 
  if (week > 0){
    durasi = week + " minggu";
  } 
  if (month > 0){
    durasi = month + " bulan";
  } 
  if (year > 0){
    durasi = year + " tahun";
  } 

  let blog = {
    project,
    description,
    reactJs,
    nodeJs,
    nextJs,
    typescript,
    image,
    durasi,
  };

  dataBlog.push(blog);
  console.log(dataBlog);

 renderBlog();

 document.getElementById("form-blog").reset();
}

function renderBlog() {
  document.getElementById("contents").innerHTML = "";

  for (let index = 0; index < dataBlog.length; index++) {
    console.log(dataBlog[index]);
    var reactId = "react"+index;
    var nodeId = "node"+index;
    var nextId = "next"+index;
    var typeId = "type"+index;
    document.getElementById("contents").innerHTML += `
              <div class="card-item">
                    <div class="blog-image">
                        <img src="${dataBlog[index].image}" alt="" style="width: 100%; height: 50%;">
                    </div>
                    <div class="blog-content">
                        <h4 style="height: fit-content;">
                            <a href=''>${dataBlog[index].project}</a>
                        </h4>
                        <div class="blog-details">
                        durasi : ${dataBlog[index].durasi}
                        </div>
                        <div>
                        <p style="font-size: 12px; font-weight: 400; text-align: justify;">
                            ${dataBlog[index].description}
                        </p>
                        </div>
                        <div class="application">
                            <img src="icons8-react-js.svg" id="${reactId}" style="height: 15px; width: 15px;" hidden>
                            <img src="icons8-nodejs.svg" id="${nodeId}" style="height: 15px; width: 15px;" hidden>
                            <img src="next-js.svg" alt="" id="${nextId}" style="height: 15px; width: 15px;" hidden>
                            <img src="icons8-typescript.svg" alt="" id="${typeId}" style="height: 15px; width: 15px;" hidden>
                        </div>
                        <div class="btn-group" >
                            <button class="btn-edit" >Edit</button>
                            <button class="btn-delete" >Delete</button>
                        </div>
                    </div>
              </div>
                ` ;
  

  document.getElementById(reactId).hidden = !dataBlog[index].reactJs;      
  document.getElementById(nodeId).hidden = !dataBlog[index].nodeJs;
  document.getElementById(nextId).hidden = !dataBlog[index].nextJs;
  document.getElementById(typeId).hidden = !dataBlog[index].typescript;
  } 
 
}

let hamburgerIsOpen = false;

const openHamburger = () =>{
  let hamburgerNavCon = document.getElementById("hamburger-nav-container") ;

  if (!hamburgerIsOpen) {
    hamburgerNavCon.style.display = "block";
    hamburgerIsOpen = true
  }
    else {
      hamburgerNavCon.style.display = "none";
      hamburgerIsOpen = false
    }
}