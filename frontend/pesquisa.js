const searchForm = document.getElementById("search-form");
const tbody = document.getElementById("table-body");

const createRow = (user) => {
  const row = document.createElement("tr");
  const columns = [
    { value: user.nome },
    { value: user.email },
    { value: user.fone },
    { value: new Date(user.dataNascimento).toLocaleDateString("pt-BR") },
  ];

  columns.forEach((column) => {
    const td = document.createElement("td");
    td.innerHTML = column.value;
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

const searchUsers = async (keyword, type) => {
  const res = await fetch(`http://localhost:8080/users/search?keyword=${keyword}&type=${type}`);
  const data = await res.json();

  tbody.innerHTML = "";

  if (data.length === 0) {
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.setAttribute("colspan", "6");
    td.textContent = "Nenhum resultado encontrado.";
    row.appendChild(td);
    tbody.appendChild(row);
  } else {
    data.forEach((user) => {
      const row = createRow(user);
      tbody.appendChild(row);
    });
  }
};

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const keyword = document.getElementById("search-keyword").value.trim();
  const type = document.getElementById("search-type").value;

  if (keyword !== "") {
    await searchUsers(keyword, type);
  } else {
    getUsers();
  }
});

getUsers();