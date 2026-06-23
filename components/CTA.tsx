import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/site";
import { ContactFlourish, ContactMascot } from "@/components/ContactMascot";
import { SelectionFrame } from "@/components/SelectionFrame";

export function CTA() {
  const leadProject = projects[0];

  return (
    <section className="cta-section" id="contact">
      <div className="cta-heading">
        <div className="cta-icon-stage" aria-hidden="true">
          <ContactMascot className="cta-mascot" />
        </div>
        <div className="cta-copy">
          <h2 className="display-heading cta-heading-title">
            <span className="cta-heading-line letter-reveal">Work With</span>
            <span className="cta-heading-line cta-heading-line--bottom letter-reveal">Arena Tech</span>
          </h2>
          <p>
            We&apos;re a product team that takes on complex problems, builds with
            sharp collaborators, and ships digital products that make everyday
            experiences clearer and more useful.
          </p>
        </div>
      </div>

      <div className="cta-card">
        <ContactFlourish className="cta-contact-flourish" />
        <Link href="/contact" className="big-contact" data-cursor>
          <span className="big-fill" />
          <span className="big-dot top-left" />
          <span className="big-dot bottom-left" />
          <span className="big-dot bottom-right" />
          <span className="big-dot top-right" />
          <span className="big-icon big-icon-left" />
          <span className="big-icon big-icon-right" />
          <SelectionFrame color="var(--paper)" />
          <span className="big-label">Contact</span>
        </Link>

        <div className="comment-card">
          <p className="comment-label">Team note</p>
          <div className="comment-body">
            {leadProject ? (
              <div className="comment-project-thumb" aria-hidden="true">
                <Image
                  src={leadProject.image}
                  alt=""
                  width={96}
                  height={72}
                  sizes="48px"
                />
              </div>
            ) : null}
            <div>
              <strong>ARENA TECH</strong>
              <p>
                Open to contracts, long-term partnerships, and conversations
                about ambitious product work.
              </p>
              <span className="react-chip">
                <i />
                {projects.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
