import {PlayerData} from "../example/PlayerData";
import {ScreenExample} from "../example/ScreenExample";
import {Runner} from "../base/Runner";

export class ExampleRunner extends Runner {
    constructor(app, fixedFps, containerElement) {
        super(app, fixedFps, containerElement);

        this.fontStyleNormal = this.createTextStyle("Normal");
    }

    switchToStartScreen() {
        this.switchScreen(new ScreenExample(this, new PlayerData()));
    }
}
