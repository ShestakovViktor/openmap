import {EditorState} from "@feature/editor/type";
import {
    InputMode,
    DefaultView,
    EntitySelect,
    MarkerCreate,
    DecorCreate,
    AreaCreate,
} from "@feature/editor/input";
import {useEditorContext} from "../context";
import {createEffect} from "solid-js";

export class InputManager {
    active: InputMode;

    modes: {[key in EditorState["inputMode"]]: InputMode};

    constructor(viewer: HTMLElement) {
        const editorContex = useEditorContext();

        createEffect(() => {
            this.active = this.modes[editorContex.state.inputMode];
        });

        this.modes = {
            DefaultView: new DefaultView(),
            EntitySelect: new EntitySelect(),
            MarkerCreate: new MarkerCreate(),
            DecorCreate: new DecorCreate(),
            AreaCreate: new AreaCreate(),
        };

        this.active = this.modes.DefaultView;

        viewer.addEventListener("mousedown", (event: MouseEvent) => {
            this.active.onMouseDown(event);
        }, {capture: true});

        viewer.addEventListener("mousemove", (event: MouseEvent) => {
            this.active.onMouseMove(event);
        }, {capture: true});

        viewer.addEventListener("mouseup", (event: MouseEvent) => {
            this.active.onMouseUp(event);
        }, {capture: true});

        viewer.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        }, {capture: true});
    }
}