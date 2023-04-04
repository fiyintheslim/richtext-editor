import { TreeView } from "@lexical/react/LexicalTreeView"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import styles from "./treeView.module.css"

export function TreeViewPlugin() {
    const [editor] = useLexicalComposerContext()
    return <TreeView
        timeTravelButtonClassName={styles.timetravel_button}
        viewClassName={styles.view}
        timeTravelPanelClassName={styles.timetravel_panel}
        timeTravelPanelButtonClassName={styles.timetravel_panel_button}
        timeTravelPanelSliderClassName={styles.timetravel_panel_slider}
        editor={editor}
    />
}