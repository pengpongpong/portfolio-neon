import {
    AdditiveBlending,
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    Mesh, MeshBasicMaterial,
    Path, PerspectiveCamera,
    PlaneGeometry,
    Points,
    Raycaster,
    Scene,
    ShaderMaterial,
    Shape,
    ShapeGeometry,
    Texture,
    Vector2,
    Vector3,
    WebGLRenderer,
} from "three";
import type { Font } from "three-stdlib"

export type Data = {
    text: string;
    amount: number;
    particleSize: number;
    particleColor: number;
    textSize: number;
    area: number;
    ease: number,
}

export class CreateParticles {
    private renderer: WebGLRenderer
    private scene: Scene
    private font: Font
    private particleImg: Texture
    private camera: PerspectiveCamera
    private raycaster: Raycaster
    private mouse: Vector2
    private button: boolean
    private data: Data
    private planeArea!: Mesh
    private particles!: Points
    private geometryCopy!: BufferGeometry
    private delta: number;
    private strength: { mobile: number, desktop: number };

    constructor(renderer: WebGLRenderer, scene: Scene, font: Font, particleImg: Texture, camera: PerspectiveCamera, data: Data) {

        this.renderer = renderer;
        this.scene = scene;
        this.font = font;
        this.particleImg = particleImg;
        this.data = data;
        this.camera = camera;

        this.raycaster = new Raycaster();
        this.mouse = new Vector2(0, -10);

        this.button = false;
        this.setup();
        this.bindEvents();

        this.delta = 0;
        this.strength = { mobile: 40, desktop: 80 }
    }

    setup() {
        const geometry = new PlaneGeometry(this.visibleWidthAtZDepth(100, this.camera), this.visibleHeightAtZDepth(500, this.camera));
        const material = new MeshBasicMaterial({ color: 0x000000, transparent: false });
        this.planeArea = new Mesh(geometry, material);
        this.planeArea.visible = true;
        this.createText();
    }

    bindEvents() {
        document.addEventListener("mousedown", this.onMouseDown.bind(this));
        document.addEventListener("mousemove", this.onMouseMove.bind(this));
        document.addEventListener("mouseup", this.onMouseUp.bind(this));

        document.addEventListener("touchstart", this.onTouchDown.bind(this));
        document.addEventListener("touchmove", this.onTouchMove.bind(this));
        document.addEventListener("touchend", this.onTouchUp.bind(this));
    }

    onMouseDown(event: MouseEvent) {
        const canvas = document.getElementById("particleCanvas")
        if (canvas) {
            canvas.style.zIndex = "5";
        }

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        const vector = new Vector3(this.mouse.x, this.mouse.y, 0.5);
        vector.unproject(this.camera);

        this.button = true;
        this.data.ease = this.delta * this.strength.desktop * .2;
    }

    getDelta(delta: number) {
        this.delta = delta
    }
    onMouseUp() {
        const canvas = document.getElementById("particleCanvas")
        if (canvas) {
            canvas.style.zIndex = "0";
        }

        this.button = false;
        this.data.ease = this.delta * this.strength.desktop;
    }

    onMouseMove(event: MouseEvent) {
        const canvas = document.getElementById("particleCanvas")
        if (canvas) {
            canvas.style.zIndex = "5";
        }

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    onTouchDown(event: TouchEvent) {
        const canvas = document.getElementById("particleCanvas")

        if (canvas) {
            canvas.style.zIndex = "5";
        }

        this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.touches[0].clientY / window.innerHeight) * 2 + 1;

        const vector = new Vector3(this.mouse.x, this.mouse.y, 0.5);
        vector.unproject(this.camera);

        this.button = true;
        this.data.ease = this.delta * this.strength.mobile;
    }

    onTouchUp() {
        const canvas = document.getElementById("particleCanvas")
        if (canvas) {
            canvas.style.zIndex = "0";
        }

        this.button = false;

        this.data.ease = this.delta * this.strength.mobile;

        setTimeout(() => {
            this.mouse = new Vector2(0, -10)
        }, 100)

    }

