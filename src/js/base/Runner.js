import * as PIXI from "pixi.js";
import {Keyboard} from "./Keyboard";

let EventEmitter = require('eventemitter3');

/**
 * The central class that switches between screens, manages entities and calls their update functions and contains
 * general convenience functions that are accesses throughout the app.
 */
export class Runner extends EventEmitter {
    constructor(app, fixedFps, containerElement) {
        super();

        this.app = app;
        this.fixedFps = fixedFps;
        this.containerElement = containerElement;
        this.entities = [];

        this.fixedTimestep = 1 / this.fixedFps;
        this.accumulatedTime = 0;
        this._running = true;

        this.config = PIXI.loader.resources.config.data;

        this._soundOn = true;

        this.useTouch = app.renderer.plugins.interaction.supportsTouchEvents;

        this.keyboard = new Keyboard();
    }

    update() {
        if (!this._running)
            return;

        let deltaTime = this.app.ticker.elapsedMS / 1000;
        if (deltaTime > 1)
            return;

        //console.log(deltaTime);

        this.accumulatedTime += deltaTime;
        while (this.accumulatedTime >= this.fixedTimestep) {
            this.accumulatedTime -= this.fixedTimestep;

            for (let entity of this.entities) {
                if (entity.fixedUpdate)
                    entity.fixedUpdate(this.fixedTimestep);
            }
        }

        for (let entity of this.entities) {
            if (entity.update)
                entity.update(deltaTime);
        }

        if (this.screen && this.screen.update)
            this.screen.update(deltaTime);

        /*
        let fps = 1 / deltaTime;
        if (fps < 40)
            console.log("Low FPS: " + fps);
        */
    }

    addEntity(entity) {
        this.entities.push(entity);

        if (entity.onAdded)
            entity.onAdded();
    }

    removeEntity(entity) {
        let index = this.entities.indexOf(entity);
        if (index == -1) {
            console.log("Entity not found", entity);
            return;
        }

        this.entities.splice(index, 1);

        if (entity.onRemoved)
            entity.onRemoved();
    }

    switchScreen(screen) {
        if (this.screen) {
            this.screen.deactivated();
            this.screen.runner = null;
        }

        this.screen = screen;

        this.keyboard.clear();

        if (this.screen) {
            this.screen.runner = this;
            this.screen.activated();
        }
    }

    playSound(soundName) {
        if (!this.soundOn)
            return;

        soundName = "sfx_" + soundName;
        PIXI.loader.resources[soundName].sound.play();
    }

    get isDebugActive() {
        return this.config.debug.active;
    }

    get shouldShowDebugOverlays() {
        return this.isDebugActive && this.config.debug.showDebugOverlays;
    }

    getText(id, ...args) {
		if (!this.config.texts.hasOwnProperty(id)) {
            console.log("text not found for id: " + id);
            return "[" + id + "]";
        }
		
        let text = this.config.texts[id];

        for (let i = 0; i < args.length; i++) {
            text = text.replace("{" + i + "}", args[i]);
        }

        return text;
    }

    createTextStyle(size) {
        return new PIXI.TextStyle({
                fontFamily: this.config.textStyles.fontFamily,
                fontSize: this.config.textStyles["fontSize" + size],
                align: "center"
        });
    }

    get running() {
        return this._running;
    }

    set running(value) {
        if (this._running == value)
            return;

        this._running = value;
        this.emit("pauseChanged");
    }

    get soundOn() {
        return this._soundOn;
    }

    set soundOn(value) {
        if (this._soundOn == value)
            return;

        this._soundOn = value;

        if (!this._soundOn) {
            PIXI.sound.stopAll();
        }
    }
}
