
// Search and Filter Functionality
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const filterChips = document.querySelectorAll('.filter-chip');
    const projectCards = document.querySelectorAll('.project-card');
    const noResults = document.getElementById('noResults');

    let activeFilter = 'all';

    // Search functionality
    searchInput.addEventListener('input', function () {
        filterProjects();
    });

    // Filter chip functionality
    filterChips.forEach(chip => {
        chip.addEventListener('click', function () {
            // Remove active class from all chips
            filterChips.forEach(c => c.classList.remove('active'));
            // Add active class to clicked chip
            this.classList.add('active');

            activeFilter = this.getAttribute('data-tag');
            filterProjects();
        });
    });

    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        projectCards.forEach(card => {
            const tags = card.getAttribute('data-tags').split(',');
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();

            // Check if project matches search term
            const matchesSearch = searchTerm === '' ||
                title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                tags.some(tag => tag.includes(searchTerm));

            // Check if project matches active filter
            const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);

            if (matchesSearch && matchesFilter) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    }
});

// Smooth scrolling for mobile navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for project cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';

            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});
// Search functionality
const searchInput = document.getElementById('searchInput');
const projectItems = document.querySelectorAll('.project-item');
const noResults = document.getElementById('noResults');

function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeTag = document.querySelector('.tag-filter.active').getAttribute('data-tag');
    let visibleCount = 0;

    projectItems.forEach(item => {
        const title = item.querySelector('.project-title').textContent.toLowerCase();
        const description = item.querySelector('.project-description').textContent.toLowerCase();
        const tags = item.getAttribute('data-tags');

        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesTag = activeTag === 'all' || tags.includes(activeTag);

        if (matchesSearch && matchesTag) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.classList.remove('d-none');
    } else {
        noResults.classList.add('d-none');
    }
}

searchInput.addEventListener('input', filterProjects);

// Tag filter functionality
const tagFilters = document.querySelectorAll('.tag-filter');

tagFilters.forEach(filter => {
    filter.addEventListener('click', function () {
        // Remove active class from all filters
        tagFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        this.classList.add('active');
        // Filter projects
        filterProjects();
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});