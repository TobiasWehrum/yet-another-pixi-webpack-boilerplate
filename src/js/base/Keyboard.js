let EventEmitter = require('eventemitter3');

/**
 * A central class to distribute keyboard events.
 */
export class Keyboard extends EventEmitter {
    constructor() {
        super();
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('blur', this.onBlur.bind(this));
        window.addEventListener('focus', this.onFocus.bind(this));
        this.enabled = document.hasFocus();
        this.down = {};
        this.downTracker = {};

        this.registerKeys();
    }

    onKeyDown(e) {
        if (!this.enabled)
            return;

        let keyCode = e.keyCode;
        if (this.downTracker[keyCode])
            return;

        this.down[keyCode] = true;
        this.downTracker[keyCode] = true;
        this.emit("down", keyCode, e);
        this.emit("down" + keyCode, e);
    }

    onKeyUp(e) {
        if (!this.enabled)
            return;

        let keyCode = e.keyCode;
        delete this.down[keyCode];
        delete this.downTracker[keyCode];
        this.emit("up", keyCode, e);
        this.emit("up" + keyCode, e);
    }

    clear(focusLost = false) {
        for (let key in this.down){
            if (this.down.hasOwnProperty(key)){
                delete this.down[key];
            }

            if (focusLost && this.downTracker.hasOwnProperty(key)) {
                delete this.downTracker[key];
            }
        }
    }

    onBlur() {
        // Lost focus. Release all keys.
        this.clear(true);

        this.enabled = false;
        this.emit("lost focus");
    }

    onFocus() {
        // Regained focus
        this.enabled = true;
        this.emit("gained focus");
    }

    registerKeys() {
        // List mainly taken from https://github.com/Cleod9/key-js/blob/master/key.js

        Keyboard.ESC = 27;

        Keyboard.SPACE = 32;

        Keyboard.LEFT = 37;
        Keyboard.TOP = 38;
        Keyboard.RIGHT = 39;
        Keyboard.DOWN = 40;

        Keyboard.A = 65;
        Keyboard.B = 66;
        Keyboard.C = 67;
        Keyboard.D = 68;
        Keyboard.E = 69;
        Keyboard.F = 70;
        Keyboard.G = 71;
        Keyboard.H = 72;
        Keyboard.I = 73;
        Keyboard.J = 74;
        Keyboard.K = 75;
        Keyboard.L = 76;
        Keyboard.M = 77;
        Keyboard.N = 78;
        Keyboard.O = 79;
        Keyboard.P = 80;
        Keyboard.Q = 81;
        Keyboard.R = 82;
        Keyboard.S = 83;
        Keyboard.T = 84;
        Keyboard.U = 85;
        Keyboard.V = 86;
        Keyboard.W = 87;
        Keyboard.X = 88;
        Keyboard.Y = 89;
        Keyboard.Z = 90;

        Keyboard.ALPHA_0 = 48;
        Keyboard.ALPHA_1 = 49;
        Keyboard.ALPHA_2 = 50;
        Keyboard.ALPHA_3 = 51;
        Keyboard.ALPHA_4 = 52;
        Keyboard.ALPHA_5 = 53;
        Keyboard.ALPHA_6 = 54;
        Keyboard.ALPHA_7 = 55;
        Keyboard.ALPHA_8 = 56;
        Keyboard.ALPHA_9 = 57;

        Keyboard.NUMPAD_0 = 96;
        Keyboard.NUMPAD_1 = 97;
        Keyboard.NUMPAD_2 = 98;
        Keyboard.NUMPAD_3 = 99;
        Keyboard.NUMPAD_4 = 100;
        Keyboard.NUMPAD_5 = 101;
        Keyboard.NUMPAD_6 = 102;
        Keyboard.NUMPAD_7 = 103;
        Keyboard.NUMPAD_8 = 104;
        Keyboard.NUMPAD_9 = 105;
        Keyboard.NUMPAD_MULTIPLY = 106;
        Keyboard.NUMPAD_ADD = 107;
        Keyboard.NUMPAD_ENTER = 108;
        Keyboard.NUMPAD_SUBTRACT = 109;
        Keyboard.NUMPAD_DECIMAL = 110;
        Keyboard.NUMPAD_DIVIDE = 111;
    }
}
