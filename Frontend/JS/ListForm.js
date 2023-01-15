const username = "emrehrmn"
const password = "onecvlandingapi"

const Yetkisiz = document.getElementById("Yetkisiz")
const Yetkili = document.getElementById("Yetkili")

const LoginForm = document.getElementById("loginForm")
const UserNameInput = document.getElementById("userNameInput")
const PasswordInput = document.getElementById("posswordInput")

const LoginError = document.getElementById("loginError")

const ListArrow = document.getElementById("listArrow")


var isLogin = false;

if (isLogin === false) {
    Yetkili.style.display = "none"
    Yetkisiz.style.display = "flex"
} else {
    Yetkili.style.display = "block"
    Yetkisiz.style.display = "none"
}

LoginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (UserNameInput.value === "") {
        LoginError.innerText = "Kullanıcı Adı Boş Bırakılamaz"
        UserNameInput.focus()
        setTimeout(() => {
            LoginError.innerText = ""
        }, 2000);
        return
    }
    if (PasswordInput.value === "") {
        LoginError.innerText = "Şifre Boş Bırakılamz"
        PasswordInput.focus()
        setTimeout(() => {
            LoginError.innerText = ""
        }, 2000);
        return
    }

    if (UserNameInput !== username && PasswordInput.value !== password) {
        LoginError.innerText = "Kullanıcı adı veya Şifre hatalı"
        setTimeout(() => {
            LoginError.innerText = ""
        }, 2000);
        return
    }
    Yetkisiz.style.display = "none"
    fetch('http://localhost:3004/get-forms', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: UserNameInput.value, pass: PasswordInput.value }),
    })
        .then(res => res.json())
        .then(data => {
            Yetkili.style.display = "block"
            console.log(data)
            renderForm(data.forms)
        })
        .catch(err => {
            console.log(err)
        })

})

const renderForm = (forms = []) => {
    for (let i = 0; i < forms.length; i++) {
        const form = document.createElement("div")
        form.classList.add("ListContainer")
        form.innerHTML = `
        <div class="FormLeft">
        <div class="FormRow">
         <span class="FormLabel">Adı&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
         <span>${forms[i].name}</span>
        </div>
        <div class="FormRow">
         <span class="FormLabel">SoyAdı&nbsp;:</span>
         <span>${forms[i].surname}</span>
        </div>
        <div class="FormRow">
         <span class="FormLabel">Email&nbsp;&nbsp;&nbsp; :</span>
         <span><a href="mailto:${forms[i].email}?subject=İletişim Formu Cevabı">${forms[i].email}</a></span>
       </div>
       <div class="FormRow">
       <span class="FormLabel">Tarih&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
       <span>${new Date(forms[i].date).toLocaleDateString()}</span>
      </div>
       </div>
     <div class="FormRight">
     <div class="FormLabel">Mesaj:
     </div>
     <p class="FormMesaj"> 
     ${forms[i].message}
     </p>
    </div>

     `;
        Yetkili.appendChild(form)
    }
};

ListArrow.addEventListener("click",()=>{
window.scrollTo({top:0,behavior:"smooth"})
})