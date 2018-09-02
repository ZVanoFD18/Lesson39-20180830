
'use strict';
/**
 * Класс "Приложение".
 * @type {Object}
 **/
function App() {
	let data = {
		isInit: false,
		hiroes: [],
		hiro1: undefined,
		hiro2: undefined
	};
	/**
	 * Выполняет инициализацию объека.
	 **/
	this.init = function(hiroNames) {
			if (data.isInit) {
				console.warn('Попытка повторной инициализации.')
				return;
			}
			if (!hiroNames) {
				throw new Error('Не указаны имена героев.')
			}
			hiroNames.forEach(function(name) {
				data.hiroes.push(new Hiro(name))
			});
			document.getElementById('btnSelectHiro1').onclick = btnSelectHiro1.bind(this);
			document.getElementById('btnSelectHiro2').onclick = btnSelectHiro2.bind(this);
			document.getElementById('btnDoBattle').onclick = btnDoBattle.bind(this);
			data.isInit = true;
		}
		/**
		 * Возвращает случайно выбранного героя, исключая указанного.
		 * @param {Hiro|undefined} excludeHiro - Исключая героя
		 * @param {Number|undefined} attempt - счетчик попыток (рекурсия)
		 **/
	function getRandomHiro(excludeHiro, attempt) {
		attempt = attempt || 0;
		if (data.hiroes.length < 2) {
			throw new Error('Недостаточно героев');
		}
		let newHiroIndex = parseInt(Math.random() * data.hiroes.length - 1);
		let newHiro = data.hiroes[newHiroIndex];
		let result;
		if (newHiro === excludeHiro) {
			result = getRandomHiro(excludeHiro, ++attempt);
		} else {
			result = newHiro;
		}
		console.debug('Выбран случайный герой', result.getName(), 'попытка', attempt,
			'Исключая героя', excludeHiro instanceof Hiro ? excludeHiro.getName() :
			'empty');
		return result;
	}
	/**
	 * Выполняет действие "Выбрать героя 1"
	 **/
	function btnSelectHiro1() {
		data.hiro1 = getRandomHiro(data.hiro2);
		displayHiro(data.hiro1);
	}
	/**
	 * Выполняет действие "Выбрать героя 2"
	 **/
	function btnSelectHiro2() {
		data.hiro2 = getRandomHiro(data.hiro1);
		displayHiro(data.hiro2);
	}
	/**
	 * Выполняет действие "Сражение между выбраными героями"
	 **/
	function btnDoBattle() {
		if (!(data.hiro1 && data.hiro2)) {
			alert('Нужно выбрать героев.');
			return;
		}
		data.hiro1.attack(data.hiro2);
		displayHiro(data.hiro1);
		displayHiro(data.hiro2);
	}
	/**
	 * Выполняет действие "Отобразить информацию о герое"
	 * @param {Hiro} hiro - герой, информацию о котором следует отобразить в HTML.
	 **/
	function displayHiro(hiro) {
		let dom;
		if (hiro === data.hiro1) {
			dom = document.getElementById('hiro1');
		} else {
			dom = document.getElementById('hiro2');
		}
		dom.getElementsByClassName('hiro-name-value')[0].textContent = hiro.getName();
		dom.getElementsByClassName('hiro-level-value')[0].textContent = hiro.getLevel();
		dom.getElementsByClassName('hiro-power-value')[0].textContent = hiro.getPower();
		dom.getElementsByClassName('hiro-battles-value')[0].textContent = hiro.getBattlesCount();
		dom.getElementsByClassName('hiro-soldiers-value')[0].textContent = hiro.getSoldiersCount();
	}
}
