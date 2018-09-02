/**
 * Класс "Герой".
 * @type {Object}
 **/
function Hiro(name) {
	let data = {
		level: 1,
		battlesCount: 0,
		/**
		 * @type {Array of Soldier}
		 **/
		soldiers: []
	};
	recruitSoldiers();
	this.getName = function() {
		return name;
	};
	this.getLevel = function() {
		return data.level;
	};
	this.getBattlesCount = function() {
		return data.battlesCount;
	};
	this.getSoldiersCount = function() {
		return data.soldiers.length;
	};
	this.getPower = function() {
		let result = data.soldiers.length * data.level;
		return result;
	};
	/**
	 * Рекрутирует солдат для текущего героя.
	 * @private
	 **/
	function recruitSoldiers() {
		let count = parseInt(Math.random() * Hiro.maxSoldiers);
		for (let i = 0; i <= count; i++) {
			let soldier = new Soldier();
			soldier.setHiro(this);
			data.soldiers.push(soldier);
		}
	}
	/**
	 * @private
	 **/
	function levelUp() {
		++data.level;
	};
	/**
	 * Выполняет действие "атака противника".
	 * @public
	 **/
	this.attack = function(enemy) {
		let myPower = this.getPower(),
			enemyPower = enemy.getPower()
		if (myPower > enemyPower) {
			this.setAttackResult(Hiro.AttackResult.WIN);
			enemy.setAttackResult(Hiro.AttackResult.LOSE);
		} else if (myPower < enemyPower) {
			this.setAttackResult(Hiro.AttackResult.LOSE);
			enemy.setAttackResult(Hiro.AttackResult.WIN);
		} else {
			this.setAttackResult(Hiro.AttackResult.DRAW);
			enemy.setAttackResult(Hiro.AttackResult.DRAW);
		}
	};
	/**
	 * Обрадатывает результат сражения.
	 * @public
	 **/
	this.setAttackResult = function(attackResult) {
		++data.battlesCount;
		switch (attackResult) {
			case Hiro.AttackResult.WIN:
				levelUp();
				alert(this.getName() + '/Я победил :)')
				break;
			case Hiro.AttackResult.LOSE:
				alert(this.getName() + '/Я проиграл :(')
				break;
			case Hiro.AttackResult.DRAW:
				alert(this.getName() + '/Ничья. Давай еще раз ;-)')
				break;
			default:
				throw new Error('Не поддерживаемый оезультат соревнования');
		}
	}
}
/**
 * Перечисление "Результат атаки".
 * @type {Object}
 **/
Hiro.AttackResult = {
		/**
		 * Результат - герой победил.
		 * @type {String}
		 **/
		WIN: 'HIRO_WIN',
		LOSE: 'HIRO_LOSE',
		DRAW: 'HIRO_DRAW'
	}
	/**
	 * Опция "Максимальное количество солдат".
	 * @type {Number}
	 **/
Hiro.maxSoldiers = 100;
