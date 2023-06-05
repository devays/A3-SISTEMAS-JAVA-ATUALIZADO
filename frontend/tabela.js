const tbody = document.getElementById("table-body");
const editForm = document.getElementById("edit-form");
const editIdInput = document.getElementById("edit-id");
const editNomeInput = document.getElementById("edit-nome");
const editEmailInput = document.getElementById("edit-email");
const editFoneInput = document.getElementById("edit-fone");
const editDataInput = document.getElementById("edit-data_nascimento");
const userEditForm = document.getElementById("user-edit-form");

const createRow = (user) => {
  const row = document.createElement("tr");
  const columns = [
    { value: user.nome },
    { value: user.email },
    { value: user.fone },
    { value: new Date(user.dataNascimento).toLocaleDateString("pt-BR") },
    {
      value: "Excluir",
      type: "button",
      onclick: () => deleteUser(user.id),
    },
    {
      value: "Editar",
      type: "button",
      onclick: () => showEditForm(user),
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
  try {
    const res = await fetch("http://localhost:8080/users");
    const data = await res.json();

    tbody.innerHTML = "";

    data.forEach((user) => {
      const row = createRow(user);
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao obter os usuários:", error);
  }
};

const deleteUser = async (id) => {
  try {
    const res = await fetch(`http://localhost:8080/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Usuário excluído com sucesso.");
      getUsers();
    } else {
      alert("Erro ao excluir o usuário.");
    }
  } catch (error) {
    console.error("Erro ao excluir o usuário:", error);
  }
};

const showEditForm = (user) => {
  editIdInput.value = user.id;
  editNomeInput.value = user.nome;
  editEmailInput.value = user.email;
  editFoneInput.value = user.fone;
  editDataInput.value = user.dataNascimento;

  editForm.style.display = "block";
};

const cancelEdit = () => {
  userEditForm.reset();
  editForm.style.display = "none";
};

const updateUser = async (user) => {
  try {
    const res = await fetch(`http://localhost:8080/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      alert("Usuário atualizado com sucesso.");
      getUsers();
      cancelEdit();
    } else {
      const data = await res.json();
      console.error("Erro ao atualizar o usuário:", data);
    }
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
  }
};

userEditForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = editIdInput.value;
  const nome = editNomeInput.value;
  const email = editEmailInput.value;
  const fone = editFoneInput.value;
  const dataNascimento = editDataInput.value;

  const user = {
    id,
    nome,
    email,
    fone,
    dataNascimento,
  };

  updateUser(user);
});

getUsers();