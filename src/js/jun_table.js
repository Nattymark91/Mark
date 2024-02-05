////////ССЫЛКИ ДЛЯ ЗАГРУЗКИ//////////////////////////////////////
const urlSmall = "https://nattymark91.github.io/Mark/src/Small.json";
const urlBig = "https://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

////////ЭЛЕМЕНТЫ РАБОЧЕЙ ТАБЛИЦЫ//////////////////////////////////////
const table = document.querySelector(".table-sortable");
let tbody = table.querySelector("tbody");
let rows = tbody.querySelectorAll("tr")

////////ПЕРЕМЕННЫЕ ПАГИНАЦИИ//////////////////////////////////////
let rowsPerPage = 10;
let currentPage = 0;
let lastPage = Math.ceil(tbody.querySelectorAll("tr").length / rowsPerPage) - 1;
let last = document.getElementById("last");
let current = document.getElementById("current");


////////ЗАГРУЗКА ДАННЫХ//////////////////////////////////////

const loadS = document.getElementById("loadS");
loadS.addEventListener("click", () => {
  dawnload(urlSmall);
});

const loadB = document.getElementById("loadB");
loadB.addEventListener("click", () => {
  dawnload(urlBig);
});

function dawnload(url) { 
  startLoading ();
  fetch(url)
  .then(function(response){
     return response.json();
  })
  .then(function buildTable(data) {
    for (let i=0; i < data.length; i++) {
      const row = `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].firstName}</td>
        <td>${data[i].lastName}</td>
        <td>${data[i].email}</td>
        <td>${data[i].phone}</td>
        <td>${data[i].address.streetAddress}</td>
        <td>${data[i].address.city}</td>
        <td>${data[i].address.state}</td>
        <td>${data[i].address.zip}</td>
        <td>${data[i].description}</td>
      </tr>`
      tbody.innerHTML += row;
      displayRows();
    }
    loadingComplited ()
  })
  .catch(err => {
    alert('Ошибка загрузки данных. Пожалуйста, повторите попытку позже.');
    loadingComplited ();
  })
};

////////УДАЛЕНИЕ ДАННЫХ//////////////////////////////////////

const clearT = document.getElementById("clearT");

clearT.addEventListener("click", () => {
    tbody.innerHTML = '';
    descriptionBlock.innerHTML = '';
    displayRows();
});

////////////// ПАГИНАЦИЯ ////////////////////////////////////////////

function displayRows() {
  if (currentPage > lastPage) currentPage = lastPage;  // Для пагинации, когда увеличивается обьем на странице
  if (currentPage < 0) currentPage = 0;  // Для загрузки в чистую таблицу
  const start = currentPage * rowsPerPage;  // 0
  const end = start + rowsPerPage;  //10
  rows = tbody.querySelectorAll("tr"); //50
  rows.forEach((row, index) => {
    if (index < start || index >= end) {
      row.style.display = "none";
    } else {
      row.style.display = "";
    }
  });
  lastPage = Math.ceil(tbody.querySelectorAll("tr").length / rowsPerPage) - 1;
  last.innerText = lastPage + 1;
  current.innerText = currentPage + 1;
};



/////////КНОКИ ПАГИНАЦИИ////////////////

const rowBtn = document.querySelectorAll(".rowBtn");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const firstButton = document.getElementById("firstBtn");
const lastButton = document.getElementById("lastBtn");

rowBtn.forEach(el => {
            el.addEventListener('click', function() {
              rowBtn.forEach(el => {
              el.style.background = '';});
              this.style.backgroundColor = "#4079d4";
              rowsPerPage = Number(el.innerText);
              displayRows();
              displayRows();
            })
          });

prevButton.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage -= 1;
    displayRows();
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < lastPage) {
    currentPage += 1;
    displayRows();
  }
});

firstButton.addEventListener("click", () => {
    currentPage = 0;
    displayRows();
});

lastButton.addEventListener("click", () => {
  currentPage = lastPage;
  displayRows();
});

//////ПОИСК///////////////////////////////////////////

const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase().trim();
  tbody.querySelectorAll("tr").forEach(row => {
    const id = row.querySelector("td:first-child").textContent.toLowerCase().trim();
    const firstName = row.querySelector("td:nth-child(2)").textContent.toLowerCase().trim();
    const lastName = row.querySelector("td:nth-child(3)").textContent.toLowerCase().trim();
    const email = row.querySelector("td:nth-child(4)").textContent.toLowerCase().trim();
    const phone = row.querySelector("td:nth-child(5)").textContent.toLowerCase().trim();
    const rowMatches = [id, firstName, lastName, email, phone].some(field => field.includes(searchValue));
    row.style.display = rowMatches ? "" : "none";
  });
  if (!searchValue) displayRows();
});


///// ДАННЫЕ ПО КЛИКУ /////////////////////////////////////////////////////////////////////////
const descriptionBlock = document.querySelector(".description");

