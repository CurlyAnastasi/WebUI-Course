const inputs = {
    name: document.querySelector('.inp-name'),
    surname: document.querySelector('.inp-surname'),
    login: document.querySelector('.inp-login'),
    password: document.querySelector('.inp-password'),
    email: document.querySelector('.inp-email'),
    dob: document.querySelector('.inp-dob')
};


document.querySelector('.form-reg').addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = inputs.name.value;
    const surname = inputs.surname.value;
    const login = inputs.login.value;
    const password = inputs.password.value;
    const email = inputs.email.value;
    const dob = inputs.dob.value;

    fetch(`http://localhost:8000?name=${name}&surname=${surname}&login=${login}&password=${password}&email=${email}&dob=${dob}`,{
        mode:'no-cors'
    }).then(res => res.text()).then(console.log);
})