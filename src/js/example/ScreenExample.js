import * as PIXI from "pixi.js";
import {Keyboard} from "../base/Keyboard";

export class ScreenExample {
    constructor(runner, playerData) {
        this.runner = runner;
        this.stage = runner.app.stage;
        this.keyboard = runner.keyboard;
        this.playerData = playerData;

        this.container = new PIXI.Container();

        let background = new PIXI.Sprite(PIXI.loader.resources.exampleImage.texture);
        this.container.addChild(background);

        let renderer = runner.app.renderer;
        this.exampleText = new PIXI.Text(runner.getText("startScreenExampleText"), runner.fontStyleNormal);
        this.exampleText.x = renderer.width / 2 + 50;
        this.exampleText.y = renderer.height / 2 - 50;
        this.exampleText.anchor.set(0, 0.5);
        this.container.addChild(this.exampleText);

        this.number = 0;
    }

    activated() {
        this.runner.app.stage.addChild(this.container);

        this.stage.on('touchstart', this.counterUp, this);
        this.stage.on('mousedown', this.counterUp, this);
        this.keyboard.on("down", this.onKeyDown, this);
        this.playerData.on(this.playerData.eventNumberChanged, this.onNumberChanged, this);

        this.stage.interactive = true;
    }

    deactivated() {
        this.runner.app.stage.removeChild(this.container);

        this.stage.removeListener('touchstart', this.counterUp, this);
        this.stage.removeListener('mousedown', this.counterUp, this);
        this.keyboard.removeListener("down", this.onKeyDown, this);
        this.playerData.removeListener(this.playerData.eventNumberChanged, this.onNumberChanged, this);
    }

    onKeyDown(keyCode, e) {
        if (keyCode === Keyboard.SPACE) {
            e.preventDefault();
            this.counterUp();
        }
    }

    counterUp() {
        this.runner.playSound("exampleSound");
        this.playerData.increaseNumber();
    }

    onNumberChanged() {
        this.exampleText.text = this.playerData.number;
    }
}