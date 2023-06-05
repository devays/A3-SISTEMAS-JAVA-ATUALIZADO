const form = document.getElementById("user-form");
const tbody = document.getElementById("table-body");

const createRow = (user) => {
  const row = document.createElement("tr");
  const columns = [
    { value: user.nome },
    { value: user.email },
    { value: user.fone },
    { value: new Date(user.data_nascimento).toLocaleDateString("pt-BR") },
    {
      value: "Excluir",
      type: "button",
      onclick: () => deleteUser(user.id),
    },
    {
      value: "Editar",
      type: "button",
      onclick: () => editUser(user),
    },
  ];

  columns.forEach((column) => {
    const td = document.createElement("td");
    td.innerHTML = column.value;

    if (column.type) {
      td.setAttribute("type", column.type);
    }

    if (column.onclick) {
      td.onclick = column.onclick;
    }

    row.appendChild(td);
  });

  return row;
};

const getUsers = async () => {
  const res = await fetch("http://localhost:8080/users");
  const data = await res.json();

  tbody.innerHTML = "";

  data.forEach((user) => {
    const row = createRow(user);
    tbody.appendChild(row);
  });
};

const addUser = async (user) => {
  const dataNascimento = new Date(user.data_nascimento).toISOString(); // Converter a data em uma string no formato ISO 8601
  
  const userToSend = {
    nome: user.nome,
    email: user.email,
    fone: user.fone,
    dataNascimento: dataNascimento
  };

  const res = await fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userToSend),
  });

  const data = await res.text();

  alert(data);

  getUsers();
};

const editUser = (user) => {
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const foneInput = document.getElementById("fone");
  const dataInput = document.getElementById("data_nascimento");
  const idInput = document.getElementById("id");

  if (user) {
    const { id, nome, email, fone, data_nascimento } = user;

    nomeInput.value = nome;
    emailInput.value = email;
    foneInput.value = fone;
    dataInput.value = data_nascimento;
    idInput.value = id;
  } else {
    nomeInput.value = '';
    emailInput.value = '';
    foneInput.value = '';
    dataInput.value = '';
    idInput.value = '';
  }
};

const updateUser = async (user) => {
  const res = await fetch(`http://localhost:8080/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.text();

  alert(data);

  getUsers();
};

const deleteUser = async (id) => {
  const res = await fetch(`http://localhost:8080/users/${id}`, {
    method: "DELETE",
  });

  const data = await res.text();

  alert(data);

  getUsers();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const fone = document.getElementById("fone").value;
  const data_nascimento = new Date(document.getElementById("data_nascimento").value).toISOString();

  const user = {
    id,
    nome,
    email,
    fone,
    data_nascimento,
  };

  if (id) {
    updateUser(user);
  } else {
    addUser(user);
  }

  form.reset();
});

getUsers();