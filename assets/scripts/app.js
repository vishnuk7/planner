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

class ToolTip {}

class ProjectItem {
  constructor(id, updateProjectListFuction, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFuction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  connectMoreInfoButton() {}

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
