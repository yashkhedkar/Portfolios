import React from 'react';
import './ScrollLockupSection.css';

const ScrollLockupSection = () => {
  return (
    <div className="scroll-lockup-section">
      <div className="video-visual">
        <video
          className="video"
          autoPlay
          loop
          muted
          playsInline
          role="none"
          aria-label="background gradient animation"
        >
          <source
            src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/dynamic-content-lockups-v2/assets/bg-gradient-animation.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="section-wrapper">
        <div className="content-wrapper">
          <div className="content content-1">
            <div className="mobile-visual">
              <img
                className="card-img"
                src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop"
                alt="UI/UX Design"
              />
            </div>
            <div className="meta">
              <h2 className="headline">
                Visualizing <span className="text-highlight">UI/UX Design</span>
              </h2>
              <p className="desc">
                Crafting intuitive, user-centric interfaces that blend aesthetics with functionality to create seamless digital experiences.
              </p>
            </div>
          </div>
          <div className="content content-2">
            <div className="mobile-visual">
              <img
                className="card-img"
                src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop"
                alt="Backend Architecture"
              />
            </div>
            <div className="meta">
              <h2 className="headline">
                Architecting <span className="text-highlight">Robust Backends</span>
              </h2>
              <p className="desc">
                Designing scalable server-side systems, efficient Application Programming Interfaces (APIs), and secure data flows to power modern applications.
              </p>
            </div>
          </div>
          <div className="content content-3">
            <div className="mobile-visual">
              <img
                className="card-img"
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                alt="Database Design"
              />
            </div>
            <div className="meta">
              <h2 className="headline">
                Optimizing <span className="text-highlight">Data Solutions</span>
              </h2>
              <p className="desc">
                Implementing high-performance database schemas and data management strategies to ensure integrity and speed.
              </p>
            </div>
          </div>
          <div className="content content-4">
            <div className="mobile-visual">
              <img
                className="card-img"
                src="https://images.unsplash.com/photo-1667372393119-3866372c9492?q=80&w=1925&auto=format&fit=crop"
                alt="Cloud & DevOps"
              />
            </div>
            <div className="meta">
              <h2 className="headline">
                Deploying to the <span className="text-highlight">Cloud</span>
              </h2>
              <p className="desc">
                Orchestrating containerized deployments and CI/CD pipelines for reliable, automated software delivery.
              </p>
            </div>
          </div>
        </div>
        <div className="visual">
          <div className="card-wrapper">
            <div className="card card-1">
              <img
                className="card-img"
                src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop"
                alt="UI/UX Design"
              />
            </div>
            <div className="card card-2">
              <img
                className="card-img"
                src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop"
                alt="Backend Architecture"
              />
            </div>
            <div className="card card-3">
              <img
                className="card-img"
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                alt="Database Design"
              />
            </div>
            <div className="card card-4">
              <img
                className="card-img"
                src="https://images.unsplash.com/photo-1667372393119-3866372c9492?q=80&w=1925&auto=format&fit=crop"
                alt="Cloud & DevOps"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollLockupSection;
