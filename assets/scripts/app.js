class ToolTip {}

class ProjectItem {
  constructor(id, updateProjectListFuction) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFuction;
    this.connectMoreInfoButton();
    this.connectSwitchButton();
    console.log(this.updateProjectListHandler);
  }

  connectMoreInfoButton() {}

  connectSwitchButton() {
    console.log(this.id);
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelectorAll("button")[1];
    switchBtn.addEventListener("click", this.updateProjectListHandler);
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(projectItem.id, this.switchProject.bind(this))
      );
    }
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject() {
    console.log(this);
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
