alert("Hello!")

function submitData() {
    let name = document.getElementById("input-Name").value;
    let email = document.getElementById("input-email").value;
    let phone = document.getElementById("input-Phone-Number").value;
    let subject = document.getElementById("input-subject").value;
    let message = document.getElementById("input-message").value;

    if (name == ""){
        return alert("Please, insert your name")
    } else if (email == ""){
        return alert("Please, insert your email")
    } else if (phone == ""){
        return alert("Please, insert your phone number")
    } else if (subject == "") {
        return alert("Please, choose your subject")
    } else if (message == ""){
        return alert("Please, fill the message box")
    }

    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(subject)
    console.log(message)

    let emailReceiver = "ditaa.annisaa@gmail.com";

    let a = document.createElement("a");
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hello, my name ${name}, ${message}, Let's talk with me asap`
    a.click();

    let data = { name, email, phone, subject, message };

    console.log(data);
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


    



