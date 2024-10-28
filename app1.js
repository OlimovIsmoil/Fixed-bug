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
    outputDiv.innerHTML = '<ol></ol>'; // Создаем пустой упорядоченный список
  
    const olElement = outputDiv.querySelector('ol'); // Получаем ссылку на список
  
    data.forEach(item => {
      olElement.innerHTML += `
        <div class="card" id="item-${item.id}">
          <li>
            <h4>${item.name} (ID: ${item.id})</h4>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
          </li>
          <button class="delete-btn" data-id="${item.id}">Delete</button>
          <button>Change</button>
        </div>
      `;
    });
  
    // Добавляем обработчики для кнопок удаления
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async function () {
        const itemId = this.getAttribute('data-id');
        await deleteItem(itemId); // Вызов функции удаления
      });
    });
  }
  
  // Функция для удаления элемента
  async function deleteItem(id) {
    try {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка при удалении: ${response.status}`);
      }
  
      // Удаляем элемент из DOM
      document.getElementById(`item-${id}`).remove();
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      displayError(error); // Функция для отображения ошибки
    }
  }
  
  // Функция для отображения ошибки на странице
  function displayError(error) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
  
  // Обработчик нажатия на кнопку получения данных
  document.getElementById('fetchDataBtn').addEventListener('click', fetchData);
  
  document.getElementById('btnInsert').addEventListener('click', function () {
    const form = document.querySelector('.form');
    form.style.transform = 'scale(1)';
  });
  
  document.getElementById('close').addEventListener('click', function () {
    const form = document.querySelector('.form');
    form.style.transform = 'scale(0)';
  });
  
 
  document.getElementById('itemForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
  
    // Получаем данные из полей формы
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
  
    const data = {
      name: name,
      description: description,
      quantity: parseInt(quantity, 10) // Преобразуем значение quantity в число
    };
  
    try {
      const response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Преобразуем объект в JSON строку для отправки
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Данные успешно отправлены:', responseData);
      const form = document.querySelector('.form');
      form.style.transform = 'scale(0)';
      alert('Данные успешно отправлены')
  
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  });
  
