import { projects } from "@/data/site";
import { ProjectCard } from "@/components/ProjectCard";

export function FeaturedWorks() {
  return (
    <section className="featured-section" id="case-study">
      <div className="featured-heading">
        <p className="handwritten featured-kicker">explore my work!</p>
        <h2 className="display-heading letter-reveal">Featured Works</h2>
        <p className="featured-note">
          This is a showcase of what happens when curiosity drives the process.
        </p>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  );
}

