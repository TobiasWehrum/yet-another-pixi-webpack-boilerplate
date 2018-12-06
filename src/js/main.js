import 'babel-polyfill';
import * as PIXI from 'pixi.js';
import 'pixi-sound';
import {addExtensions} from "./helpers/Utilities";
import {ContainerScaler} from "./base/ContainerScaler";
import {ExampleRunner} from "./example/ExampleRunner";

document.addEventListener('DOMContentLoaded', () => {
    // Create the PixiJS app.
    let app = new PIXI.Application(1280, 720, {
        antialias: true,
        transparent: false,
        resolution: 1,
        backgroundColor : 0xEEEEEE
    });

    // Create the container div and add the PixiJS app to it.
    let containerElement = document.createElement("div");
    containerElement.setAttribute("class", "container");
    document.body.appendChild(containerElement);

    containerElement.appendChild(app.view);

    // Create the ContainerScaler that scales the container div inside the viewport.
    let containerScaler = new ContainerScaler(app.renderer, containerElement);

    // Add any extensions methods that the app uses.
    addExtensions(app);

    // Load the config.json.
    PIXI.loader.add("config", "assets/data/config.json").load(configLoaded);

    function configLoaded() {
        var configResource = PIXI.loader.resources.config;
        if (configResource.error) {
            console.log(configResource.error);
            return;
        }

        // Add all assets from the config.json.
        let assetConfig = configResource.data.assets;
        addMultipleAssetsToConfig(assetConfig.imagesFolder, assetConfig.images, "");
        addMultipleAssetsToConfig(assetConfig.sfxFolder, assetConfig.sfx, "sfx_");

        PIXI.loader
            .on("progress", loadProgressHandler)
            .load(setup);
    }

    function addMultipleAssetsToConfig(basePath, assetListAsObjectDictionary, keyPrefix) {
        for (let assetKey in assetListAsObjectDictionary) {
            if (assetListAsObjectDictionary.hasOwnProperty(assetKey)) {
                PIXI.loader.add(keyPrefix + assetKey, basePath + assetListAsObjectDictionary[assetKey]);
            }
        }
    }

    function loadProgressHandler(loader, resource) {
        //Display the file `url` currently being loaded
        //console.log("loading: " + resource.name + " (" + loader.progress + "%)");

        if (resource.error) {
            // Show any error while loading inside the console.
            console.log(resource.error + "(" + resource.url + ")");
        }
    }

    /**
     * Called when the preloading is finished.
     */
    function setup() {
        // Create the runner.
        const fixedFps = 60;
        const runner = new ExampleRunner(app, fixedFps, containerElement);

        // Switch to the first screen.
        runner.switchToStartScreen();

        // Start the game loop.
        app.ticker.add(delta => runner.update(delta));
    }
}, false);
