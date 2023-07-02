window.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector('#my-form');
    let errormsg = document.querySelector('.msg');
    let CandyNameInput = document.querySelector('#CandyName');
    let DescriptionInput = document.querySelector('#Description');
    let PriceInput = document.querySelector('#Price');
    let QuantityInput = document.querySelector('#Quantity');

    let PE_List = document.getElementById('users');
    console.log(form);

    form.addEventListener('submit', onSubmit);

    function onSubmit(e) {
        e.preventDefault();

        let CandyName = e.target.CandyName.value;
        let Description = e.target.Description.value;
        let Price = e.target.Price.value;
        let Quantity = e.target.Quantity.value;

        if (CandyName === '' || Description === '' || Price === '' || Quantity === '') {
            errormsg.classList.add('error');
            errormsg.innerHTML = 'Please enter all fields';

            setTimeout(() => errormsg.remove(), 3000);
        }

        const obj = {
            CandyName,
            Description,
            Price,
            Quantity
        };

        axios.post("https://crudcrud.com/api/8abf7d25dda24898822891d19502f8ae/appointmentData", obj)
            .then((response) => {
                showOnScreen(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        localStorage.setItem(obj.CandyName, JSON.stringify(obj));

        CandyNameInput.value = '';
        DescriptionInput.value = '';
        PriceInput.value = '';
        QuantityInput.value = '';
    }

    window.addEventListener("DOMContentLoaded", () => {
        axios.get("https://crudcrud.com/api/8abf7d25dda24898822891d19502f8ae/appointmentData")
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
        if (obj.CandyName !== '' || obj.Description !== '' || obj.Price !== '' || obj.Quantity !== '') {
            let CE_listitem = document.createElement('li');
            CE_listitem.textContent = `${obj.CandyName} ${obj.Description} ${obj.Price} ${obj.Quantity}`;

            let delB = document.createElement('input');
            delB.type = 'button';
            delB.value = 'DELETE';
            delB.style.background = 'grey';

            delB.onclick = () => {
                localStorage.removeItem(obj.CandyName);
                PE_List.removeChild(CE_listitem);
            };

            let editB = document.createElement('input');
            editB.type = 'button';
            editB.value = 'EDIT';
            editB.style.background = 'red';

            editB.onclick = () => {
                CandyNameInput.value = obj.CandyName;
                DescriptionInput.value = obj.Description;
                PriceInput.value = obj.Price;
                QuantityInput.value = obj.Quantity;

                form.removeEventListener('submit', onSubmit);
                form.addEventListener('submit', onEditSubmit);

                function onEditSubmit(e) {
                    e.preventDefault();

                    obj.CandyName = CandyNameInput.value;
                    obj.Description = DescriptionInput.value;
                    obj.Price = PriceInput.value;
                    obj.Quantity = QuantityInput.value;

                    localStorage.setItem(obj.CandyName, JSON.stringify(obj));

                    window.addEventListener("DOMContentLoaded", () => {
                        axios.put("https://crudcrud.com/api/8abf7d25dda24898822891d19502f8ae/appointmentData", obj)
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

                    CE_listitem.textContent = `${obj.CandyName} ${obj.Description} ${obj.Price} ${obj.Quantity}`;
                    CE_listitem.appendChild(editB);
                    CE_listitem.appendChild(delB);

                    form.removeEventListener('submit', onEditSubmit);
                    form.addEventListener('submit', onSubmit);
                    form.reset();
                }
            };

            // Buy Buttons
            let buyOneB = document.createElement('button');
            buyOneB.textContent = 'Buy One';
            buyOneB.onclick = () => {
                reduceQuantity(obj, 1);
            };

            let buyTwoB = document.createElement('button');
            buyTwoB.textContent = 'Buy Two';
            buyTwoB.onclick = () => {
                reduceQuantity(obj, 2);
            };

            let buyThreeB = document.createElement('button');
            buyThreeB.textContent = 'Buy Three';
            buyThreeB.onclick = () => {
                reduceQuantity(obj, 3);
            };

            CE_listitem.appendChild(editB);
            CE_listitem.appendChild(delB);
            CE_listitem.appendChild(buyOneB);
            CE_listitem.appendChild(buyTwoB);
            CE_listitem.appendChild(buyThreeB);
            PE_List.appendChild(CE_listitem);
        }
    }

    function reduceQuantity(obj, deduction) {
        if (obj.Quantity >= deduction) {
            obj.Quantity -= deduction;

            window.addEventListener("DOMContentLoaded", () => {
                axios.put("https://crudcrud.com/api/8abf7d25dda24898822891d19502f8ae/appointmentData", obj)
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

            localStorage.setItem(obj.CandyName, JSON.stringify(obj));
            console.log(localStorage);
            showOnScreen(obj);
        } else {
            errormsg.classList.add('error');
            errormsg.innerHTML = 'Insufficient quantity';
            setTimeout(() => errormsg.remove(), 3000);
        }
    }

    showOnScreen(JSON.parse(localStorage.getItem(obj.CandyName)));
});
