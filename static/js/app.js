

const quiz = [
	{
		question: 'Считаете ли вы наших работников вежливыми?',
		answers: ['Да', 'Нет', 'Затрудняюсь ответить'],
	},
	{
		question: 'Как считаете, наши работники профессионально выполняют свою работу?',
		answers: ['Да', 'Нет', 'Затрудняюсь ответить'],
	},
	{
		question: 'Вовремя ли наши работники выполняют свою работу?',
		answers: ['Да', 'Нет', 'Затрудняюсь ответить'],
	},
	{
		question: 'Имеете ли вы претензии к нашим работникам?',
		answers: ['Да', 'Нет', 'Затрудняюсь ответить'],
	},
];

const dropdownBtns = document.querySelectorAll(".dropdown__btn");
const dropdowns = document.querySelectorAll(".dropdown");
if (dropdownBtns && dropdowns) {
	dropdowns.forEach((elem) => {
		elem.addEventListener("click", (event) => {
			let dropdownBtn = event.currentTarget.querySelector(".dropdown__btn");
			elem.classList.toggle("dropdown_open");

			elem.addEventListener("focus", (event) => {
				elem.classList.add("dropdown_open");
			});
			elem.addEventListener("blur", (event) => {
				elem.classList.remove("dropdown_open");
			});

			dropdowns.forEach((el) => {
				if (el !== event.currentTarget) {
					el.classList.remove("dropdown_open");
				}
			});
		});
	});
	document.addEventListener("click", (event) => {
		if (!event.target.classList.contains("dropdown__btn")) {
			dropdowns.forEach((item) => item.classList.remove("dropdown_open"));
		}
	});
}

// Валидация формы

const form = document.querySelector(".request__form");

const phoneInput = document.querySelector(".request__input-phone input"),
	nameInput = document.querySelector(".request__input-name input"),
	addressInput = document.querySelector(".request__input-address input"),
	emailInput = document.querySelector(".request__input-email input");

nameInput?.addEventListener("input", () => {
	if (/\d/g.test(nameInput.value)) {
		nameInput.value = nameInput.value.replace(/\d/g, ""); // Убераем все цифры из поля номера телефона
	}
});

phoneInput?.addEventListener("input", () => {
	if (/\D/g.test(phoneInput.value)) {
		phoneInput.value = phoneInput.value.replace(/\D/g, ""); // Убераем все буквы из поля номера телефона
	}
});

const formInputs = document.querySelectorAll(".request__input input");

const handleSubmit = (event) => {
	event.preventDefault();
	formInputs.forEach((input) => {
		input.nextElementSibling?.remove();
		input.classList.remove("error");
	});

	if (phoneInput.value.length !== 10) {
		phoneInput.insertAdjacentHTML(
			"afterend",
			'<p classname="error-message">Телефон должен содержать 10 цифр!</p>',
		);
		phoneInput.classList.add("error");
	}
	if (nameInput.value.length < 3) {
		nameInput.insertAdjacentHTML(
			"afterend",
			'<p classname="error-message">Имя должно быть больше 3 символов!</p>',
		);
		nameInput.classList.add("error");
	}
	if (addressInput.value.length < 10) {
		addressInput.insertAdjacentHTML(
			"afterend",
			'<p classname="error-message">Адрес не может быть меньше 10 символов!</p>',
		);
		addressInput.classList.add("error");
	}
	if (!emailInput.value.includes("@")) {
		emailInput.insertAdjacentHTML(
			"afterend",
			'<p classname="error-message">Email должен содержать символ @!</p>',
		);
		emailInput.classList.add("error");
	}

	const errorValidation = document.querySelector(".error");

	// Если все поля заполнены правильно то показываем модальное окно
	if (!errorValidation) {
		// document.querySelector('.modal').classList.add('modal_show');
		event.target.submit();
		localStorage.clear();
		event.target.reset(); // Очищаем поля формы
	}
};

form?.addEventListener("submit", handleSubmit);

// Модальное окно

const modalCloseBtn = document.querySelector(".modal__close"),
	modal = document.querySelector(".modal");

// Закрытие модального окна на крестик
modalCloseBtn?.addEventListener("click", () => {
	modal.classList.remove("modal_show");
});

// Закрытие моадльного окна на клик вне модального окна
modal?.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.classList.remove("modal_show");
	}
});

// quiz
let step = 0;

