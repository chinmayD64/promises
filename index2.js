window.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector('#my-form');
    let errormsg = document.querySelector('.msg');
    let nameInput = document.querySelector('#Name');
    let emailInput = document.querySelector('#Email');
    let phoneInput = document.querySelector('#Phone');

    let PE_List = document.getElementById('users');
    console.log(form);

    form.addEventListener('submit', onSubmit);

    function onSubmit(e) {
        e.preventDefault();

        let name = e.target.name.value;
        let email = e.target.email.value;
        let phone = e.target.phone.value;

        if (email === '' || phone === '' || name === '') {
            errormsg.classList.add('error');
            errormsg.innerHTML = 'Please enter all fields';

            setTimeout(() => errormsg.remove(), 3000);
        }

        const obj = {
            name,
            email,
            phone
        };

        axios.post("https://crudcrud.com/api/e175e796a3004bf48f5f429534e6b5b1/appointmentData", obj)
            .then((response) => {
                showOnScreen(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        localStorage.setItem(obj.email, JSON.stringify(obj));

        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    }

    window.addEventListener("DOMContentLoaded", () => {
        axios.get("https://crudcrud.com/api/1c84437135964379bb7f1f19a648b974/appointmentData")
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    showOnScreen(response.data[i]);
                }
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    function showOnScreen(obj) {
        if (obj.name !== '' || obj.email !== '' || obj.phone !== '') {
            let CE_listitem = document.createElement('li');
            CE_listitem.textContent = `${obj.name} ${obj.email} ${obj.phone}`;

            let delB = document.createElement('input');
            delB.type = 'button';
            delB.value = 'DELETE';
            delB.style.background = 'grey';

            delB.onclick = () => {
                localStorage.removeItem(obj.email);
                PE_List.removeChild(CE_listitem);
            };

            let editB = document.createElement('input');
            editB.type = 'button';
            editB.value = 'EDIT';
            editB.style.background = 'red';

            editB.onclick = () => {

                nameInput.value = obj.name;
                emailInput.value = obj.email;
                phoneInput.value = obj.phone;
            
                form.removeEventListener('submit', onSubmit);
                form.addEventListener('submit', onEditSubmit);
            
                function onEditSubmit(e) {
                    e.preventDefault();
  
                    obj.name = nameInput.value;
                    obj.email = emailInput.value;
                    obj.phone = phoneInput.value;

                    localStorage.setItem(obj.email, JSON.stringify(obj));

                    CE_listitem.textContent = `${obj.name} ${obj.email} ${obj.phone}`;
                    CE_listitem.appendChild(editB);
                    CE_listitem.appendChild(delB);

                    form.removeEventListener('submit', onEditSubmit);
                    form.addEventListener('submit', onSubmit);
                    form.reset();
                }
            };
            
            CE_listitem.appendChild(editB);
            CE_listitem.appendChild(delB);
            PE_List.appendChild(CE_listitem);
        }
    }
});
