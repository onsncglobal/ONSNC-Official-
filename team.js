// Team data
const teamData = {
    core: [
        {
            name: "Shivanta Ronghang",
            role: "Founder & Vision Architect",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Shivanta+Ronghang",
            short: "Leading the Civilization 2.0 mission through science, innovation, and humanity. Passionate about creating sustainable impact through technology and community empowerment.",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "#"
            }
        },
        {
            name: "Dr. A. Das",
            role: "Head – Education & Research",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Dr.+A.+Das",
            short: "Designing inclusive education models for rural transformation. PhD in Educational Technology with 15+ years of experience in curriculum development.",
            social: {
                linkedin: "#",
                researchgate: "#",
                email: "#"
            }
        },
        {
            name: "Priya Sharma",
            role: "Director - Community Development",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Priya+Sharma",
            short: "Building sustainable community programs with focus on women empowerment and youth development. Former NGO program manager with grassroots experience.",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "#"
            }
        },
        {
            name: "Rajesh Kumar",
            role: "Technology Lead",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Rajesh+Kumar",
            short: "Driving technological innovation for social impact. Specialized in developing scalable solutions for education and healthcare in remote areas.",
            social: {
                linkedin: "#",
                github: "#",
                email: "#"
            }
        }
    ],
    advisors: [
        {
            name: "Prof. K. Phukan",
            role: "Advisor – Governance & Policy",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Prof.+K.+Phukan",
            short: "Advising on governance frameworks and institutional development. Former university dean with expertise in public policy and nonprofit management.",
            social: {
                linkedin: "#",
                email: "#"
            }
        },
        {
            name: "Dr. Meera Joshi",
            role: "Scientific Advisor",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Dr.+Meera+Joshi",
            short: "Providing scientific guidance on sustainable development projects. Environmental scientist with 20+ years of research experience.",
            social: {
                linkedin: "#",
                researchgate: "#",
                email: "#"
            }
        },
        {
            name: "Anil Verma",
            role: "Financial Strategy Advisor",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Anil+Verma",
            short: "Expert in nonprofit financial management and sustainable funding models. Chartered accountant with specialization in social enterprises.",
            social: {
                linkedin: "#",
                email: "#"
            }
        }
    ],
    volunteers: [
        {
            name: "Asha Devi",
            role: "Field Volunteer Coordinator",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Asha+Devi",
            short: "Supporting community development and outreach projects. Passionate about women's education and skill development programs.",
            social: {
                email: "#"
            }
        },
        {
            name: "Rohan Singh",
            role: "Digital Volunteer",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Rohan+Singh",
            short: "Managing digital presence and content creation. IT graduate passionate about using technology for social change.",
            social: {
                linkedin: "#",
                email: "#"
            }
        },
        {
            name: "Sunita Patel",
            role: "Education Volunteer",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Sunita+Patel",
            short: "Conducting workshops and teaching sessions in rural communities. Teacher with specialization in innovative teaching methods.",
            social: {
                email: "#"
            }
        },
        {
            name: "Amit Kumar",
            role: "Research Volunteer",
            img: "https://placehold.co/400x500/e6f7ff/0d1b2a?text=Amit+Kumar",
            short: "Assisting in data collection and analysis for community projects. Sociology student passionate about evidence-based social work.",
            social: {
                linkedin: "#",
                email: "#"
            }
        }
    ]
};

// Function to create social icons
function createSocialIcons(socialLinks) {
    if (!socialLinks) return '';
    
    let icons = '';
    
    if (socialLinks.linkedin) {
        icons += `<a href="${socialLinks.linkedin}" class="social-icon" aria-label="LinkedIn">in</a>`;
    }
    if (socialLinks.twitter) {
        icons += `<a href="${socialLinks.twitter}" class="social-icon" aria-label="Twitter">𝕏</a>`;
    }
    if (socialLinks.github) {
        icons += `<a href="${socialLinks.github}" class="social-icon" aria-label="GitHub">git</a>`;
    }
    if (socialLinks.researchgate) {
        icons += `<a href="${socialLinks.researchgate}" class="social-icon" aria-label="ResearchGate">RG</a>`;
    }
    if (socialLinks.email) {
        icons += `<a href="mailto:${socialLinks.email}" class="social-icon" aria-label="Email">@</a>`;
    }
    
    return icons ? `<div class="card-social">${icons}</div>` : '';
}

// Function to create team card
function createCard(member) {
    const div = document.createElement("div");
    div.className = "team-card";
    div.innerHTML = `
        <div class="card-image">
            <img src="${member.img}" alt="${member.name}" loading="lazy">
            <div class="card-overlay">
                ${createSocialIcons(member.social)}
            </div>
        </div>
        <div class="card-content">
            <h3>${member.name}</h3>
            <span class="role">${member.role}</span>
            <p class="short">${member.short}</p>
        </div>
    `;
    return div;
}

// Initialize team sections when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    Object.keys(teamData).forEach(section => {
        const container = document.getElementById(`${section}-team`);
        if (container) {
            teamData[section].forEach(member => {
                container.appendChild(createCard(member));
            });
        }
    });
    
    // Add scroll animation for sections
    const sections = document.querySelectorAll('.team-section, .join-team');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