    onTouchMove(event: TouchEvent) {
        const canvas = document.getElementById("particleCanvas")
        document.body.style.overflow = "hidden";
        if (canvas) {
            canvas.style.zIndex = "5";
        }

        this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.touches[0].clientY / window.innerHeight) * 2 + 1;
    }

    getDistanceTop() {
        const screenPosition = new Vector3();
        this.particles.position.copy(screenPosition);
        screenPosition.project(this.camera);

        const distanceToTop = ((1 - screenPosition.y) / 2) * window.innerHeight;

        return distanceToTop
    }

    removeAllObjectsFromScene() {
        // Remove all objects from the scene
        while (this.scene.children.length > 0) {
            const object = this.scene.children[0];
            this.scene.remove(object);

            // Dispose of the object's geometry and material
            if (object instanceof Mesh) {
                if (object.geometry) {
                    object.geometry.dispose();
                }
                if (object.material) {
                    object.material.dispose();
                }
            }
        }
    }

    createText() {
        this.removeAllObjectsFromScene() // remove old particles from scene
        let thePoints: Vector3[] = [];

        let shapes = this.font.generateShapes(this.data.text, this.data.textSize);
        let geometry = new ShapeGeometry(shapes);
        geometry.computeBoundingBox();

        const xMid = - 0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);
        const yMid = (geometry.boundingBox!.max.y - geometry.boundingBox!.min.y) / 2.85;

        geometry.center();

        let holeShapes: Path[] = [];

        // get hole-shapes from shapes in letter like "O", "P"
        for (let q = 0; q < shapes.length; q++) {

            let shape = shapes[q];

            if (shape.holes && shape.holes.length > 0) {

                for (let j = 0; j < shape.holes.length; j++) {

                    let hole = shape.holes[j];
                    holeShapes.push(hole);
                }
            }

        }
        shapes.push.apply(shapes, holeShapes as Shape[]);

        let sizes: number[] = [];

        // create points from shape
        for (let x = 0; x < shapes.length; x++) {

            let shape = shapes[x];

            const amountPoints = (shape.type == 'Path') ? this.data.amount / 2 : this.data.amount;

            let points = shape.getSpacedPoints(amountPoints);

            points.forEach((element: Vector2, z: number) => {

                const a = new Vector3(element.x, element.y, 0);
                thePoints.push(a);
                sizes.push(1)

            });
        }

        let geoParticles = new BufferGeometry().setFromPoints(thePoints);
        geoParticles.translate(xMid, yMid, 0);

        geoParticles.setAttribute('size', new Float32BufferAttribute(sizes, 1));

        const material = new ShaderMaterial({

            uniforms: {
                color: { value: new Color(this.data.particleColor) },
                pointTexture: { value: this.particleImg }
            },
            vertexShader: `
            attribute float size;

            void main() {

              vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
              gl_PointSize = size * ( 300.0 / -mvPosition.z );
              gl_Position = projectionMatrix * mvPosition;

            }`,
            fragmentShader: `
            uniform vec3 color;
            uniform sampler2D pointTexture;

            void main() {

              gl_FragColor = vec4( color, 1.0 );
              gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );}`,
            blending: AdditiveBlending,
            depthTest: false,
            transparent: true,
        });

        this.particles = new Points(geoParticles, material);

        const size = this.particles.geometry.attributes.size;

        for (let i = 0; i < size.array.length; i++) {
            size.array[i] = this.data.particleSize;
        }

        this.scene.add(this.particles);

        this.geometryCopy = new BufferGeometry();
        this.geometryCopy.copy(this.particles.geometry);

    }

    renderParticleAnimation() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObject(this.planeArea);

        if (intersects.length > 0) {

            const pos = this.particles.geometry.attributes.position;
            const copy = this.geometryCopy.attributes.position;
            const size = this.particles.geometry.attributes.size;

            const mx = intersects[0].point.x;
            const my = intersects[0].point.y;
            // const mz = intersects[0].point.z;

            // loop through particles
            for (var i = 0, l = pos.count; i < l; i++) {

                // particle position initial 
                const initX = copy.getX(i);
                const initY = copy.getY(i);
                const initZ = copy.getZ(i);

                // particles position
                let px = pos.getX(i);
                let py = pos.getY(i);
                let pz = pos.getZ(i);

                // distance xyz mouse - particle
                let dx = mx - px;
                let dy = my - py;
                // const dz = mz - pz;

                // force for moving/pulling particles
                // const mouseDistance = this.distance(mx, my, px, py)
                let d = (dx = mx - px) * dx + (dy = my - py) * dy;
                const f = - this.data.area / d;

                // pull particles if mouse button clicked
                if (this.button) {

                    // pull particles
                    const t = Math.atan2(dy, dx); // angle from distance mouse - particle for direction
                    px -= f * Math.cos(t); // move particle, force * direction
                    py -= f * Math.sin(t);

                    // move particles while not pressing mouse button
                } else {
                    // if (mouseDistance < this.data.area * 20) { 
                    if (i % 5 === 0) {

                        // distance starting point particles moving back to old position .003
                        const t = Math.atan2(dy, dx);
                        px -= .003 * Math.cos(t);
                        py -= .003 * Math.sin(t);

                        // set size on particles inside raycaster
                        size.array[i] = this.data.particleSize / 1.3;
                        size.needsUpdate = true;

                    } else {
                        // move particles away around raycaster
                        const t = Math.atan2(dy, dx);
                        px += f * Math.cos(t) * .5;
                        py += f * Math.sin(t) * .5;

                        pos.setXYZ(i, px, py, pz);
                        pos.needsUpdate = true;

                        // set size on particles moving away from raycaster
                        size.array[i] = this.data.particleSize * 1.1;
                        size.needsUpdate = true;
                    }

                    // check on particles on border of raycaster
                    if ((px > (initX + 10)) || (px < (initX - 10)) || (py > (initY + 10) || (py < (initY - 10)))) {

                        // set size on particles
                        size.array[i] = this.data.particleSize / 3;
                        size.needsUpdate = true;

                    }
                    // }
                }

                // move particles back to initial position gradually
                px += (initX - px) * this.data.ease;
                py += (initY - py) * this.data.ease;
                pz += (initZ - pz) * this.data.ease;

                pos.setXYZ(i, px, py, pz);
                pos.needsUpdate = true;

            }
        }
    }

    render() {
        this.renderParticleAnimation()
        this.renderer?.render(this.scene, this.camera)
    }

    // calculate width + height for planeArea (for mouse events)
    visibleHeightAtZDepth(depth: number, camera: PerspectiveCamera) {
        const cameraOffset = camera.position.z;
        if (depth < cameraOffset) depth -= cameraOffset;
        else depth += cameraOffset;

        const vFOV = camera.fov * Math.PI / 180;

        return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
    }

    visibleWidthAtZDepth(depth: number, camera: PerspectiveCamera) {
        const height = this.visibleHeightAtZDepth(depth, camera);
        return height * camera.aspect;
    }

    // distance of x, y in 2D space
    distance(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }
}