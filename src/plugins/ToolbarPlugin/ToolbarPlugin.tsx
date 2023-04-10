import { useState, useEffect } from 'react'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { UNDO_COMMAND, REDO_COMMAND, CAN_UNDO_COMMAND, CAN_REDO_COMMAND, COMMAND_PRIORITY_CRITICAL } from "lexical"
import { CiUndo, CiRedo } from "react-icons/ci"
import { mergeRegister } from '@lexical/utils'

import styles from "./toolbarPlugin.module.css"
import { BlockFormatDropdown } from '../../components/BlockFormatDropdown/BlockFormatDropdown'

export const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext()

    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)
    const [isEdtiable, setIsEditable] = useState(false)

    useEffect(() => {
        mergeRegister(
            editor.registerCommand(CAN_REDO_COMMAND, (payload) => {
                setCanRedo(payload)
                return payload
            }, COMMAND_PRIORITY_CRITICAL),

            editor.registerCommand(CAN_UNDO_COMMAND, (payload) => {
                setCanUndo(payload)
                return payload
            },
                COMMAND_PRIORITY_CRITICAL)
        )
    }, [editor])


    return (
        <div className={styles.toolbar}>
            <div className={styles.revision}>
                <CiUndo className={`${canUndo ? "" : styles.disabled}`} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} />
                <CiRedo className={`${canRedo ? "" : styles.disabled}`} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} />
            </div>
            <BlockFormatDropdown />
        </div>
    )
}

// return mergeRegister(
//     editor.registerEditableListener((editable) => {
//         setIsEditable(editable);
//     }),
//     editor.registerUpdateListener(({ editorState }) => {
//         editorState.read(() => {
//             // $updateToolbar();
//         });
//     }),
//     editor.registerCommand<boolean>(
//         CAN_UNDO_COMMAND,
//         (payload) => {
//             setCanUndo(payload);
//             return false;
//         },
//         COMMAND_PRIORITY_CRITICAL,
//     ),
//     editor.registerCommand<boolean>(
//         CAN_REDO_COMMAND,
//         (payload) => {
//             setCanRedo(payload);
//             return false;
//         },
//         COMMAND_PRIORITY_CRITICAL,
//     ),
// );


