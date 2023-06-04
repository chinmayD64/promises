let form = document.querySelector('#my-form');
let errormsg = document.querySelector('.msg');
let nameInput= document.querySelector('#Name');
let emailInput= document.querySelector('#Email');
let phoneInput= document.querySelector('#Phone');

let PE_List = document.getElementById('users');
    
form.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();

    let name = e.target.name.value;
    let email = e.target.email.value;
    let phone = e.target.phone.value;

    if(email === '' || phone === '' || name === '') {
        // alert('Please enter all fields');
        errormsg.classList.add('error');
        errormsg.innerHTML = 'Please enter all fields';
    
        // Remove error after 3 seconds
        setTimeout(() => errormsg.remove(), 3000);
    }
    const obj = {
        name,
        email,
        phone
    };
    axios.post("https://crudcrud.com/api/1c84437135964379bb7f1f19a648b974/appointmentData", obj)
        .then((response) => {
            showOnScreen(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        })
    // localStorage.setItem(obj.email, JSON.stringify(obj));
    // showOnScreen(obj);

    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
}

function showOnScreen(obj){ //CE- child element , PE- parent element.
    
    if(obj.name != '' || obj.email != '' || obj.phone != ''){

        let CE_listitem = document.createElement('li');
        CE_listitem.textContent =`${obj.name} : ${obj.email} : ${obj.phone}  `;
    
        let delB = document.createElement('input');
        delB.type= 'button';
        delB.value= 'DELETE';
        delB.style.background= 'grey';

        delB.onclick=()=>{
            localStorage.removeItem(obj.email);
            PE_List.removeChild(CE_listitem);
        }

        let editB = document.createElement('input');
        editB.type = 'button';
        editB.value = 'EDIT';
        editB.background = 'red';

        editB.onclick=()=>{
            localStorage.removeItem(obj.email);
            PE_List.removeChild(CE_listitem);
            obj.name = document.getElementById('Name');
            obj.email = document.getElementById('Email');
            obj.phone = document.getElementById('Phone');
        }

        CE_listitem.appendChild(editB);
        CE_listitem.appendChild(delB);
        PE_List.appendChild(CE_listitem);
    }
    
}






