class ToolTip {}

class ProjectItem {
  constructor(id) {
    this.id = id;
    console.log(id);
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(new ProjectItem(projectItem.id));
    }
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
  }
}

App.init();
