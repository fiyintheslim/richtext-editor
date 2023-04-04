import React from 'react'
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"

import styles from "./editor.module.css"
import { TreeViewPlugin } from '../plugins/TreeViewPlugin'
import { ToolbarPlugin } from '../plugins/ToolbarPlugin/ToolbarPlugin'


export const Editor = () => {
    const config = {
        namespace: "fiyins-richtext-editor",
        onError: () => console.error
    }
    return (
        <LexicalComposer initialConfig={config}>
            <div className={styles.container_outer}>
                <ToolbarPlugin />
                <div className={styles.container_inner}>
                    <RichTextPlugin
                        contentEditable={<ContentEditable className={styles.content_editable} />}
                        placeholder={<p className={styles.placeholder}>Enter text...</p>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <TreeViewPlugin />
                </div>
            </div>


        </LexicalComposer>
    )
}
