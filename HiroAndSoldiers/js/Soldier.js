/**
 * Класс "Солдат".
 * @type {Object}
 **/
function Soldier() {
	let data = {
		/**
		 * @type {Hiro}
		 **/
		hiro: undefined
	};
	/**
	 * @param {Hiro} hiro
	 * @public
	 **/
	this.setHiro = function(hiro) {
		if (undefined !== data.hiro) {
			alert('Мой герой "' + data.hiro.getName() + '"! Не стану дезертировать!');
			throw new Error('Герой уже привязан.');
		}
		data.hiro = hiro;
	}
}
