import { Component } from "./Component.js";

export class ToolTip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.toolTipText = text;
    this.createElement();
  }

  createElement() {
    this.toolTipElement = document.createElement("div");
    const toolTipTemplate = document.getElementById("tooltip-template");
    this.toolTipElement.className = "card";
    const toolTipBody = document.importNode(toolTipTemplate.content, true);
    toolTipBody.querySelector("p").textContent = this.toolTipText;
    this.toolTipElement.append(toolTipBody);

    const hostElePosLeft = this.hostElement.offsetLeft;
    const hostElePosTop = this.hostElement.offsetTop;
    const hostEleHeight = this.hostElement.clientHeight;
    const parentEleScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElePosLeft + 20;
    const y = hostElePosTop + hostEleHeight - parentEleScrolling - 10;

    this.toolTipElement.style.position = "absolute";
    this.toolTipElement.style.left = x + "px";
    this.toolTipElement.style.top = y + "px";

    this.toolTipElement.addEventListener("click", this.detach.bind(this));
    this.attach();
  }

  closeToolTip() {
    this.detach();
    this.closeNotifier();
  }
}
