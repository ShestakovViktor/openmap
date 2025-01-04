import {SetStoreFunction} from "solid-js/store";

export class Viewport {
    x = 0;

    y = 0;

    width = 0;

    height = 0;

    scale = 1;

    updateId?: number;

    private maxScale = 1 * 2;

    private minScale = 1 / 2;

    private inertia = {x: 0, y: 0};

    private frame: DOMRect;

    private attorMag = 0.4;

    private bndryMag = 0.8;

    private frictMag = 0.95;

    private posBndryMag = 0.08;

    private negBndryMag = 0.01;

    private dragZoom = false;

    private moveTransition?: {
        from: {x: number; y: number};
        to: {x: number; y: number};
    };

    private scaleTransition?: {
        from: number;
        to: number;
        timeStamp: number;
        timeDelta: number;
        shift: {x: number; y: number};
    };

    private focusTransition?: {
        from: {x: number; y: number};
        to: {x: number; y: number};
        timeStamp: number;
        timeDelta: number;
    };

    private mouseDown?: {
        pointer: {x: number; y: number};
    };

    private mouseMove?: {
        pointer: {x: number; y: number};
    };

    private touchStart?: {
        centroid: {x: number; y: number};
        perimeter: number;
        timeStamp: number;
    };

    private touchMove?: {
        centroid: {x: number; y: number};
        perimeter: number;
    };

    constructor(
        private viewerEl: HTMLElement,
        private setState: SetStoreFunction<{
            x: number;
            y: number;
            scale: number;
        }>,
        props: {width: number; height: number}
    ) {
        this.width = props.width;
        this.height = props.height;

        this.frame = viewerEl.getBoundingClientRect();

        viewerEl.addEventListener("mousedown", (event) => this.handleMouseDown(event));
        viewerEl.addEventListener("mousemove", (event) => this.handleMouseMove(event));
        viewerEl.addEventListener("mouseup", () => this.handleMouseUp());
        viewerEl.addEventListener("mouseleave", () => this.handleMouseUp());
        viewerEl.addEventListener("wheel", (event) => this.handleMouseWheel(event));

        viewerEl.addEventListener("touchstart", (event) => this.handleTouchStart(event));
        viewerEl.addEventListener("touchmove", (event) => this.handleTouchMove(event));
        viewerEl.addEventListener("touchend", (event) => this.handleTouchEnd(event));
    }

    handleMouseDown(event: MouseEvent): void {
        this.frame = this.viewerEl.getBoundingClientRect();
        const bndryDirX = this.getBoundryForce(
            this.x,
            this.width * this.scale,
            this.frame.width
        );
        const bndryDirY = this.getBoundryForce(
            this.y,
            this.height * this.scale,
            this.frame.height
        );

        this.moveTransition = {
            from: {x: this.x, y: this.y},
            to: {x: this.x, y: this.y},
        };

        if (bndryDirX) {
            this.moveTransition.from.x = this.x - bndryDirX * this.bndryMag / this.attorMag;
            this.moveTransition.to.x = this.x - bndryDirX * this.bndryMag / this.attorMag;
        }

        if (bndryDirY) {
            this.moveTransition.from.y = this.y - bndryDirY * this.bndryMag / this.attorMag;
            this.moveTransition.to.y = this.y - bndryDirY * this.bndryMag / this.attorMag;
        }

        this.mouseDown = {pointer: {x: event.clientX, y: event.clientY}};
        this.mouseMove = {pointer: {x: event.clientX, y: event.clientY}};
    }

    handleMouseMove(event: MouseEvent): void {
        if (event.buttons != 1) return;
        if (!this.mouseDown || !this.mouseMove) return;

        if (this.moveTransition) {
            this.mouseMove.pointer = {x: event.clientX, y: event.clientY};

            this.moveTransition.to.x = this.moveTransition.from.x
                + this.mouseMove.pointer.x - this.mouseDown.pointer.x;
            this.moveTransition.to.y = this.moveTransition.from.y
                + this.mouseMove.pointer.y - this.mouseDown.pointer.y;
        }

        this.launch();
    }

    handleMouseUp(): void {
        this.moveTransition = undefined;
        this.mouseDown = undefined;
        this.mouseMove = undefined;
    }

    isValidScale(scale: number): boolean {
        return this.minScale < scale  && scale < this.maxScale;
    }

    handleMouseWheel(event: WheelEvent): void {
        event.preventDefault();

        this.frame = this.viewerEl.getBoundingClientRect();
        const zoomDir = -Math.sign(event.deltaY);
        const zoomMag = 0.5;
        const delta = Math.exp(zoomDir * zoomMag);
        const newScale = this.scale * delta;

        if (this.isValidScale(newScale)) {
            this.scaleTransition = {
                from: this.scale,
                to: newScale,
                timeStamp: Date.now(),
                timeDelta: 0,
                shift: {
                    x: (event.clientX - this.frame.x - this.x) * (delta - 1),
                    y: (event.clientY - this.frame.y - this.y) * (delta - 1),
                },
            };
        }
        this.launch();
    }

