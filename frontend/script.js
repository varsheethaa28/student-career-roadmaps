
const filterButtons = document.querySelectorAll(".filter");
const roadmapCards = document.querySelectorAll(".roadmap-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.dataset.filter;

    roadmapCards.forEach((card) => {
      const category = card.dataset.category;

      card.style.display =
        selectedCategory === "all" || category === selectedCategory
          ? ""
          : "none";
    });
  });
});

const roadmaps = {
  "Cybersecurity": {
    description: "Build a foundation in computer networks, Linux, and cybersecurity.",
    steps: [
      "Learn computer and networking fundamentals",
      "Study Linux and command-line basics",
      "Understand security principles and common threats",
      "Practice in legal cybersecurity labs",
      "Build a security-related project"
    ]
  },

  "Web Development": {
    description: "Learn how websites work and develop practical frontend skills.",
    steps: [
      "Learn HTML structure and semantic elements",
      "Learn CSS layouts and responsive design",
      "Study JavaScript fundamentals",
      "Build responsive websites",
      "Learn Git and deployment"
    ]
  },

  "Artificial Intelligence": {
    description: "Explore programming, data, and introductory machine learning.",
    steps: [
      "Learn Python programming",
      "Study basic mathematics and data handling",
      "Understand machine learning fundamentals",
      "Practice with beginner datasets",
      "Build an introductory AI project"
    ]
  },

  "Data Analytics": {
    description: "Learn how to organize, analyze, and communicate data.",
    steps: [
      "Learn spreadsheet fundamentals",
      "Study SQL basics",
      "Learn Python for data analysis",
      "Practice data visualization",
      "Build a data analytics portfolio project"
    ]
  },

  "UI/UX Design": {
    description: "Develop skills for designing usable and accessible interfaces.",
    steps: [
      "Learn design principles",
      "Study user research fundamentals",
      "Practice wireframing",
      "Learn interface design tools",
      "Create and present a design case study"
    ]
  },

  "Cloud Computing": {
    description: "Explore cloud infrastructure and deployment fundamentals.",
    steps: [
      "Learn networking and operating system basics",
      "Study cloud computing concepts",
      "Practice Linux and command-line tools",
      "Explore a cloud provider's learning resources",
      "Deploy a simple project"
    ]
  }
};

const detailsSection = document.getElementById("roadmap-details");
const detailsTitle = document.getElementById("details-title");
const detailsDescription = document.getElementById("details-description");
const detailsSteps = document.getElementById("details-steps");
const closeDetails = document.getElementById("close-details");

document.querySelectorAll(".learn-button").forEach((button) => {
  button.addEventListener("click", () => {
    const career = button.dataset.career;
    const roadmap = roadmaps[career];

    if (!roadmap) return;

    detailsTitle.textContent = career + " Roadmap";
    detailsDescription.textContent = roadmap.description;
    detailsSteps.innerHTML = "";

    roadmap.steps.forEach((step) => {
      const listItem = document.createElement("li");
      listItem.textContent = step;
      detailsSteps.appendChild(listItem);
    });

    detailsSection.hidden = false;
    detailsSection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});

closeDetails.addEventListener("click", () => {
  detailsSection.hidden = true;
});