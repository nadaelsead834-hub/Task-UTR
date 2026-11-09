// Get HTML Elements
let mobileName = document.getElementById("mobileName");
let mobilePrice = document.getElementById("mobilePrice");
let tableBody = document.getElementById("tableBody");
let createBtn = document.getElementById("createBtn");

// Get Data From Local Storage
let mobiles = JSON.parse(localStorage.getItem("mobiles")) || [];

let editIndex = -1;

// Save Data In Local Storage
function saveToLocalStorage() {
    localStorage.setItem("mobiles", JSON.stringify(mobiles));
}

// Read And Display Mobiles
function displayMobiles() {
    tableBody.innerHTML = "";

    mobiles.forEach(function (mobile, index) {

        let row = document.createElement("tr");

        let numberCell = document.createElement("td");
        numberCell.textContent = index + 1;

        let nameCell = document.createElement("td");
        nameCell.textContent = mobile.name;

        let priceCell = document.createElement("td");
        priceCell.textContent = mobile.price;

        let actionsCell = document.createElement("td");

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = function () {
            editMobile(index);
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function () {
            deleteMobile(index);
        };

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(numberCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

// Create Mobile
function createMobile() {

    let name = mobileName.value.trim();
    let price = mobilePrice.value.trim();

    if (name === "" || price === "") {
        alert("Please enter mobile name and price");
        return;
    }

    if (Number(price) <= 0 || !Number.isFinite(Number(price))) {
        alert("Please enter a valid price");
        return;
    }

    let mobile = {
        name: name,
        price: Number(price)
    };

    if (editIndex === -1) {

        mobiles.push(mobile);

    } else {

        mobiles[editIndex] = mobile;
        editIndex = -1;
        createBtn.textContent = "Create";
    }

    saveToLocalStorage();
    displayMobiles();

    mobileName.value = "";
    mobilePrice.value = "";
}

// Delete Mobile
function deleteMobile(index) {

    mobiles.splice(index, 1);

    saveToLocalStorage();
    displayMobiles();
}

// Edit Mobile
function editMobile(index) {

    mobileName.value = mobiles[index].name;
    mobilePrice.value = mobiles[index].price;

    editIndex = index;

    createBtn.textContent = "Update";
}

// Display Data When Page Loads
displayMobiles();