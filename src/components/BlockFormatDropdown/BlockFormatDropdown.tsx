import { useState, useEffect } from 'react'
import { GrTextAlignFull } from "react-icons/gr"
import { LexicalEditor, $getSelection, $isRangeSelection, $createParagraphNode, TextNode, $insertNodes, ElementNode } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $setBlocksType } from '@lexical/selection'
import { $createHeadingNode } from "@lexical/rich-text"
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_CHECK_LIST_COMMAND } from '@lexical/list'

import styles from "./blockFormatDropdown.module.css"
import { CustomParagraphNode } from '../../nodes'

const options = [
    {
        title: "Normal",
        icon: <GrTextAlignFull />,
        tag: "p"
    },
    {
        title: "Heading 1",
        icon: <GrTextAlignFull />,
        tag: "h1"
    },
    {
        title: "Heading 2",
        icon: <GrTextAlignFull />,
        tag: "h2"
    },
    {
        title: "Heading 3",
        icon: <GrTextAlignFull />,
        tag: "h3"
    },
    {
        title: "List",
        icon: <GrTextAlignFull />,
        tag: "ul"
    },
    {
        title: "Ordered list",
        icon: <GrTextAlignFull />,
        tag: "ol"
    },
    {
        title: "Check list",
        icon: <GrTextAlignFull />,
        tag: "check"
    },
]

export const BlockFormatDropdown = () => {
    const [active, setActive] = useState(options[0])
    const [editor] = useLexicalComposerContext()

    function handleBlockFormatSelect(i: number, tag: string) {
        setActive(options[i])
        editor.update(() => {
            const selection = $getSelection()
            const isSelection = $isRangeSelection(selection)

            // $insertNodes([new ElementNode()])
            if (isSelection) {
                switch (tag) {
                    case "p":
                        $setBlocksType(selection, () => $createParagraphNode())
                        break
                    case "h1":
                        $setBlocksType(selection, () => $createHeadingNode(tag))
                        break
                    case "h2":
                        $setBlocksType(selection, () => $createHeadingNode(tag))
                        break
                    case "h3":
                        $setBlocksType(selection, () => $createHeadingNode(tag))
                        break
                    case "ul":
                        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
                        break
                    case "ol":
                        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
                        break
                    case "check":
                        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
                    default:
                        console.log("Not set yet")
                }
            }
        })
    }

    useEffect(() => {
        editor.registerUpdateListener(() => {
            console.log("Editor updated")
        })
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.active}>
                {active.icon}
                <span>{active.title}</span>
            </div>
            <div className={styles.dropdown}>
                {options.map((opt, i) => <div key={i} className={styles.option} onClick={() => handleBlockFormatSelect(i, opt.tag)}>
                    {opt.icon}
                    <span>{opt.title}</span>
                </div>)}
            </div>
        </div>
    )
}
