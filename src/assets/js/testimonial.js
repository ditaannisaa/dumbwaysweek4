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

// class Testi {
//     #image = "";
//     #quote = "";

//     constructor (image, quote){
//         this.#image = image;
//         this.#quote = quote;
//     }

//     get image (){
//         return this.#image;
//     }
//     get quote (){
//         return this.#quote;
//     }

//     get testiHTML () {
//         return `<div class="testi">
//                      <img src="${this.image}" >
//                      <p class="quote">${this.quote}</p>
//                      <p class="author">${this.company}</p>
//                  </div>`
//      }
// }

// class AuthorTesti extends Testi{
//     #author = "";

//     constructor(image, quote, author){
//         super(image, quote);
//         this.#author = author;
//     }

//     get author(){
//         return this.#author;
//     }
// }

// class CompanyTesti extends Testi{
//     #company = "";

//     constructor(image, quote, author){
//         super(image, quote);
//         this.#company = author;
//     }

//     get company(){
//         return this.#company + "company";
//     }
// }

// const testimonial1 = new CompanyTesti(
//     "image/ahmed-yameen-K-HhBxMhgr0-unsplash.jpg",
//     "Mantap banget jasanya",
//     "- Surya"
// );

// const testimonial2 = new CompanyTesti(
//     "image/annie-spratt-FSFfEQkd1sc-unsplash.jpg",
//     "Makasih banyak kakak",
//     "- farah"
// );

// let testimonialData = [testimonial1, testimonial2];
// let testiHTML = "";

// for (let i = 0; i < testimonialData.length; i++) {
//     testiHTML += testimonialData[i].testiHTML;
// }

// document.getElementById("testimonial").innerHTML = testiHTML;

// const ratingTesti = [
//     {author: "- Surya Eldanta",
//      quote: "Keren banget jasanya!",
//      image: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
//      rating: 5,
//     },

//     {author: "- Fari Lesmana",
//      quote: "Keren lah pokoknya",
//      image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
//      rating: 5,
//     },

//     {author: "- Sarah Leuwi",
//      quote: "Mantap sekali!",
//      image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
//      rating: 3,
//     },

//     {author: "- Malik Adam",
//      quote: "Cukup.",
//      image: "https://images.unsplash.com/photo-1616776005756-4dca36124bf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
//      rating: 4,
//     },

//     {author: "- Tiara",
//      quote: "Biasa.",
//      image: "https://images.unsplash.com/photo-1611175140153-bfd26338ff0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
//      rating: 2,
//     },
// ];

const testimonials = new Promise((resolve, reject) =>{
    const testimoni = new XMLHttpRequest()

    testimoni.open("GET", "https://api.npoint.io/c9b91db93112ac3ca079", true)
    
    testimoni.onload = function() {
        if (testimoni.status == 200){
            resolve (JSON.parse(testimoni.response))
        } else {
            reject ("Error")
        }
    }

    testimoni.onerror = function() {
        reject("Network Error")
    }
    
    testimoni.send()

})


async function allTesti() {
    try{
    
    const response = await testimonials;
    // console.log(response)

    let testimoniHTML = "";

    response.forEach(function(item) {
        testimoniHTML += `
        <div class="testi">
            <img src="${item.image}" >
            <p class="quote">${item.quote}</p>
            <p class="author">${item.author}</p>
            <p class="rate">${item.rating}<i class="fa-solid fa-star"></i>
            </p>
        </div>
        `;
    });

    document.getElementById("testimonial").innerHTML = testimoniHTML;
    }
    catch(error) {
        console.log(error)
    }

    
}
    allTesti()

async function filterTesti(rating) {
    try{
    
    const response = await testimonials
    console.log(response)
    
    let testimoniHTML = "";

    const testiFiltered = response.filter(function(item) {
        return item.rating === rating;
    })

    if (testiFiltered.length === 0){
        testimoniHTML = `<h1>Data not found!</h1>`;
    } else {testiFiltered.forEach(function (item){
        testimoniHTML += `
        <div class="testi">
            <img src="${item.image}" >
            <p class="quote">${item.quote}</p>
            <p class="author">${item.author}</p>
            <p class="rate">${item.rating}<i class="fa-solid fa-star"></i>
            </p>
        </div>
        `;
    })
    }
    document.getElementById("testimonial").innerHTML = testimoniHTML;
    } catch(error) {
        console.log(error)
    }
}