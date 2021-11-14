const newRender = () => {
  let cards = gets(".cards");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const win = window.open(
        "",
        "Card Details",
        "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" +
          (screen.height - 400) +
          ",left=" +
          (screen.width - 840)
      );
      function newGet(cards) {
        return card.querySelector(cards);
      }
      const name = newGet("h1");
      const img = newGet("img");
      const body = newGet(".bodyy");
      const id = newGet(".id");
      const email = newGet(".email");
      win.document.body.innerHTML = `
       <div class="col-sm-6 col-md-4 text-center">
          <div
            style="width: 99%"
            class="card-body position-relative ms-auto me-auto mb-2"
          >
            <div
              class="
                head
                d-flex
                justify-content-around
                rounded-pill
                py-1
                align-items-center
              "
            >
              <h1 class="px-2">${name.textContent}</h1>
              <img
                class="px-2 rounded-circle"
                style="width: 5em; object-fit: cover"
                src="${img.url}"
                alt=""
              />
            </div>
            <p class="mt-3">${body.textContent}</p>
            <p class="d-flex align-items-center justify-content-center mb-0">
              <i class="fs-5 text-primary mb-0 bi bi-envelope"></i>
              <strong class="mb-0 px-2">${email.textContent}</strong>
              <span
                id="id"
                class="position-absolute rounded text-white end-0 bottom-0 p-2"
                ><strong>${id.textContent}</strong></span
              >
            </p>
          </div>
        </div>
       `;
    });
  });
};
function get(element) {
  return document.querySelector(element);
}
function gets(element) {
  return document.querySelectorAll(element);
}
function collect(users) {
  if (localStorage.getItem(users)) {
    master = JSON.parse(localStorage.getItem(users));
  } else {
    master = [];
  }
  return master;
}
function set(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
// Elements
const sideBarBtn = gets(".side-bar button");
let sideBtns = [...sideBarBtn];
const sideBar = get(".side-btn");
const modal = get(".mymodal");
const modalClose = get(".close");
const form = gets("form");
const formAdd = get(".form-add");
const formEdit = get(".form-edit");
const formSearch = get(".form-search");
const formRemove = get(".form-remove");
const formEditSearch = get(".form-editsearch");
const formRange = get(".form-ran");
const heading = get(".heading");
const alerts = get(".alert");
const body = get(".body");
let editId;
// Render Function
const render = (arrays) => {
  let photo = collect("photo");
  let content = arrays
    .map((array, index) => {
      return `
      
       <div class="cards col-sm-6 col-md-4 text-center">
            <div
              style="width: 99%"
              class="card-body position-relative ms-auto me-auto mb-2"
            >
              <div
                class="
                  head
                  d-flex
                  justify-content-around
                  rounded-pill
                  py-1
                  align-items-center
                "
              >
                <h1 class="px-2">${array.name}</h1>
                <img
                  class="px-2 rounded-circle"
                  style="width: 5em; object-fit: cover"
                  src="${photo[index].url}"
                  alt=""
                />
              </div>
              <p class="mt-3 bodyy">
                ${array.body}
              </p>
              <p class="d-flex align-items-center justify-content-center mb-0">
                <i class="fs-5 text-primary mb-0 bi bi-envelope"></i>
                <strong class="mb-0 px-2 email">${array.email}</strong>
                <span
                  id="id"
                  class="
                    position-absolute
                    rounded
                    text-white
                    end-0
                    bottom-0
                    p-2
                  "

                  ><strong class="id">${array.id}</strong></span
                >
              </p>
            </div>
          </div>
      
    `;
    })
    .join("");
  body.innerHTML = content;
  newRender();
};
// parseFloat(index) + 1
// Fetching Users
const getUser = () => {
  const trying = fetch("https://jsonplaceholder.typicode.com/comments")
    .then((Response) => Response.json())
    .then((data) => {
      if (
        localStorage.getItem("users") &&
        JSON.parse(localStorage.getItem("users"))
      ) {
        render(collect("users"));
      } else {
        set(data);
        render(collect("users"));
      }
    });
};
// Serach User
function search(failed, success, val) {
  let value = parseInt(val);
  let user = collect("users");
  user = user.filter((user) => {
    if (user.id === value) {
      console.log(user.id);
      return user;
    }
  });
  if (user.length < 1) {
    alert(failed, "red");
  } else {
    render(user);
    alert(success, "greenyellow");
  }
}
// Add User
function addUser(name, email, body) {
  fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      body: body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let master = collect("users");
      master.push(data);
      set(master);
      render(collect("users"));
    });
}
const image = () => {
  const photo = fetch("https://jsonplaceholder.typicode.com/photos")
    .then((Response) => Response.json())
    .then((data) => {
      localStorage.setItem("photo", JSON.stringify(data));
    });
};
image();

