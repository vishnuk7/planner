class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationSelector = document.querySelector(newDestinationSelector);
    destinationSelector.append(element);
  }
}

class ToolTip {}

class ProjectItem {
  constructor(id, updateProjectListFuction) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFuction;
    this.connectMoreInfoButton();
    this.connectSwitchButton();
  }

  connectMoreInfoButton() {}

  connectSwitchButton() {
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelectorAll("button")[1];
    switchBtn.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id)
    );
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const projectItems = document.querySelectorAll(`#${this.type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(projectItem.id, this.switchProject.bind(this))
      );
    }
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
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
