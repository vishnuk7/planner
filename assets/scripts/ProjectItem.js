import { DOMHelper } from "./DOMHelper.js";
import { ToolTip } from "./ToolTip.js";

export class ProjectItem {
  hasActiveToolTip = false;

  constructor(id, updateProjectListFuction, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFuction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
    this.connectDrag();
  }

  showMoreInfoHandler() {
    const projectElement = document.getElementById(this.id);
    const toolTipText = projectElement.dataset.extraInfo;
    if (this.hasActiveToolTip) return;
    const tooltip = new ToolTip(
      () => (this.hasActiveToolTip = false),
      toolTipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveToolTip = true;
  }

  connectDrag() {
    document.getElementById(this.id).addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.id);
      const data = event.dataTransfer.getData("text/plain");
      console.log(data);
      event.dataTransfer.effectAllowed = "move";
    });
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelectorAll("button")[0];
    switchBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelectorAll("button")[1];
    switchBtn = DOMHelper.clearEventListener(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id)
    );
  }

  update(updateProjectListFuction, type) {
    this.updateProjectListHandler = updateProjectListFuction;
    this.connectSwitchButton(type);
  }
}
