const formatTanggal = () => {
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const sekarang = new Date();

  const namaHari = hari[sekarang.getDay()];

  const tanggal = sekarang.getDate();
  const namaBulan = bulan[sekarang.getMonth()];
  const tahun = sekarang.getFullYear();

  const hasil = `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;

  return hasil;
}

const getDate = (data) => {
  const date = new Date(data);
  const tahun = date.getFullYear();
  const bulan = date.getMonth() + 1;
  const tanggal = date.getDate();
  return `${tanggal}-${bulan}-${tahun}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById('todo-form');
  const todoContainer = document.getElementById('todo-list');
  const todoDoneContainer = document.getElementById('todo-done-list');
  const todoDate = document.getElementById('todo-date');

  todoDate.textContent = formatTanggal();

  const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const loadTodos = () => {
    const todosJSON = localStorage.getItem("todos");
    return todosJSON ? JSON.parse(todosJSON) : [];
  };

  const submitTodo = (e) => {
    e.preventDefault();
    const todo = document.getElementById('todo-title').value;
    const priority = document.getElementById('todo-priority').value;
    const date = new Date();
    const isDone = false;

    if (!todo) {
      alert('Todo harus diisi');
      return;
    }

    const todos = loadTodos();

    todos.push({
      id: Math.random(),
      todo,
      priority,
      date,
      isDone
    });

    saveTodos(todos);
    renderTodos(todos);

    document.getElementById('todo-title').value = '';
    document.getElementById('todo-priority').value = 'low';
  }

  const renderTodos = (todos) => {
    todoContainer.innerHTML = '';
    todoDoneContainer.innerHTML = '';
    const todoDone = todos.filter(todo => todo.isDone);
    const todoNotDone = todos.filter(todo => !todo.isDone);
    if (todoNotDone.length === 0) {

      todoContainer.innerHTML = '<p class="text-center">Tidak ada data</p>';
    }
    if (todoDone.length === 0) {

      todoDoneContainer.innerHTML = '<p class="text-center">Tidak ada data</p>';
    }
    todos.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.classList.add("todo-card", `priority-${todo.priority}`);
      if (todo.isDone) {
        todoItem.classList.add('done');
      }

      // create elements
      // todo text
      const todoContent = document.createElement('p');
      todoContent.textContent = todo.todo;
      // todo date
      const todoDate = document.createElement('span');
      todoDate.classList.add('todo-date');
      todoDate.textContent = ' ' + getDate(todo.date);
      todoContent.appendChild(todoDate);
      // todo modifier div
      const todoModifierDiv = document.createElement('div');
      todoModifierDiv.classList.add('todo-modifier-div');
      // todo checkbox
      const todoCheckbox = document.createElement('input');
      todoCheckbox.classList.add('form-check-input', 'mt-0', 'mx-2');
      todoCheckbox.type = 'checkbox';
      todoCheckbox.checked = todo.isDone;
      // todo delete button
      const todoDeleteButton = document.createElement('button');
      todoDeleteButton.classList.add('btn', 'btn-danger', 'mx-2');
      todoDeleteButton.textContent = 'Delete';
      todoDeleteButton.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== todo.id);
        saveTodos(todos);
        renderTodos(todos);
      });


      // todo event listener
      todoCheckbox.addEventListener('change', () => {
        todo.isDone = !todo.isDone;
        saveTodos(todos);
        renderTodos(todos);
      });

      todoModifierDiv.appendChild(todoCheckbox);
      todoModifierDiv.appendChild(todoDeleteButton);
      todoItem.appendChild(todoContent);
      todoItem.appendChild(todoModifierDiv);
      if (todo.isDone) {
        todoDoneContainer.appendChild(todoItem);
      } else {
        todoContainer.appendChild(todoItem);
      }
    });

  }

  todoForm.addEventListener('submit', submitTodo);

  const initialTodos = loadTodos();
  renderTodos(initialTodos);
})
