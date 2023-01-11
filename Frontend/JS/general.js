const nameLabel = document.getElementById("nameLabel")
const nameInput = document.getElementById("name")

const surnameLabel = document.getElementById("surnameLabel")
const surname = document.getElementById("surname")

const emailLabel = document.getElementById("emailLabel")
const email = document.getElementById("email")

const messageLabel = document.getElementById("messageLabel")
const message = document.getElementById("message")

const contactForm = document.getElementById("contactForm")

const emailEror = document.getElementById("emailEror")

const messageEror = document.getElementById("messageEror")

const responseConteiner = document.getElementById("responseConteiner")

const submitBtn = document.getElementById("submitBtn")

const responseText = document.getElementById("responseText")

nameInput.addEventListener('focusin', () => {
    nameLabel.style.color = "black"
})
nameInput.addEventListener('focusout', () => {
    nameLabel.style.color = "grey"
})

surname.addEventListener('focusin', () => {
    surnameLabel.style.color = "black"
})
surname.addEventListener('focusout', () => {
    surnameLabel.style.color = "grey"
})

email.addEventListener('focusin', () => {
    emailLabel.style.color = "black"
})
email.addEventListener('focusout', () => {
    emailLabel.style.color = "grey"
    emailEror.innerText = ""
})

message.addEventListener('focusin', () => {
    messageLabel.style.color = "black"
})
message.addEventListener('focusout', () => {
    messageLabel.style.color = "grey"
    messageEror.innerText = ""
})

contactForm.addEventListener("submit", (event) => {
    event.preventDefault()
    if (email.value === "") {
        emailEror.innerText = "**Email alanı boş bırakılamaz"
        email.focus()
        return
    }
    if (message.value === "") {
        messageEror.innerText = "**Mesaj alanı boş bırakılamaz"
        message.focus()
        return
    }
    const newForm = {
        name: nameInput.value,
        surname: surname.value,
        email: email.value,
        message: message.value,
        date: new Date()
    }
    submitBtn.disabled = true;
    submitBtn.classList.replace("submitBtnActive", "submitBtnDisabled")
    submitBtn.innerText = "Gönderiliyor..."
    fetch('http://localhost:3004/add-form', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newForm),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.status === 200) {
                responseConteiner.style.display = "block"
                responseConteiner.classList.add("responseSuccess")
                responseText.innerText = "Formunuz Başarıyla Gönderildi"
                setTimeout(() => {
                    responseConteiner.style.display = "none"
                    responseConteiner.classList.remove("responseSuccess")
                    responseText.innerText = " "
                    submitBtn.disabled = false;
                    submitBtn.classList.replace("submitBtnDisabled", "submitBtnActive")
                    submitBtn.innerText = "Gönder"
                    nameInput.value = ""
                    surname.value = ""
                    email.value = ""
                    message.value = ""
                 }, 2000);
            }
        })
        .catch(err => {
            console.log(err);
            responseConteiner.style.display = "block"
            responseConteiner.classList.add("responseFail")
            responseText.innerText = "Formunuz Gönderirken Bir Hata Oluştu"
            setTimeout(() => {
                responseConteiner.style.display = "none"
                responseConteiner.classList.remove("responseSuccess")
                responseText.innerText = " "
                submitBtn.disabled = false;
                submitBtn.classList.replace("submitBtnDisabled", "submitBtnActive")
                submitBtn.innerText = "Gönder"
                
            }, 2000);
        })

})