render(collect("users"));
// Side Bar Toggle Expand Function
sideBar.addEventListener("click", () => {
  sideBarBtn.forEach((btn) => {
    btn.classList.toggle("hide");
  });
});
//Opening and closing The Modals
sideBtns = sideBtns.filter((btn) => {
  if (btn.dataset.id) {
    return btn;
  }
});
sideBtns.forEach((btn) => {
  let id = btn.dataset.id;
  btn.addEventListener("click", () => {
    if (id === "all") {
      getUser();
    } else {
      modal.classList.toggle("none");
      if (id === "add") {
        formAdd.classList.remove("none");
        setHead("Add A User");
      } else if (id === "search") {
        formSearch.classList.remove("none");
        setHead("Search A  User");
        sumbit(formSearch).value = "Search User";
      } else if (id === "searchs") {
        formRange.classList.remove("none");
        setHead("Search For Users");
        sumbit(formRange).value = "Search Users";
      } else if (id === "remove") {
        formRemove.classList.remove("none");
        sumbit(formRemove).value = "Remove";
        setHead("Remove  User");
      } else if (id === "edit") {
        formEditSearch.classList.remove("none");
        setHead("Edit  User");
        sumbit(formEditSearch).value = "Submit";
      }
    }
  });
});
function sumbit(form) {
  return form.querySelector("input[type=submit]");
}
// const [all, add, searchs, searchall, edit, remove] = sideBtns;
sumbit(formAdd).addEventListener("click", function hello(e) {
  e.preventDefault();
  const name = formAdd.querySelector(".form-add .name");
  const email = formAdd.querySelector(".form-add .email");
  const body = formAdd.querySelector(".form-add .body");
  if (name.value === "" || email.value === "" || body.value === "") {
    alert("Please fill All Entries", "red");
  } else {
    addUser(name.value, email.value, body.value);
    alert("Success!!! Adding User...", "greenyellow");
    setTimeout(() => {
      name.value = "";
      email.value = "";
      body.value = "";
    }, 1000);
  }
  console.log("I was clicked");
});
sumbit(formSearch).addEventListener("click", function hello(e) {
  e.preventDefault();
  let val = formSearch.querySelector("input[type=number]");
  let value = val.value;
  if (!val.value) {
    alert("Pls Input An Id", "red");
  } else {
    search("Not Found", "success: User Found", value);
  }
});
sumbit(formRange).addEventListener("click", function hello(e) {
  e.preventDefault();
  const val1 = formRange.querySelector(".form-ran #num1");
  const val2 = formRange.querySelector(".form-ran #num2");
  if (!val1.value || !val2.value) {
    alert("Please enter ID ranges", "red");
  } else {
    let min = parseInt(val1.value);
    min = min - 2;
    let max = parseInt(val2.value);
    let users = collect("users");
    users = users.filter((user, index) => {
      if (index > min && index < max) {
        return user;
      }
    });
    if (users.length < 1) {
      alert("Users Not Found, pls Check range", "red");
    } else {
      render(users);
      alert("Success..Users Found", "greenyellow");
    }
  }
});
sumbit(formRemove).addEventListener("click", function hello(e) {
  e.preventDefault();
  let val = formRemove.querySelector("input[type=number]");
  let value = val.value;
  if (body.children.length > 20) {
    search("Not Found", "User Found: Remove This User?", value);
  } else {
    let id = parseInt(value);
    let users = collect("users");
    users = users.filter((user) => {
      if (user.id !== id) {
        return user;
      }
    });
    set(users);
    render(collect("users"));
  }
});
sumbit(formEditSearch).addEventListener("click", function hello(e) {
  e.preventDefault();
  let val = formEditSearch.querySelector("input[type=number]");
  let value = val.value;
  if (val.value) {
    editId = val.value;
  }
  if (body.children.length > 1) {
    search("Not Found", "User Found: Edit This User?", value);
  } else {
    sumbit(formEdit).value = "Edit";
    formEdit.classList.remove("none");
    formEditSearch.classList.add("none");
  }
});
sumbit(formEdit).addEventListener("click", function hello(e) {
  e.preventDefault();
  const name = formEdit.querySelector(".form-edit .name");
  const email = formEdit.querySelector(".form-edit .email");
  const body = formEdit.querySelector(".form-edit .body");
  if (name.value === "" || email.value === "" || body.value === "") {
    alert("Please fill All Entries", "red");
  } else {
    let users = collect("users");
    users = users.filter((user) => {
      if (user.id == editId) {
        user.name = name.value;
        user.email = email.value;
        user.body = body.value;
      }
      return user;
    });
    set(users);
    search("failed to Edit", "User Edited", editId);
    setHead("success Okay?");
  }
  console.log("I was clicked");
});

modalClose.addEventListener("click", close);
function close() {
  modal.classList.toggle("none");
  form.forEach((form) => {
    form.classList.add("none");
    form
      .querySelector("input[type=submit]")
      .removeEventListener("click", arguments.callee, false);
  });
}
function setHead(param) {
  heading.textContent = param;
}
function alert(text, color) {
  alerts.textContent = text;
  alerts.style.color = color;
  setTimeout(() => {
    alerts.textContent = "";
    alerts.style.color = "";
  }, 1500);
}
// Rendering In a New Page