    isDoubleTap(event: TouchEvent): boolean {
        return this.touchStart != undefined
            && event.touches.length == 1
            && event.timeStamp - this.touchStart.timeStamp < 300;
    }

    handleTouchStart(event: TouchEvent): void {
        event.preventDefault();

        this.frame = this.viewerEl.getBoundingClientRect();

        this.dragZoom =  this.isDoubleTap(event);

        this.moveTransition = {
            from: {x: this.x, y: this.y},
            to: {x: this.x, y: this.y},
        };

        this.touchStart = {
            centroid: this.getCentroid(event),
            perimeter: this.getPerimeter(event),
            timeStamp: event.timeStamp,
        };

        this.touchMove = {
            centroid: this.getCentroid(event),
            perimeter: this.getPerimeter(event),
        };

        this.launch();
    }

    handleTouchMove(event: TouchEvent): void {
        event.preventDefault();
        if (!this.moveTransition || !this.touchStart || !this.touchMove) return;

        if (this.dragZoom) {
            const centroid = this.getCentroid(event);
            const delta = (centroid.y - this.touchMove.centroid.y) * 0.1;
            const scaleDela = Math.exp(delta);
            const newScale = this.scale * scaleDela;

            if (this.isValidScale(newScale)) {
                this.scaleTransition = {
                    from: this.scale,
                    to: newScale,
                    timeStamp: Date.now(),
                    timeDelta: 0,
                    shift: {
                        x: (this.touchStart.centroid.x - this.frame.x - this.x)
                        * (scaleDela - 1),
                        y: (this.touchStart.centroid.y - this.frame.y - this.y)
                        * (scaleDela - 1),
                    },
                };
            }

            this.touchMove.centroid = centroid;
        }
        else {
            this.frame = this.viewerEl.getBoundingClientRect();
            const centroid = this.getCentroid(event);
            const perimeter = this.getPerimeter(event);

            this.moveTransition.to.x = this.moveTransition.from.x
                + (centroid.x - this.touchStart.centroid.x);
            this.moveTransition.to.y = this.moveTransition.from.y
                + (centroid.y - this.touchStart.centroid.y);

            const delta = (perimeter - this.touchMove.perimeter) * 0.05;
            const scaleDelta = Math.exp(delta);
            const newScale = this.scale * scaleDelta;

            if (Math.abs(delta) > 0 && this.isValidScale(newScale)) {
                this.scaleTransition = {
                    from: this.scale,
                    to: newScale,
                    timeStamp: Date.now(),
                    timeDelta: 0,
                    shift: {
                        x: (this.touchStart.centroid.x - this.frame.x - this.x)
                        * (scaleDelta - 1),
                        y: (this.touchStart.centroid.y - this.frame.y - this.y)
                        * (scaleDelta - 1),
                    },
                };
            }

            this.touchMove.perimeter = perimeter;
            this.touchMove.centroid = centroid;

            this.launch();
        }
    }

    handleTouchEnd(event: TouchEvent): void {
        if (event.touches.length == 0) {
            delete this.moveTransition;
            delete this.scaleTransition;
            this.dragZoom = false;
        }
        else {
            this.frame = this.viewerEl.getBoundingClientRect();

            this.moveTransition = {
                from: {x: this.x, y: this.y},
                to: {x: this.x, y: this.y},
            };

            this.touchStart = {
                centroid: this.getCentroid(event),
                perimeter: this.getPerimeter(event),
                timeStamp: event.timeStamp,
            };
        }
    }

    getCentroid(event: TouchEvent): {x: number; y: number} {
        const centroid = {x: 0, y: 0};

        for (const touch of event.touches) {
            centroid.x += touch.clientX;
            centroid.y += touch.clientY;
        }

        centroid.x = centroid.x / event.touches.length;
        centroid.y = centroid.y / event.touches.length;

        return centroid;
    }

    getPerimeter(event: TouchEvent): number {
        let result = 0;
        let prev = event.touches[event.touches.length - 1];
        for (const point of event.touches) {
            result += Math.hypot(
                point.clientX - prev.clientX,
                point.clientY - prev.clientY
            );
            prev = point;
        }

        return result;
    }

    launch(): void {
        if (!this.updateId) requestAnimationFrame(() => this.update());
    }

    getBoundryForce(
        offset: number,
        canvas: number,
        frame: number
    ): number {
        if (canvas > frame ? offset > 0 : offset < 0) {
            return -offset;
        }
        else if (
            canvas > frame
                ? offset + canvas < frame
                : offset + canvas > frame
        ) {
            return frame - (offset + canvas);
        }
        else {
            return 0;
        }
    }

