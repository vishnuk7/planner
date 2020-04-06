class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationSelector = document.querySelector(newDestinationSelector);
    destinationSelector.append(element);
  }

  static clearEventListener(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }

    this.insertBefore = insertBefore;
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.toolTipElement
    );
  }

  detach() {
    if (this.toolTipElement) {
      this.toolTipElement.remove();
    }
  }
}

class ToolTip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.toolTipText = text;
    this.createElement();
  }

  createElement() {
    this.toolTipElement = document.createElement("div");
    this.toolTipElement.textContent = this.toolTipText;
    this.toolTipElement.className = "card";

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

class ProjectItem {
  hasActiveToolTip = false;

  constructor(id, updateProjectListFuction, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFuction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
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

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const projectItems = document.querySelectorAll(`#${this.type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(
          projectItem.id,
          this.switchProject.bind(this),
          this.type
        )
      );
    }
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    console.log(project);
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    this.switchHandler(
      this.projects.find((project) => project.id === projectId)
    );
    this.projects = this.projects.filter((project) => project.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
