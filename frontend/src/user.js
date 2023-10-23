// testing//
let form = document.querySelector("#signin");

const URL = "https://confused-outerwear-boa.cyclic.app/";

form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    
    const formData = {
        email:form.email.value,
        password:form.password.value
    }
    console.log(formData)
    
    const request = await fetch(`${URL}/api/login`, {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(formData)
    });
    const response = await request.json();
    if(response.ok){

        Swal.fire(
            response.msg,
            '',
            'success'
        )
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
            localStorage.setItem("userName", response.userName);
            localStorage.setItem("token", response.token);
            console.log("location")
            localStorage.setItem("id",response.id)
            window.location.href = "../HTML/index.html";

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.msg,
            footer: `<b><u><a href="../register/customer_register.html">Register Here!</a></u></b>`
        });
    }
    form.email.value = "";
    form.password.value = "";
})
