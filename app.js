// Функция для выполнения запроса
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/items'); // Пример API

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    displayData(data); // Функция для отображения данных
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    displayError(error); // Функция для отображения ошибки
  }
}

// Функция для отображения данных на странице
function displayData(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// Функция для отображения ошибки на странице
function displayError(error) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
}

// Обработчик нажатия на кнопку
document.getElementById('fetchDataBtn').addEventListener('click', fetchData);

document.getElementById('btnInsert').addEventListener('click', function () {
  const form = document.querySelector('.form');
  form.style.transform = 'scale(1)';
})
document.getElementById('close').addEventListener('click', function () {
  const form = document.querySelector('.form');
  form.style.transform = 'scale(0)';
});

// Обработчик отправки формы
document.getElementById('itemForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  // Создание POST-запроса
  try {
    const response = await fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }), // Передаем данные формы
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    displayData(data); // Функция для отображения данных
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    displayError(error); // Функция для отображения ошибки
  }
});

function displayData(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '<ol></ol>'; // Создаем пустой упорядоченный список

  const olElement = outputDiv.querySelector('ol'); // Получаем ссылку на список

  data.forEach(item => {
    olElement.innerHTML += `
        <div class="card">
          <li>
            <h4>${item.name} (ID: ${item.id})</h4>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
          </li>
          <button>delete</button>
          <button>change</button>
        </div>
      `;
  });
}
