import styles from "./FootnoteWidget.module.scss";
import {Accessor, JSX, createMemo} from "solid-js";
import {Footnote} from "@feature/footnote/type";
import {Dynamic} from "solid-js/web";
import {FootnoteFigure} from "@feature/footnote/widget";

type Props = {
    entity: Accessor<Footnote>;
};

export function FootnoteWidget(props: Props): JSX.Element {
    function renderContent(content: string): JSX.Element {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");

        function renderNode(node: Node): JSX.Element {
            const nodeName = node.nodeName.toLowerCase();

            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent;
            }

            if (node.nodeName === "FN-FIGURE") {
                const element = node as HTMLElement;
                const entityId = Number(element.getAttribute("data-entity-id"));
                return <FootnoteFigure entityId={entityId}>{node.textContent}</FootnoteFigure>;
            }

            const children = Array.from(node.childNodes).map(renderNode);
            return <Dynamic component={nodeName}>{children}</Dynamic>;
        }

        return renderNode(doc.body);
    }

    const content = createMemo(() => {
        return renderContent(props.entity().text);
    });

    function handleWheel(event: WheelEvent): void {
        event.stopPropagation();
    }

    return (
        <div
            class={styles.FootnoteWidget}
            onWheel={handleWheel}
        >
            {content()}
        </div>
    );
}

