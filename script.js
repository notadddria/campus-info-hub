let resourcesData = [];

fetch("resources.json")
  .then(response => response.json())
  .then(data => {
      resourcesData = data.resources;
      displayResources(resourcesData);
      displayTags(resourcesData);
  })
  .catch(error => console.log("Error loading JSON:", error));

function displayResources(resources) {
    const container = document.getElementById("resources");
    container.innerHTML = "";

    resources.forEach(res => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${res.name}</h3>
            <p><b>Type:</b> ${res.type}</p>
            <p><b>Location:</b> ${res.location}</p>
            <p><b>Program:</b> ${res.program}</p>
            <p><b>Tags:</b> ${res.tags.join(", ")}</p>
            <a href="${res.page}">View page</a>
        `;

        container.appendChild(div);
    });
}

function filterResources(type) {
    if (type === "all") {
        displayResources(resourcesData);
    } else {
        const filtered = resourcesData.filter(r => r.type === type);
        displayResources(filtered);
    }
}

function displayTags(resources) {
    const tagContainer = document.getElementById("tags");
    tagContainer.innerHTML = "";

    const tags = new Set();

    resources.forEach(r => {
        r.tags.forEach(tag => tags.add(tag));
    });

    tags.forEach(tag => {
        const btn = document.createElement("button");
        btn.textContent = tag;

        btn.onclick = () => {
            const filtered = resourcesData.filter(r => r.tags.includes(tag));
            displayResources(filtered);
        };

        tagContainer.appendChild(btn);
    });
}