class ToolTip {}

class ProjectItem {}

class ProjectList {
  constructor(type) {
    const projectItem = document.querySelectorAll(`#${type}-projects li`);
    console.log(projectItem);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
  }
}

App.init();
