// Fetch projects data and initialize
async function fetchProjects() {
  const response = await fetch('assets/projects.json');
  const projects = await response.json();
  return projects;
}

// Render highlighted projects on main page
async function renderHighlightedProjects() {
  if (!document.getElementById('highlighted-projects-list')) return;
  const projects = await fetchProjects();
  const container = document.getElementById('highlighted-projects-list');

  const highlighted = projects.filter(p => p.highlighted);

  container.innerHTML = highlighted
    .map(
      p => `
      <a href="${p.link}" class="project-card" tabindex="0">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(tag => `<button class="project-tag" type="button" disabled>${tag}</button>`).join('')}
        </div>
      </a>`
    )
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderHighlightedProjects();
});