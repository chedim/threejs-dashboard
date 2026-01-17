import "wired-card";
import {
  LitElement,
  html,
  css,
} from "lit-element";

import "babylonjs";
import { SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/core/Loading/loadingScreen";

class ThreeJSPanel extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
      canvas: { type: Object },
      engine: { type: BABYLON.Engine },
      scene: { type: BABYLON.Scene },
    };
  }

  constructor() {
    super();
    this.canvas = document.createElement("canvas");
    const engine = this.engine = new BABYLON.Engine(this.canvas, true, null, true);

    this.createScene().then((scene) => {
      // Register a render loop to repeatedly render the scene
      engine.runRenderLoop(function () {
        scene.render();
      });
      // Watch for browser/canvas resize events
      window.addEventListener("resize", function () {
        engine.resize();
      });
    }); //Call the createScene function
  }

  render() {
    return html`${this.canvas}`
  }

  static get styles() {
    return css`
      canvas {
        width: 100%;
        height: 100%;
        touch-action: none;
      }
    `;
  }

  async createScene() {
    // Creates a basic Babylon Scene object
    const scene = this.scene = new BABYLON.Scene(this.engine);
    // Creates and positions a free camera
    const camera = new BABYLON.ArcRotateCamera("camera1", 0.75, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light",
        new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;
    // Built-in 'sphere' shape.
    // const sphere = BABYLON.MeshBuilder.CreateSphere("sphere",
    //     {diameter: 2, segments: 32}, scene);
    // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;
    const importResult = await SceneLoader.ImportMeshAsync("sailboat", "https://ha-dashboard.agatha.boats/assets/", "sailboat.obj", scene, null, "obj");
    // Built-in 'ground' shape.
    // const ground = BABYLON.MeshBuilder.CreateGround("ground",
    //     {width: 6, height: 6}, scene);
    return this.scene;
  }
}
customElements.define("sudo-dashboard", ThreeJSPanel);
