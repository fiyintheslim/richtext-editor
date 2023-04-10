import {
  TextNode,
  ParagraphNode,
  NodeKey,
  EditorConfig,
  SerializedElementNode,
} from "lexical";

export class CustomParagraphNode extends ParagraphNode {
  constructor(key?: NodeKey) {
    super(key);
    this.__style = "color: blue";
  }

  static getType() {
    return "custom-paragraph";
  }

  static clone(node: CustomParagraphNode) {
    return new CustomParagraphNode();
  }

  static importJSON(
    serializedNode: SerializedElementNode
  ): CustomParagraphNode {
    const node = $createCustomParagraphNode();
    node.setFormat(serializedNode.format);
    node.setDirection(serializedNode.direction);
    node.setIndent(serializedNode.indent);

    return node;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    element.style.color = this.getLatest().color;
    return element;
  }

  exportJSON(): SerializedElementNode {
    return super.exportJSON();
  }
}

export function $createCustomParagraphNode() {
  return new CustomParagraphNode();
}
