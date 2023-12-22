import {useContext} from "@ui/context";
import styles from "./InterfaceLayer.module.scss";
import {ToolBar, SystemBar, StatusBar, TitleBar} from "@ui/layout";


export function InterfaceLayer() {
    const context = useContext();

    const interfaceLayer = document.createElement("div");
    interfaceLayer.id = "interface";
    interfaceLayer.classList.add(styles.InterfaceLayer);

    window.addEventListener("click", (event) => {
        context.input.onMouseClick(event);
    });


    interfaceLayer.appendChild(TitleBar());
    interfaceLayer.appendChild(SystemBar());
    interfaceLayer.appendChild(ToolBar());
    interfaceLayer.appendChild(StatusBar());

    return interfaceLayer;
}