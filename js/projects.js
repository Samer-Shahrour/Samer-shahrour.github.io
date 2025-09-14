// Fetch projects data and initialize
async function fetchProjects() {
    const response = await fetch('assets/projects.json');
    const projects = await response.json();
    return projects;
  }
  
  // Render all projects on projects page with filtering
  async function renderProjectsPage() {
    if (!document.getElementById('projects-list')) return;
    const projects = await fetchProjects();
  
    const priorityTags = ['Java', 'C++', 'Python', 'Rust'];
    const tagsSet = new Set();
    projects.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
  
    const temp = [...tagsSet]
    const allTags = [
      ...priorityTags.filter(t => temp.includes(t)),
      ...temp
      .filter(t => !priorityTags.includes(t))
      .sort()
    ];
  
    const tagsContainer = document.getElementById('tags-container');
    const projectsList = document.getElementById('projects-list');
  
    // Render tag buttons
    tagsContainer.innerHTML = allTags
      .map(tag => `<button class="project-tag" type="button" data-tag="${tag}">${tag}</button>`)
      .join('');
  
    // State for filtering
    let activeTag = null;
  
    // Render projects function
    function renderProjects(filteredTag = null) {
      let filtered = projects;
      if (filteredTag) {
        filtered = projects.filter(p => p.tags.includes(filteredTag));
      }
      projectsList.innerHTML = filtered
        .map(
          p => `
          <article id="project-${p.id}" class="card project-card" tabindex="0" aria-label="Project: ${p.title}">
            <h3> ${p.title}</h3>
            <p>${p.description}
             ${p.extra_description ? `<br>${p.extra_description}` : '</p>'}
            <div class="project-tags">
              ${p.tags
                .map(
                  tag =>
                    `<button class="project-tag" type="button" data-tag="${tag}" aria-label="Filter projects by tag ${tag}">${tag}</button>`
                )
                .join('')}
            </div>
          </article>
        `
        )
        .join('');
    }
  
    renderProjects();
  
    // Tag click handler (delegation)
    tagsContainer.addEventListener('click', e => {
      if (!e.target.classList.contains('project-tag')) return;
  
      const tag = e.target.getAttribute('data-tag');
      if (!tag) return;
  
      if (activeTag === tag) {
        activeTag = null;
      } else {
        activeTag = tag;
      }
  
      // Update active tag button styles in tagsContainer
      [...tagsContainer.children].forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tag') === activeTag);
      });
  
      renderProjects(activeTag);
    });
  
    // Also handle clicks on project card tags to filter
    projectsList.addEventListener('click', e => {
      if (!e.target.classList.contains('project-tag')) return;
      const tag = e.target.getAttribute('data-tag');
      if (!tag) return;
  
      if (activeTag === tag) {
        activeTag = null;
      } else {
        activeTag = tag;
      }
  
      [...tagsContainer.children].forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tag') === activeTag);
      });
  
      renderProjects(activeTag);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderProjectsPage();
  });
  