tbody.addEventListener('click', (el) => {
  const clikedRow = el.target.parentNode;
  const firstName = clikedRow.querySelector("td:nth-child(2)").textContent;
  const lastName = clikedRow.querySelector("td:nth-child(3)").textContent;
  const streetAddress = clikedRow.querySelector("td:nth-child(6)").textContent;
  const city = clikedRow.querySelector("td:nth-child(7)").textContent;
  const state = clikedRow.querySelector("td:nth-child(8)").textContent;
  const zip = clikedRow.querySelector("td:nth-child(9)").textContent;
  const description = clikedRow.querySelector("td:last-child").textContent;

  descriptionBlock.innerHTML = `Выбран пользователь: <b>${firstName} ${lastName}</b><br>
      Описание:<br>
      <textarea>
      ${description}
      </textarea><br>
      Адрес проживания: <b>${streetAddress}</b><br>
      Город: <b>${city}</b><br>
      Провинция/штат: <b>${state}</b><br>
      Индекс: <b>${zip}</b>`;
  
});

///////////////ФУНКЦИИ ЗАГРУЗЧИКА////////////////////////////////////

const buttons = document.querySelectorAll("button")
const loader = document.querySelector("#loading");

function startLoading () {
  buttons.forEach(button => { button.disabled = true; });
  loader.style.display = 'block';
}

function loadingComplited () {
  buttons.forEach(button => { button.disabled = false; })
  loader.style.display = 'none';
}

//////////////////СОРТРОВКА////////////////////////////////////

function sortTableByColumn(table, column, asc = true, index) {
	const dirModifier = asc ? 1 : -1;
	const tBody = table.tBodies[0];
	const rows = Array.from(tBody.querySelectorAll("tr"));

	// СОРТИРОВКА ТЕКСТА
	const sortedRows = rows.sort((a, b) => {
		const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.toLowerCase().trim();
		const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.toLowerCase().trim();
		return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
	});

  // СОРТИРОВКА ЧИСЕЛ
	const sortedRowsNum = rows.sort((a, b) => {
		const aColText = Number(a.querySelector(`td:nth-child(${column + 1})`).textContent.trim());
		const bColText = Number(b.querySelector(`td:nth-child(${column + 1})`).textContent.trim());
    if (asc) return bColText - aColText;
    else return aColText - bColText;
	});

	// ПЕРЕЗАПИСЬ ОТСОРТИРОВАННЫХ ЭЛЕМЕНТОВ
	while (tBody.firstChild) {
		tBody.removeChild(tBody.firstChild);
	}

  if (index == 0) tBody.append(...sortedRowsNum);
	else tBody.append(...sortedRows);

	// СТИЛИ ЗАГОЛОВКОВ ТАБЛИЦЫ
	table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
	table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
	table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

// ВЫЗОВ СОРТИРОВКИ
document.querySelectorAll(".table-sortable th").forEach(headerCell => {
	headerCell.addEventListener("click", () => {
    const index  = headerCell.cellIndex;
		const tableElement = headerCell.parentElement.parentElement.parentElement;
		const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
		const currentIsAscending = headerCell.classList.contains("th-sort-asc");
    console.log(index)

		sortTableByColumn(tableElement, headerIndex, !currentIsAscending, index);
	});
});

//////////ДОБАВЛЕНИЕ ДАННЫХ ИЗ ФОРМЫ/////////////////////////////

const formElement = document.getElementById('myForm'); 
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }
  
  const id = getRandomInt(1, 1000); 
  const name = formData.get('name'); 
  const sname = formData.get('sname');
  const email = formData.get('email'); 
  const phone = formData.get('phone'); 
  const address = formData.get('address');
  const city = formData.get('city'); 
  const state = formData.get('state'); 
  const index = formData.get('index');
  const descript = formData.get('descript'); 
  console.log(name, sname);

  const formrow = `<tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${sname}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${address}</td>
        <td>${city}</td>
        <td>${state}</td>
        <td>${index}</td>
        <td>${descript}</td>
      </tr>`
      tbody.innerHTML += formrow;
      displayRows();
});


/////////////// ВЫЗОВ ОКНА ФОРМЫ//////////////////////
const popupForm = document.querySelector('.popup_form');
const popupBtm = document.querySelector('#popup_btn');
const closeForm = document.querySelector('#closeForm');
popupBtm.addEventListener('click', (e) => {
  e.preventDefault();
  popupForm.classList.add('active');})

closeForm.addEventListener('click', (e) => {
 e.preventDefault();
 popupForm.classList.remove('active');})



///////////////////СПРАВКА/////////////////////////////
const refBtn = document.querySelector('#reference');
const reference = document.querySelector('.popup_ref');
const closeRef = document.querySelector('#closeRef');
refBtn.addEventListener('click', (e) => {
  e.preventDefault();
  reference.classList.add('active');})

closeRef.addEventListener('click', (e) => {
  e.preventDefault();
  reference.classList.remove('active');})

