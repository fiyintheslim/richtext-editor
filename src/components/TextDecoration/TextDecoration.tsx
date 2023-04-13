import { useEffect, useState } from 'react'
import { FaBold, FaItalic } from "react-icons/fa"
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical'
import { $patchStyleText } from '@lexical/selection'

import styles from "./textDecoration.module.css"
import sharedStyles from "../../styles/toolbar.module.css"

export const TextDecoration = () => {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)

    function handleBold() {
        return editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
    }

    function handleItalics() {
        return editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
    }

    useEffect(() => {
        editor.registerUpdateListener(() => {
            editor.update(() => {
                const selection = $getSelection()
                if (!$isRangeSelection(selection)) return
                setIsBold(selection.hasFormat("bold"))
                setIsItalic(selection.hasFormat("italic"))
            })
        })
    }, [editor])

    return (
        <div className={styles.container}>
            <button className={`${styles.bold} ${isBold ? styles.active : ""}`} onClick={() => handleBold()}>
                <FaBold />
            </button>
            <button className={`${styles.italic} ${isItalic ? styles.active : ""}`} onClick={() => handleItalics()}>
                <FaItalic />
            </button>
        </div>
    )
}
