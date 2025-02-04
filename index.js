const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
  fetch(apiUrl + "?_limit=5")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((todo) => addTodoToDom(todo));
    });
};

function addTodoToDom(todo) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute("data-id", todo.id);

  if (todo.completed) {
    div.classList.add("done");
  }

  document.getElementById("todo-list").appendChild(div);
}

// Creating Todo Items
function createTodo(event) {
  event.preventDefault();

  const newTodo = {
    title: event.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      addTodoToDom(data);
    });
}

document.querySelector("#todo-form").addEventListener("submit", createTodo);

getTodos();
