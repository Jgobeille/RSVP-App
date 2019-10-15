document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#registrar');
    const input = form.querySelector('input');
    const main = document.querySelector('.main');
    const ul = document.getElementById('invitedList');

    const div = document.createElement('div');
    const filterLabel = document.createElement('label');
    const filterCheckBox = document.createElement('input');


    filterLabel.textContent = "Hide those who haven't responded";
    filterCheckBox.type = 'checkbox';
    div.appendChild(filterLabel);
    div.appendChild(filterCheckBox);
    main.insertBefore(div, ul);

    function createLi(text) {
        function createElement(elementName, property, value) {
            const element = document.createElement(elementName);
            element[property] = value;
            return element;
        }

        function appendToLi(elementName, property, value) {
            const element = createElement(elementName, property, value);
            li.appendChild(element);
            return element;
        }

        const li = document.createElement('li');

        appendToLi('span', 'textContent', text);
        appendToLi('label', 'textContent' , 'confirmed' )
            .appendChild(createElement('input', 'type', 'checkbox'));
        appendToLi('button', 'textContent', 'edit');
        appendToLi('button', 'textContent', 'remove');
        return li;
    }

    function validation(input) {    
        input.oninvalid = function(e) {
            // Code found here: https://stackoverflow.com/questions/5272433/html5-form-required-attribute-set-custom-validation-message
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("Please enter in a proper name");
            }
        };
        input.oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const text = input.value;
        
        input.value = "";

        const li = createLi(text);
        
        ul.appendChild(li);
        // localStorage.setItem('names', JSON.stringify(ul.innerHTML));
        // const getItems = localStorage.getItem('names');
        // return JSON.parse(getItems);
    });

    ul.addEventListener('change', (e) => {
        const checkbox = e.target;
        const checked = checkbox.checked;
        const listItem = checkbox.parentNode.parentNode;
        
        if (checked) {
            listItem.className = 'responded';
            
        } else {
            listItem.className = '';
        }
    });

    ul.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            const li = button.parentNode;
            const ul = li.parentNode;
            const action = button.textContent;
            //make functions objects
            const nameActions = {
            remove: () =>  { 
                ul.removeChild(li);
            },
            edit: () => {
                const span = li.firstElementChild;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent;
                li.insertBefore(input, span);
                li.removeChild(span);
                button.textContent = 'save';
            }, 
            save: () => {
                const newName = document.createElement('span');
                const inputBox = li.firstElementChild;
                if(inputBox.value === ""){
                alert('please enter a name');
                } else {
                newName.innerHTML = inputBox.value;
                li.insertBefore(newName, inputBox);
                li.removeChild(inputBox);
                button.textContent = 'edit';
                }

            } 
        }
            //select and run action in buttons name
            /* This works by accessing the nameActions object via passing in
                the name of the button name. Button name is edit so it accesses the edit name 
                in the object. Then at the end of the one-liner a function is called so it will  
                run the anonymous function located in object name 'edit'
            */
            nameActions[action]();
        }
    });

    filterCheckBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const lis = ul.children;

        if(isChecked) { 
            for (let i = 0; i < lis.length; i += 1) {
                let li = lis[i];
                if(li.className === 'responded') {
                    li.style.display = ""; //Keeps display visible
                } else {
                    li.style.display = 'none'; //hides li
                }
            } 
        } else { // If filerCheckBox is not checked, show all items regardless of being confirmed or not
            for (let i = 0; i < lis.length; i += 1) {
                let li = lis[i];
                li.style.display = "";
            } 
        }
    });
    validation(input);
});


/*
LocalStorage
When filtering out confirmed guests, hide the the checkbox field



*/