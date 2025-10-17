document.addEventListener('DOMContentLoaded', () => {
    fetch('site_content.json')
        .then(response => response.json())
        .then(data => {
            buildPage(data);
            setupEventListeners();
        })
        .catch(error => console.error('Error loading site content:', error));
});

function buildPage(data) {
    document.title = data.title;

    const body = document.body;

    const header = document.createElement('header');
    header.innerHTML = `
        <div class="container">
            <div class="logo">${data.header.logo}</div>
            <nav>
                <button class="nav-toggle" aria-label="メニューを開閉">☰</button>
                <ul>
                    ${data.header.nav.map(item => `<li><a href="${item.href}">${item.text}</a></li>`).join('')}
                </ul>
            </nav>
        </div>
    `;
    body.appendChild(header);

    const main = document.createElement('main');

    const heroSection = document.createElement('section');
    heroSection.id = 'hero';
    heroSection.innerHTML = `
        <video autoplay muted loop playsinline poster="${data.hero.poster}">
            <source src="${data.hero.video}" type="video/mp4">
            ご利用のブラウザはビデオタグをサポートしていません。
        </video>
        <div class="hero-gradient"></div>
        <div class="container">
            <div class="hero-copy">
                <span class="hero-badge">AI + Web Consulting</span>
                <h1>${data.hero.title}</h1>
                <p>${data.hero.subtitle}</p>
                <a href="${data.hero.cta.href}" class="cta-button">${data.hero.cta.text}</a>
            </div>
        </div>
    `;
    main.appendChild(heroSection);

    main.innerHTML += `
        <section id="problems">
            <div class="container">
                <div class="section-intro">
                    <span class="section-tag">CHALLENGES</span>
                    <h2>${data.problems.title}</h2>
                </div>
                <div class="card-grid">
                    ${data.problems.cards.map(card => `
                        <article class="card">
                            <h3>${card.title}</h3>
                            <p>${card.text}</p>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>
        
        <section id="solution">
            <div class="container split">
                <div class="section-intro">
                    <span class="section-tag">SOLUTION</span>
                    <h2>${data.solution.title}</h2>
                </div>
                <p class="lead">${data.solution.text}</p>
            </div>
        </section>

        <section id="services">
            <div class="container">
                <div class="section-intro">
                    <span class="section-tag">SERVICES</span>
                    <h2>${data.services.title}</h2>
                </div>
                <div class="service-grid">
                     ${data.services.cards.map(card => `
                        <article class="service-card">
                            <div class="service-card__header">
                                <span class="service-icon">⚙️</span>
                                <h3>${card.title}</h3>
                            </div>
                            <p>${card.text}</p>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="approach">
            <div class="container">
                <div class="section-intro">
                    <span class="section-tag">PROCESS</span>
                    <h2>${data.approach.title}</h2>
                </div>
                <div class="approach-content">
                    <div class="approach-image">
                        <img src="${data.approach.image}" alt="${data.approach.alt_text}">
                    </div>
                    <div class="approach-steps">
                        ${data.approach.steps.map((step, index) => `
                            <div class="step" data-step="${index + 1}">
                                <h4>${step.title}</h4>
                                <p>${step.text}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>

        <section id="blog">
            <div class="container">
                <div class="section-intro">
                    <span class="section-tag">INSIGHTS</span>
                    <h2>${data.blog.title}</h2>
                    <p class="lead">${data.blog.description}</p>
                </div>
                <div class="blog-grid">
                    ${data.blog.posts.map(post => `
                        <article class="blog-card">
                            <div class="blog-card__media placeholder">
                                <span>Image Placeholder</span>
                            </div>
                            <div class="blog-card__body">
                                <div class="blog-card__meta">
                                    <time datetime="${post.date}">${post.date}</time>
                                    <ul>
                                        ${post.pillars.map(pillar => `<li>${pillar}</li>`).join('')}
                                    </ul>
                                </div>
                                <h3>${post.title}</h3>
                                <p>${post.summary}</p>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>
        
        <section id="casestudy">
             <div class="container">
                <div class="section-intro">
                    <span class="section-tag">CASE STUDIES</span>
                    <h2>${data.casestudy.title}</h2>
                </div>
                <div class="case-placeholder">
                    <p>${data.casestudy.text}</p>
                </div>
            </div>
        </section>

        <section id="profile">
            <div class="container">
                <div class="section-intro">
                    <span class="section-tag">FOUNDER</span>
                    <h2>${data.profile.title}</h2>
                </div>
                <div class="profile-content">
                    <div class="profile-image">
                        <img src="${data.profile.image}" alt="Areaweb AI 代表 伊藤ゆきひろ">
                    </div>
                    <div class="profile-text">
                        ${data.profile.paragraphs.map(p => `<p>${p}</p>`).join('')}
                    </div>
                </div>
            </div>
        </section>

        <section id="contact">
            <div class="container contact-surface">
                <div class="section-intro">
                    <span class="section-tag">CONTACT</span>
                    <h2>${data.contact.title}</h2>
                </div>
                <p class="lead">${data.contact.text}</p>
                <a href="${data.contact.cta.href}" class="cta-button">${data.contact.cta.text}</a>
            </div>
        </section>
    `;
    body.appendChild(main);

    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="container">
            <p>${data.footer.copyright}</p>
        </div>
    `;
    body.appendChild(footer);
}

function setupEventListeners() {
    const nav = document.querySelector('header nav ul');
    const toggle = document.querySelector('.nav-toggle');

    if (toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    const navLinks = document.querySelectorAll('nav a[href^="#"], a.cta-button[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                nav.classList.remove('open');
            }
        });
    });
}
