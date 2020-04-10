import { ProjectList } from "./ProjectList.js";

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

    // const timer = setTimeout(this.startAnalytics, 3000);

    // const analyticsBtn = document.getElementById("analytics-btn");
    // analyticsBtn.addEventListener("click", () => {
    //   clearTimeout(timer);
    // });
  }

  // static startAnalytics() {
  //   const analyticScript = document.createElement("script");
  //   analyticScript.src = "assets/scripts/analytics.js";
  //   analyticScript.defer = true;
  //   document.head.append(analyticScript);
  // }
}

App.init();
