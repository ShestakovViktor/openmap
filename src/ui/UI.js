import {UILayer, ModalLayer} from "@src/ui/layout";
import {InitialDialog} from "@src/ui/feature/project/component";
import {Modal} from "@src/ui/utility";
import {createContext} from "@src/ui/context";


export class UI {
    /**
     * @param {HTMLElement} root
     * @param {import("@src/core").Core} core
     */
    constructor(root, core) {
        const modalLayer = ModalLayer();


        const context = createContext({
            modal: new Modal(modalLayer),
            core
        });


        const uiLayer = UILayer();

        root.appendChild(uiLayer);
        root.appendChild(modalLayer);


        context.modal.render(InitialDialog());
    }
}