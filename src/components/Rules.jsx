import "./rules.css";

export default function Rules() {
  return (
    <section className="rules-section" id="rules">
      <div className="rules-glass">

        <h2 className="section-heading">
          RULES & GUIDELINES
        </h2>

        <div className="rules-row">
          {/* General */}
          <div className="rule-card">
            <h3>GENERAL INSTRUCTIONS</h3>
            <ul>
              <li>Team size strictly limited to 4 members.</li>
              <li>College ID cards are mandatory for all participants.</li>
              <li>Formal dress code must be followed.</li>
              <li>Problem statements will be provided on the spot.</li>
              <li>Teams must report on time as per schedule.</li>
            </ul>
          </div>

          {/* Judging */}
          <div className="rule-card">
            <h3>JUDGING CRITERIA</h3>
            <ul>
              <li>Innovation and originality of the solution.</li>
              <li>Technical depth and feasibility.</li>
              <li>Clarity of problem understanding.</li>
              <li>Quality of implementation and results.</li>
              <li>Presentation and explanation.</li>
            </ul>
          </div>

          {/* Ethics */}
          <div className="rule-card">
            <h3>CODE OF CONDUCT</h3>
            <ul>
              <li>Plagiarism in any form is strictly prohibited.</li>
              <li>All code and ideas must be original.</li>
              <li>Unethical practices lead to disqualification.</li>
              <li>Decisions of judges are final.</li>
              <li>Participants must maintain discipline.</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
