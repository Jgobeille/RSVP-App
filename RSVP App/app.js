const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

function createLi(text) {
    const li = document.createElement('li');
    li.textContent = text;
    const label = document.createElement('label');
    label.textContent = 'confirmed';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    li.appendChild(label);

    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    editButton.className = 'edit';
    li.appendChild(editButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    removeButton.className = 'remove';
    li.appendChild(removeButton);

    return li;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";

    const li = createLi(text);
    
    ul.appendChild(li);
    
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
    const button = e.target.className;
    if(button === 'remove'){
        const li = e.target.parentNode;
        const ul = li.parentNode;
        ul.removeChild(li);
    } else if(button === 'edit') {
        console.log('edit mode');
    }
});