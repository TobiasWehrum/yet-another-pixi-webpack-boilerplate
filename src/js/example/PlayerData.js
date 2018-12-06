let EventEmitter = require('eventemitter3');

export class PlayerData extends EventEmitter {
    constructor() {
        super();

        this.resetGame();

        this.eventNumberChanged = "eventNumberChanged";
        this.eventPlayTimeIntChanged = "eventPlayTimeIntChanged";
    }

    resetGame() {
        this.number = 0;
		this.playTime = 0;
		this.playTimeInt = 0;

        this.emit(this.eventNumberChanged);
		this.emit(this.eventPlayTimeIntChanged);
    }

    increaseNumber() {
        this.number++;
        this.emit(this.eventNumberChanged);
    }

    advancePlayTime(deltaTime) {
        this.playTime += deltaTime;

        let newPlayTimeInt = Math.floor(this.playTime);
        if (this.playTimeInt != newPlayTimeInt) {
            this.playTimeInt = newPlayTimeInt;
            this.emit(this.eventPlayTimeIntChanged);
        }
    }
}