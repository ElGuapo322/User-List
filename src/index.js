import "./styles.css";

const body = document.querySelector("body");
const main = document.querySelector("main");
const add = document.getElementById("add-button");
const modal = document.getElementById("AddModal");
const span = document.getElementsByClassName("close")[0];
const url = "https://jsonplaceholder.typicode.com/users/";
const addInputName = document.getElementById("add-inp-name");
const addInputSecondName = document.getElementById("add-inp-second-name");
const addInputTph = document.getElementById("add-inp-tph");
const addInputEmail = document.getElementById("add-inp-email");
const addInputStreet = document.getElementById("add-inp-street");
const addInputCity = document.getElementById("add-inp-city");
const addSubmit = document.getElementById("add-submit");
const sortBtn = document.getElementById("sort-button");
const sortEmailBtn = document.getElementById("sort-email-btn");

function loadUser(url, type, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = type;
  xhr.onload = function () {
    callback(xhr.response);
  };
  xhr.send();
}
loadUser(url, "json", displayUser);

function displayUser(user) {
  let arr = [...user];

  for (let i = 0; i < arr.length; i++) {
    createDivs(arr[i].id, arr[i]);

    add.addEventListener("click", (e) => {
      modal.style.display = "block";
    });
    span.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
  function createModal(id) {
    const crModal = document.createElement("div");
    crModal.classList.add("delModal");
    crModal.setAttribute("id", "main" + id);
    const crModalContent = document.createElement("div");
    crModalContent.classList.add("delModalContent");
    const crModalButtons = document.createElement("div");
    const crModalText = document.createElement("div");
    crModalText.innerText = "Удалить?";
    crModalButtons.classList.add("modal-del-buttons");
    const crModalButt1 = document.createElement("div");
    crModalButt1.classList.add("del-confirm");
    crModalButt1.setAttribute("id", "confirm" + id);
    const crModalButt2 = document.createElement("div");
    crModalButt2.classList.add("del-denied");
    body.appendChild(crModal);
    crModal.appendChild(crModalContent);
    crModalContent.appendChild(crModalText);
    crModalContent.appendChild(crModalButtons);
    crModalButtons.appendChild(crModalButt1);
    crModalButtons.appendChild(crModalButt2);

    crModalButt2.addEventListener("click", (e) => {
      crModal.style.display = "none";
    });
  }
  const inpValue = {
    name: "",
    secondName: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: ""
    }
  };
  addInputName.addEventListener("change", (n) => {
    inpValue.name = n.target.value;
  });
  addInputSecondName.addEventListener("change", (s) => {
    inpValue.secondName = s.target.value;
  });
  addInputTph.addEventListener("change", (t) => {
    inpValue.phone = t.target.value;
  });
  addInputEmail.addEventListener("change", (e) => {
    inpValue.email = e.target.value;
  });
  addInputStreet.addEventListener("change", (st) => {
    inpValue.address.street = st.target.value;
  });
  addInputCity.addEventListener("change", (c) => {
    inpValue.address.city = c.target.value;
  });
  function addUser() {
    let createId = parseInt(main.lastChild.id) + 1;
    createDivs(createId, inpValue);
  }
  addSubmit.addEventListener("click", (sub) => {
    sub.preventDefault();
    addUser();
    modal.style.display = "none";
  });
  function allSort(arr, direction, index) {
    let titles = Array.from(arr).slice(0, 1);
    let localArr = Array.from(arr).slice(1);

    let aZ = localArr.sort((a, b) =>
      a.children[index].textContent.localeCompare(b.children[index].textContent)
    );
    main.innerHTML = "";
    main.appendChild(titles[0]);

    if (direction === "fromStart") {
      for (let i = 0; i < aZ.length; i++) {
        main.appendChild(aZ[i]);
      }
    } else if (direction === "fromEnd") {
      let zA = aZ.reverse();
      for (let i = 0; i < zA.length; i++) {
        main.appendChild(zA[i]);
      }
    }
  }

  let count = 0;
  sortBtn.addEventListener("click", (sort) => {
    count++;

    if (count % 2 === 0) {
      allSort(main.children, "fromEnd", 0);
    } else allSort(main.children, "fromStart", 0);
  });
  let count2 = 0;
  sortEmailBtn.addEventListener("click", (email) => {
    count2++;

    if (count2 % 2 === 0) {
      allSort(main.children, "fromEnd", 2);
    } else allSort(main.children, "fromStart", 2);
  });

  function crChangeModal(id) {
    const crChModal = document.createElement("div");
    const divName = document.getElementById("div-name" + id);
    const divPhone = document.getElementById("div-phone" + id);
    const divEmail = document.getElementById("div-email" + id);
    const divAdress = document.getElementById("div-adress" + id);
    crChModal.classList.add("modal");
    crChModal.setAttribute("id", "main-edit" + id);
    const crChModalContent = document.createElement("div");
    crChModalContent.classList.add("modal-content");
    const crChModalText = document.createElement("div");
    crChModalText.innerText = "Изменить юзера";
    const crChModalInput1 = document.createElement("input");
    crChModalInput1.classList.add("inputs");
    crChModalInput1.value = divName.textContent.split(" ")[0];
    crChModalInput1.setAttribute("id", "edit-name" + id);
    const crChModalInput2 = document.createElement("input");
    crChModalInput2.value = divName.textContent.split(" ")[1];
    crChModalInput2.classList.add("inputs");
    crChModalInput2.setAttribute("id", "edit-last-name" + id);
    const crChModalInput3 = document.createElement("input");
    crChModalInput3.classList.add("inputs");
    crChModalInput3.setAttribute("id", "edit-phone" + id);
    crChModalInput3.value = divPhone.textContent;
    const crChModalInput4 = document.createElement("input");
    crChModalInput4.classList.add("inputs");
    crChModalInput4.value = divEmail.textContent;
    crChModalInput4.setAttribute("id", "edit-email" + id);
    const crChModalInput5 = document.createElement("input");
    crChModalInput5.classList.add("inputs");
    crChModalInput5.value = divAdress.textContent.split(", ")[0];
    crChModalInput5.setAttribute("id", "edit-street" + id);
    const crChModalInput6 = document.createElement("input");
    crChModalInput6.classList.add("inputs");
    crChModalInput6.value = divAdress.textContent.split(", ")[2];
    crChModalInput6.setAttribute("id", "edit-city" + id);
    const editSubmit = document.createElement("button");
    editSubmit.innerText = "Сохранить";
    editSubmit.classList.add("inputs-sub");
    const editForm = document.createElement("form");
    const editClose = document.createElement("div");
    editClose.classList.add("close");
    editClose.innerHTML = "x";
    body.appendChild(crChModal);
    crChModal.appendChild(crChModalContent);
    crChModalContent.appendChild(editClose);
    crChModalContent.appendChild(editForm);
    editForm.appendChild(crChModalText);
    editForm.appendChild(crChModalInput1);
    editForm.appendChild(crChModalInput2);
    editForm.appendChild(crChModalInput3);
    editForm.appendChild(crChModalInput4);
    editForm.appendChild(crChModalInput5);
    editForm.appendChild(crChModalInput6);
    editForm.appendChild(editSubmit);
    editClose.addEventListener("click", (e) => {
      crChModal.style.display = "none";
    });
    let valEditName = "";
    let valEditSecondName = "";
    let valEditEmail = "";
    let valEditStreet = "";
    let valEditCity = "";
    let valEditTph = "";
    crChModalInput1.addEventListener("change", (n) => {
      valEditName = n.target.value;
    });
    crChModalInput2.addEventListener("change", (s) => {
      valEditSecondName = s.target.value;
    });
    crChModalInput3.addEventListener("change", (t) => {
      valEditTph = t.target.value;
    });
    crChModalInput4.addEventListener("change", (e) => {
      valEditEmail = e.target.value;
    });
    crChModalInput5.addEventListener("change", (st) => {
      valEditStreet = st.target.value;
    });
    crChModalInput6.addEventListener("change", (c) => {
      valEditCity = c.target.value;
    });
    const ifVal = (val, element, splt, index) => {
      return `${val ? val : element.textContent.split(splt).slice(index)[0]}`;
    };
    editSubmit.addEventListener("click", (subm) => {
      subm.preventDefault();

      divName.innerText = `${ifVal(valEditName, divName, " ", 0)} ${ifVal(
        valEditSecondName,
        divName,
        " ",
        1
      )}`;

      if (valEditTph) {
        divPhone.innerText = `${valEditTph}`;
      }
      if (valEditEmail) {
        divEmail.innerText = `${valEditEmail}`;
      }

      divAdress.innerText = `${ifVal(
        valEditStreet,
        divAdress,
        ", ",
        0
      )}, ${ifVal(valEditCity, divAdress, ", ", 1)}`;

      crChModal.style.display = "none";
    });
  }
  function createDivs(id, user) {
    const divEl = document.createElement("div");
    divEl.classList.add("rows");
    divEl.setAttribute("id", id);
    main.appendChild(divEl);
    const divEl1 = document.createElement("div");
    divEl1.classList.add("row");
    divEl1.setAttribute("id", "div-name" + id);
    if (user.secondName) {
      divEl1.innerText = `${user.name} ${user.secondName}`;
    } else {
      divEl1.innerText = `${user.name}`;
    }
    divEl.appendChild(divEl1);
    const divEl2 = document.createElement("div");
    divEl2.classList.add("row");
    divEl2.setAttribute("id", "div-phone" + id);
    divEl2.innerText = user.phone;
    divEl.appendChild(divEl2);
    const divEl3 = document.createElement("div");
    divEl3.classList.add("row");
    divEl3.setAttribute("id", "div-email" + id);
    divEl3.innerText = user.email;
    divEl.appendChild(divEl3);
    const divEl4 = document.createElement("div");
    divEl4.setAttribute("id", "div-adress" + id);
    divEl4.classList.add("row");
    if (user.address.suite) {
      divEl4.innerText = `${user.address.street}, ${user.address.suite}, ${user.address.city} `;
    } else {
      divEl4.innerText = `${user.address.street}, ${user.address.city} `;
    }
    divEl.appendChild(divEl4);
    const divEl5 = document.createElement("div");
    divEl5.classList.add("row-buttons");
    const rowButt1 = document.createElement("div");
    rowButt1.classList.add("change-button");
    rowButt1.setAttribute("id", id);
    divEl5.appendChild(rowButt1);
    divEl.appendChild(divEl5);
    crChangeModal(id);
    const rowButt2 = document.createElement("div");
    rowButt2.classList.add("delete-button");
    rowButt2.setAttribute("id", id);
    divEl5.appendChild(rowButt2);
    createModal(id);

    rowButt2.addEventListener("click", (e) => {
      const delModal = document.getElementById("main" + id);
      const confirmBtn = document.getElementById("confirm" + id);
      delModal.style.display = "block";
      confirmBtn.addEventListener("click", (v) => {
        delModal.style.display = "block";

        main.removeChild(divEl);
        delModal.style.display = "none";
      });
    });
    rowButt1.addEventListener("click", (x) => {
      const crChModal = document.getElementById("main-edit" + id);
      crChModal.style.display = "block";
    });
  }
}