    needUpdatePosition(): boolean {
        return Boolean(this.focusTransition)
            || Boolean(this.moveTransition)
            || Math.abs(this.inertia.x) > .1
            || Math.abs(this.inertia.y) > .1;
    }

    updatePosition(): void {
        const bndryDirX = this.getBoundryForce(
            this.x,
            this.width * this.scale,
            this.frame.width
        );
        const bndryDirY = this.getBoundryForce(
            this.y,
            this.height * this.scale,
            this.frame.height
        );

        if (this.moveTransition) {
            const attorDirX = this.moveTransition.to.x - this.x;
            const attorDirY = this.moveTransition.to.y - this.y;

            this.inertia.x = attorDirX * this.attorMag
                + bndryDirX * this.bndryMag;
            this.inertia.y = attorDirY * this.attorMag
                + bndryDirY * this.bndryMag;
        }
        else {
            if (Math.sign(this.inertia.x) == Math.sign(bndryDirX)) {
                this.inertia.x = bndryDirX * this.posBndryMag;
            }
            else {
                this.inertia.x = (
                    this.inertia.x + bndryDirX * this.negBndryMag
                ) * this.frictMag;
            }

            if (Math.sign(this.inertia.y) == Math.sign(bndryDirY)) {
                this.inertia.y = bndryDirY * this.posBndryMag;
            }
            else {
                this.inertia.y = (
                    this.inertia.y + bndryDirY * this.negBndryMag
                ) * this.frictMag;
            }
        }

        this.x += this.inertia.x;
        this.y += this.inertia.y;
    }

    lerp(v0: number, v1: number, t: number): number {
        return (1 - t) * v0 + t * v1;
    }

    needUpdateScale(): boolean {
        return Boolean(this.scaleTransition);
    }

    updateScale(timeStamp: number): void {
        if (!this.scaleTransition) return;

        const timeDelta
            = Math.min((timeStamp - this.scaleTransition.timeStamp) / 300, 1);

        this.scale = this.lerp(
            this.scaleTransition.from,
            this.scaleTransition.to,
            timeDelta
        );

        const corrX
            = this.lerp(0, this.scaleTransition.shift.x, timeDelta)
            - this.lerp(0, this.scaleTransition.shift.x, this.scaleTransition.timeDelta);

        const corrY
            = this.lerp(0, this.scaleTransition.shift.y, timeDelta)
            - this.lerp(0, this.scaleTransition.shift.y, this.scaleTransition.timeDelta);

        this.x -= corrX;
        this.y -= corrY;

        if (this.moveTransition) {
            this.moveTransition.from.x -= corrX;
            this.moveTransition.from.y -= corrY;

            this.moveTransition.to.x -= corrX;
            this.moveTransition.to.y -= corrY;
        }

        this.scaleTransition.timeDelta = timeDelta;

        if (this.scaleTransition.timeDelta == 1) {
            delete this.scaleTransition;
        }
    }

    focus(x: number, y: number): void {
        this.focusTransition = {
            from: {x: this.x, y: this.y},
            to: {
                x: this.frame.width * .5 - x * this.scale,
                y: this.frame.height * .75 - y * this.scale,
            },
            timeStamp: Date.now(),
            timeDelta: 0,
        };

        delete this.moveTransition;
        delete this.scaleTransition;
        delete this.mouseDown;
        delete this.mouseMove;
        this.inertia.x = 0;
        this.inertia.y = 0;

        this.launch();
    }

    updateTarget(timeStamp: number): void {
        if (!this.focusTransition) return;

        const timeDelta
            = Math.min((timeStamp - this.focusTransition.timeStamp) / 300, 1);

        this.x += this.lerp(
            this.focusTransition.from.x,
            this.focusTransition.to.x,
            timeDelta
        ) - this.lerp(
            this.focusTransition.from.x,
            this.focusTransition.to.x,
            this.focusTransition.timeDelta
        );

        this.y += this.lerp(
            this.focusTransition.from.y,
            this.focusTransition.to.y,
            timeDelta
        ) - this.lerp(
            this.focusTransition.from.y,
            this.focusTransition.to.y,
            this.focusTransition.timeDelta
        );

        this.focusTransition.timeDelta = timeDelta;

        if (this.focusTransition.timeDelta == 1) {
            delete this.focusTransition;
        }
    }

    update(): void {
        const timeStamp = Date.now();

        if (this.focusTransition) this.updateTarget(timeStamp);
        else this.updatePosition();
        this.updateScale(timeStamp);

        this.setState({
            x: this.x,
            y: this.y,
            scale: this.scale,
        });

        if (this.needUpdatePosition() || this.needUpdateScale()) {
            this.updateId = requestAnimationFrame(() => this.update());
        }
        else {
            this.updateId = undefined;
        }
    }
}

