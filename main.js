document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const body = document.body;
    const courseGrid = document.getElementById('courseGrid');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

    // Function to create course card
    function createCourseCard(course) {
        return `
            <div class="course-card">
                <img src="${course.image}" alt="${course.title}">
                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p class="instructor">${course.instructor}</p>
                    <div class="rating">${course.rating} ⭐ (${course.reviews} reviews)</div>
                    <div class="price">₹${course.price}</div>
                </div>
            </div>
        `;
    }

    // Function to display courses
    function displayCourses(category) {
        courseGrid.innerHTML = '';
        let coursesToDisplay = [];

        if (category === 'all') {
            // Display all courses
            Object.values(coursesData).forEach(categoryCourses => {
                coursesToDisplay = [...coursesToDisplay, ...categoryCourses];
            });
        } else {
            // Display courses for specific category
            coursesToDisplay = coursesData[category] || [];
        }

        coursesToDisplay.forEach(course => {
            courseGrid.innerHTML += createCourseCard(course);
        });
    }

    // Initial display of all courses
    displayCourses('all');

    // Sidebar navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Display courses for selected category
            const category = link.getAttribute('data-category');
            displayCourses(category);

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                body.classList.add('sidebar-closed');
                body.classList.remove('sidebar-open');
            }
        });
    });

    // Toggle sidebar
    menuToggle.addEventListener('click', () => {
        body.classList.toggle('sidebar-closed');
        body.classList.toggle('sidebar-open');
    });

    // Close sidebar
    closeSidebar.addEventListener('click', () => {
        body.classList.add('sidebar-closed');
        body.classList.remove('sidebar-open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const sidebar = document.getElementById('sidebar');
            const isClickInside = sidebar.contains(e.target) || menuToggle.contains(e.target);
            
            if (!isClickInside && body.classList.contains('sidebar-open')) {
                body.classList.add('sidebar-closed');
                body.classList.remove('sidebar-open');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            body.classList.remove('sidebar-open');
            if (!body.classList.contains('sidebar-closed')) {
                body.classList.remove('sidebar-closed');
            }
        } else {
            body.classList.add('sidebar-closed');
        }
    });
});