import React, { useState } from "react";
import { education, profile, projects } from "./data.js";

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-icon--diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  );
}

function ImageWithFallback({ src, alt, className, fallback }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) return fallback;

  return (
    <img
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      src={src}
    />
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu}>
          <img alt="" className="wordmark-mark" src={profile.image} />
          <span>{profile.name}</span>
        </a>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
        >
          <span />
          <span />
        </button>
        <nav aria-label="Main navigation" className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#education" onClick={closeMenu}>Education</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Get in touch <ArrowIcon diagonal />
          </a>
        </nav>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> {profile.availability}</p>
            <h1 id="hero-title">
              Hello, I’m <span>{profile.name.split(" ")[0]}.</span>
              <br />
              I’m a {profile.role.toLowerCase()}.
            </h1>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button button--dark" href="#projects">
                Explore my work <ArrowIcon />
              </a>
              <a className="text-link" href={`mailto:${profile.email}`}>
                Say hello <ArrowIcon diagonal />
              </a>
            </div>
          </div>
          <div className="hero-art">
            <ImageWithFallback
              alt={`Profile photo of ${profile.name}`}
              className="profile-image"
              src={profile.image}
              fallback={
                <div aria-label="Decorative portfolio illustration" className="hero-art-fallback" role="img">
                  <div className="art-orbit art-orbit--outer" />
                  <div className="art-orbit art-orbit--inner" />
                  <div className="art-sun" />
                  <div className="art-card">
                    <span className="art-card-label">A little bit of</span>
                    <span className="art-card-title">curiosity<br />goes a long way.</span>
                    <span className="art-card-footer">{profile.location}</span>
                  </div>
                  <span className="art-spark art-spark--one">✳</span>
                  <span className="art-spark art-spark--two">✳</span>
                </div>
              }
            />
          </div>
          <a className="scroll-cue" href="#about">
            <span className="scroll-line" /> Scroll to explore
          </a>
        </section>

        <section aria-labelledby="about-title" className="about-section section-wrap" id="about">
          <div className="section-heading">
            <p className="eyebrow">01 / A little about me</p>
            <h2 id="about-title">Exploring today.<br /><span>Building for tomorrow.</span></h2>
          </div>
          <div className="about-content">
            <p>{profile.about}</p>
            <div className="about-meta">
              <div>
                <span className="meta-label">Based in</span>
                <span>{profile.location}</span>
              </div>
              <div>
                <span className="meta-label">Find me on</span>
                <span className="social-links">
                  {profile.socials.map((social) => (
                    <a href={social.href} key={social.label} rel="noreferrer" target="_blank">
                      {social.label}<ArrowIcon diagonal />
                    </a>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="education-title" className="education-section" id="education">
          <div className="section-wrap education-inner">
            <div className="section-heading">
              <p className="eyebrow">02 / The learning</p>
              <h2 id="education-title">My Education<span>.</span></h2>
            </div>
            <div className="education-list">
              {education.map((item) => (
                <article className="education-item" key={item.school}>
                  <div className="education-period">{item.period}</div>
                  <div>
                      <h3>{item.school}</h3>
                      {item.qualification && <p className="education-school">{item.qualification}</p>}
                    <p className="education-detail">{item.detail}</p>
                  </div>
                  <span aria-hidden="true" className="education-plus">+</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="projects-title" className="projects-section section-wrap" id="projects">
          <div className="projects-heading">
            <div className="section-heading">
              <p className="eyebrow">03 / Things I’ve made</p>
              <h2 id="projects-title">Selected projects<span>.</span></h2>
            </div>
            <p className="projects-note">A few things I’ve worked on while learning and exploring.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className={`project-visual project-visual--${project.number}`}>
                  <span className="project-number">{project.number}</span>
                  <ImageWithFallback
                    alt={`${project.name} project`}
                    className="project-image"
                    src={project.image}
                    fallback={
                      <span aria-hidden="true" className="project-shape">
                        {project.number === "01" ? "✳" : project.number === "02" ? "◒" : "✦"}
                      </span>
                    }
                  />
                  <a
                    aria-label={`View ${project.name}`}
                    className="project-link"
                    href={project.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ArrowIcon diagonal />
                  </a>
                </div>
                <div className="project-info">
                  <div className="project-title-row">
                    <h3>{project.name}</h3>
                    <span>{project.type}</span>
                  </div>
                  <p>{project.description}</p>
                  <ul aria-label="Technologies" className="tag-list">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="contact-title" className="contact-section">
          <div className="section-wrap contact-inner" id="contact">
            <p className="eyebrow">04 / What’s next?</p>
            <h2 id="contact-title">Have an idea?<br /><span>Let’s talk.</span></h2>
            <a className="contact-link" href={`mailto:${profile.email}`}>
              {profile.email} <ArrowIcon diagonal />
            </a>
            <div className="contact-decoration" aria-hidden="true">❄</div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark" href="#home">
          <img alt="" className="wordmark-mark" src={profile.image} />
          <span>{profile.name}</span>
        </a>
        <p>Designed with care · {new Date().getFullYear()}</p>
        <a className="back-to-top" href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
