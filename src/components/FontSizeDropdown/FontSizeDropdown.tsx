import { useState, useEffect } from 'react'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection } from 'lexical'
import { $patchStyleText, $getSelectionStyleValueForProperty } from '@lexical/selection'


import styles from "./fontSizeDropdown.module.css"
import sharedStyles from "../../styles/toolbar.module.css"

const fontSizes = [
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
]

export const FontSizeDropdown = () => {
    const [active, setActive] = useState(fontSizes[4])
    const [editor] = useLexicalComposerContext()


    function selectFontSize(val: number) {
        editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {
                    ["font-size"]: `${val}px`
                })
            }
        })

    }

    useEffect(() => {

        editor.registerUpdateListener(() => {
            editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                    const style = $getSelectionStyleValueForProperty(selection, "font-size", "14px").replace("px", "")
                    setActive(+style)
                }
            })
        })

    }, [editor])

    return (
        <div className={`${styles.container} ${sharedStyles.container}`}>
            <div className={sharedStyles.active}>
                <span>{active}px</span>
            </div>
            <div className={`${sharedStyles.dropdown} ${styles.dropdown}`}>
                {fontSizes.map((val, i) => <span key={i} className={sharedStyles.option} onClick={() => selectFontSize(fontSizes[i])}>{val}px</span>)}
            </div>
        </div>
    )
}
