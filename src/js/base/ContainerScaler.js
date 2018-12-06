/**
 * Scales the container div inside the viewport.
 */
export class ContainerScaler {
    constructor(renderer, container) {
        this.renderer = renderer;
        this.containerElement = container;
        this.scaleContainerElement();

        window.addEventListener('resize', this.scaleContainerElement.bind(this));
    }

    scaleContainerElement() {
        let browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let browserHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        let scale = Math.min(
            browserWidth / this.renderer.width,
            browserHeight / this.renderer.height
        );

        this.containerElement.setAttribute("style", "transform: translate(-50%, -50%) scale(" + scale + ")");
    }
}