function showStatictics() {
	let div = document.createElement("div");
	document.querySelector(".quiz__title").textContent = `Статистика`;
	div.classList.add("result");
	let statistics = ``;
	quiz.forEach(({ question }) => {
		const percentYes = Math.ceil(Math.random() * 100 + 1);
		const percentNo =
			Math.ceil(100 - percentYes - percentYes * 0.2) > 0
				? Math.ceil(100 - percentYes - percentYes * 0.2)
				: 0;
		const percentUndecided =
			Math.ceil(100 - (percentYes + percentNo)) > 0 ? Math.ceil(100 - (percentYes + percentNo)) : 0;
		statistics += `<div class="opinion__statistics-item">
        <div class="title title_fz14 opinion__statistics-title">${question}</div>
        <div class="opinion__statistics-percent"> <span class="yes">${percentYes}%</span> <span class="no">${percentNo}%</span> <span class="undecided">${percentUndecided}%</span> </div>
        <div class="opinion__statistics-scale"><span class="yes" style="width: ${percentYes}%"></span>
		<span class="no" style="width: ${percentNo}%"></span> 
		</div>
    </div>`;
	});
	div.innerHTML = `
	<span class="quiz__thanks">Cпасибо за прохождение опроса!</span>
	<div class="opinion__statistics">
		${statistics}
	</div>
	<div class="opinion__metrics">
	<div class="opinion__metrics-yes metric">Да</div>
	<div class="opinion__metrics-no metric">Нет</div>
	<div class="opinion__metrics-undecided metric">Не определились</div>
	</div>
	`;

	document.querySelector(".quiz-wrapper").append(div);
}

function showQuestion(step) {
	document.querySelector(".answer-button")?.setAttribute("disabled", "true");
	document.querySelector(".question")
		? (document.querySelector(".question").innerHTML = quiz[step].question)
		: "";
	if (step === quiz.length - 1) {
		document.querySelector(".answer-button").textContent = "Показать результаты";
	}
	let answer = ``;
	quiz[step].answers.forEach((ans, i) => {
		answer += `
        <div class="answer-item">
        <label>
        <input type="radio" name="answer" value="${ans}" class="answer-variant" data-variant="${i}"></input>
        <span class="radio-style"></span>
		${ans}
        </label>
        </div>
        `;
	});
	document.querySelector(".answers form")
		? (document.querySelector(".answers form").innerHTML = answer)
		: "";
	const variants = document.querySelectorAll(".answer-variant");
	variants.forEach((variant) => {
		variant.addEventListener("change", () => {
			document.querySelector(".answer-button")?.removeAttribute("disabled");
		});
	});
}

document.addEventListener("DOMContentLoaded", () => {
	let result = {};

	showQuestion(step);
	if (document.querySelector(".answer-button")) {
		document.querySelector(".answer-button").addEventListener("click", (event) => {
			if (step < quiz.length) {
				step++;
				if (step === quiz.length) {
					document.querySelector(".question")?.remove();
					document.querySelector(".answers-block")?.remove();
					showStatictics();
				} else {
					showQuestion(step);
				}
			}
		});
	}
});

// localstorage

const myForm = document.querySelector("form");
const formFields = myForm.elements; // получаем массив элементов полей формы

// function saveToStorage() {
// 	if (window.confirm('Вы согласны на сохранение ваших данных?')) {
// 		if (storageAvailable('localStorage')) {
// 			for (let i = 0; i < formFields.length - 1; i++) {
// 				if (formFields[i].type == 'date') {
// 					const date = +new Date(formFields[i].value);
// 					console.log(date);
// 					localStorage.setItem(formFields[i].name, date.getTime());
// 				}
// 				localStorage.setItem(formFields[i].name, formFields[i].value);
// 			}
// 		} else {
// 			alert('Хранилище не доступно');
// 		}
// 	}
// }
// Проверка хранилища на наличие данных
function checkSotrage() {
	if (storageAvailable("localStorage")) {
		for (let i = 0; i < formFields.length - 1; i++) {
			if (formFields[i].type === "date") {
				formFields[i].value = new Date(localStorage.getItem("date"));
			}
			formFields[i].value = localStorage.getItem(formFields[i].name);
		}
	} else {
		alert("Хранилище не доступно");
	}
}

checkSotrage();

// Очистка формы по кнопке
const clearBtn = document.querySelector(".clear_btn");
clearBtn.addEventListener("click", () => {
	form.reset();
	localStorage.clear();
	alert("Поля формы и локальное хранилище очищено!");
});
// Проверка доступно ли хранилище
function storageAvailable(type) {
	try {
		let storage = window[type];
		let x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return false;
	}
}

let isChanged = false;
let firstWarning = 0;
let isAllowed = false;

function checkIsAllowed() {
	for (let i = 0; i < formFields.length - 1; i++) {
		if (localStorage.getItem(formFields[i].name)) {
			isAllowed = true;
		}
	}
}
function handleInput() {
	if (!firstWarning && !isAllowed) {
		if (window.confirm("Вы согласны на запись ваших данных в хранилище?")) {
			isChanged = true;
		}
		firstWarning++;
	}
	if (isChanged || isAllowed) {
		if (storageAvailable("localStorage")) {
			if (this.type == "date") {
				const date = new Date(this.value);
				const newDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

				localStorage.setItem(this.name, newDate);
			} else {
				localStorage.setItem(this.name, this.value);
			}
		} else {
			alert("Хранилище не допступно!");
		}
	}
}

function attachEvents() {
	for (let i = 0; i < formFields.length - 1; i++) {
		formFields[i].addEventListener("input", handleInput);
	}
}

checkIsAllowed();
attachEvents();
