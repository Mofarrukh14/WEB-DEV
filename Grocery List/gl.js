// Get elements
const userInp = document.getElementById("userInp");
const addBtn = document.getElementById("addBtn");
const listUl = document.querySelector(".listDiv ul");
const deleteAllBtn = document.querySelectorAll(".deleteBtn")[0];
const deleteCheckedBtn = document.querySelectorAll(".deleteBtn")[1];
const totalBtn = document.querySelectorAll(".btnDiv .themeBtn")[0];
const purchasedBtn = document.querySelectorAll(".btnDiv .themeBtn")[1];
const remainingBtn = document.querySelectorAll(".btnDiv .themeBtn")[2];

// Load items from localStorage
let stored = localStorage.getItem('myGroList');
let items = [];
if (stored) {
    let parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
        items = parsed;
    } else {
        // Old format: single object
        items = [{
            id: parsed.id || Date.now(),
            item: parsed.item,
            checked: parsed.ifchecked || false
        }];
    }
}

// Function to save items to localStorage
function saveItems() {
    localStorage.setItem('myGroList', JSON.stringify(items));
}

// Function to update button counts
function updateCounts() {
    const total = items.length;
    const remaining = items.filter(item => !item.checked).length;
    const purchased = 0; // Always 0

    totalBtn.textContent = `All Items - ${total}`;
    purchasedBtn.textContent = `All Purchased - ${purchased}`;
    remainingBtn.textContent = `All Remaining - ${remaining}`;
}

// Function to display items
function displayItems() {
    listUl.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.checked;
        checkbox.addEventListener('change', () => {
            item.checked = checkbox.checked;
            saveItems();
            updateCounts();
        });

        const span = document.createElement('span');
        span.textContent = item.item;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            items.splice(index, 1);
            saveItems();
            displayItems();
            updateCounts();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        listUl.appendChild(li);
    });
}

// Add item function
function addItem() {
    const val = userInp.value.trim();
    if (val) {
        const newItem = {
            id: Date.now(), // Unique id
            item: val,
            checked: false
        };
        items.push(newItem);
        saveItems();
        displayItems();
        updateCounts();
        userInp.value = '';
    }
}

// Delete all items
function deleteAll() {
    items = [];
    saveItems();
    displayItems();
    updateCounts();
}

// Delete checked items
function deleteChecked() {
    items = items.filter(item => !item.checked);
    saveItems();
    displayItems();
    updateCounts();
}

// Event listeners
addBtn.addEventListener("click", addItem);
deleteAllBtn.addEventListener("click", deleteAll);
deleteCheckedBtn.addEventListener("click", deleteChecked);

// Initial load
displayItems();
updateCounts();
