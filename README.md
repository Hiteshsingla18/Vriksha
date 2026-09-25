🌳 Vriksha

One living talent graph. Six ways to grow.

A solution for Build For Bharat 2.0 — Intelligent Talent & Workforce Ecosystem

Vriksha — Sanskrit/Hindi for "tree" — is a working name. Swap it freely.

Show Image Show Image Show Image

Table of contents
1. Elevator pitch
2. Why this is different
3. System architecture
4. Data flow — how the loop actually closes
5. The Skill Tree
6. Career Rooms
7. The six portals
8. Example user journey (Builder)
9. Data model
10. Tech stack
11. Proposed repository structure
12. Roadmap
13. Hackathon build plan (hour-by-hour)
14. Getting started (planned)
15. Competitive landscape
16. Risks & open questions
17. Contributing
18. The pitch, in one breath
1. Elevator pitch

Explorer, Builder, Grower, Colleges, Hiring, and Company aren't six separate products. They're six ways of looking at one thing: a live map of what the market actually needs, continuously corrected by what actually happens to real people.

Every recommendation the system makes writes an event back into the same graph it read from — a room finished, a gap closed, a hire that worked out, a course that didn't predict success. That return path is the whole mechanism, and it's why the system compounds instead of decaying.

2. Why this is different

Every platform on the competitor list already claims to be "AI-powered" and "continuously learning." That's table stakes, not a pitch. What none of them have is the other half of the loop — they each see one side of the market and have no incentive to expose that their own recommendations don't actually predict success.

Competitor category	Examples	Sees	Never sees
Job boards	LinkedIn, Naukri, Indeed	Applications, sometimes hires	Whether the hire worked out
Learning platforms	Coursera, Udemy, LinkedIn Learning	Course completions	Whether the skill showed up in a job
Enterprise talent suites	Eightfold, Gloat, 365Talents, Workday, SAP SuccessFactors, Oracle HCM	Real performance data	Walled inside one company
Government / credentialing	Skill India Digital Hub, NCS, ASEEM, iMocha	Credentials, test scores	What happens after

Vriksha is built to sit across all six sides of the market at once — that's what makes it hard to copy.

3. System architecture

Two engines and a trust layer sit underneath all six portals. Every portal both reads from and writes back into the same shared core.

events: room finished,gap closed, hire worked out
🚪 Six portals — one shared core
🧭 Explorerno career chosen
🔨 Builderstuck on how
📈 Growerready to level up
🎓 Collegescurriculum fit
🧑‍💼 Hiringbest-fit candidates
🏢 Companybuild vs. buy
🧠 Shared core
guards
guards
🌐 Live Skill Graph<i> demand scoring,trends,co-occurrence </i>
🔁 Outcome Loop<i> hires, promotions,dropouts,placements </i>
🔒 Trust Layer<i> verifiable credentials,privacy-preservingaggregation </i>
📥 External signal sources
Job postings
GitHub & tooling trends
Course launches
Research output

Reading the diagram: signal flows in from the top, gets scored and structured in the shared core, powers all six portals, and every portal's real-world outcome flows back in at the bottom — closing the loop.

4. Data flow — how the loop actually closes
sequenceDiagram
    autonumber
    participant Src as External Sources
    participant Ing as Ingestion Pipeline
    participant Graph as Live Skill Graph (Neo4j)
    participant Portal as A Portal (any of 6)
    participant User as End User
    participant Loop as Outcome Loop (Kafka → Postgres)

    Src->>Ing: Raw postings, repos, courses, papers
    Ing->>Ing: NER skill-entity extraction (spaCy/HF)
    Ing->>Graph: Upsert skills, roles, edges + demand score
    Graph->>Portal: Serve tree positions, colours, gaps
    Portal->>User: Show Skill Tree / Career Room / recommendation
    User->>Portal: Acts (finishes a room, takes a job, drops a course)
    Portal->>Loop: Emit outcome event
    Loop->>Graph: Feed back into demand score & predictions
    Note over Graph,Loop: Every event makes the next<br/>recommendation, for everyone, sharper
5. The Skill Tree

Every field is a living tree. Branches are skill categories, leaves are individual skills and tools. Position, size, and colour come entirely from the live skill graph — nobody hand-curates this, so it can be shown to judges as a formula, not a picture.

High & rising
Stable, moderate
Declining
No recent signal
New skill data point
Compute demand scoreposting freq + momentum+ salary corr
🟢 Thrivinghigh on the tree, brightgreen
🟡 Steadymid-tree, amber
🟤 Fadinglow & small, olive-brown
⚪ Driedfallen at the base, grey
Render as a leaf on the livetree
Seasons scrubber replays2–3 years of movement

Other tree behaviours:

Your own leaves light up — in Builder/Grower, a person's verified skills glow on the tree; the gap between "lit" and "thriving-but-unlit nearby" is the recommendation, shown spatially instead of as a bullet list.
A forest, not one tree — zoomed out, every field is its own tree in a grove, so an undecided student can see whole trees growing or shrinking before choosing which one to walk into.
6. Career Rooms

Undecided users don't read about a career — they do a 30–60 minute slice of one: given a log file, find the intrusion; given messy sales data, find one real insight; given a broken UI and a complaint, redesign one screen. Same format, any field.

User enters a Career Room
Given a real-work slice(any field, 30–60 min)
System observes behaviour
Time vs. peers
Where they got stuck
Pushed through or bailed?
Came back for fun?
First real signal written intothe verified-capability graph
Regret Radar +'Explain This To My Family'brief

This is deliberately not a career quiz — it watches what someone actually did, not what they say they'd enjoy.

7. The six portals
🌳 Vrikshacore
🧭 Explorer
Career Rooms
Regret Radar
Family Brief
React-to-Real-Work
Nearby, Not Famous
Forest View
🔨 Builder
Tree Overlay
Stuck Detector
Micro-Project
Trail Matching
Confidence vs Competence
📈 Grower
Market Recommendations
Skill Half-Life
Adjacent Leap
Compensation Trajectory
Future-You Mentor
🎓 Colleges
Curriculum vs Market
Curriculum Autopsy
Early Warning
Guest-Faculty Match
Cohort Heat-Map
🧑‍💼 Hiring
Predicted-Success Match
Shadow Candidate Audit
Skill-Decay Screening
Team-Fit View
Calibrated Questions
🏢 Company
Bench Radar
Build-vs-Buy Simulator
Internal Mobility
Attrition-Aware Planning
7.1 Explorer — student, no career chosen

North star: realise before you regret, not after.

Feature	What it does
Virtual Career Rooms	30–60 min real-work slices across any field
Regret Radar	Anonymised patterns from people who'd have chosen differently, and why
"Explain This To My Family" Brief	One-page, data-backed brief (pay bands, growth curve, stability) for justifying a path to parents
React-to-Real-Work	Preference profile built from reactions to real postings/day-in-the-life logs
Nearby, Not Famous	People from the user's own city/college now on that path, for a short chat
Forest View	Every field as its own tree, so a student sees whole fields growing before picking one
7.2 Builder — career chosen, stuck on how to build it

North star: tell me exactly where I need help.

Feature	What it does
Tree Overlay	Verified skills lit up against the live tree for the target role; the gap is the plan
Stuck Detector	Infers where someone is stuck from behaviour — three abandoned attempts is a diagnosis, not a mystery
Micro-Project, Not a Course	One project scoped to close exactly one ranked gap, sized for a weekend
Trail Matching	2–3 real, anonymised paths of people who closed this exact gap, in order
Confidence vs Competence Check	Flags the gap between how ready someone feels and how ready they've verifiably become
7.3 Grower — working professional, wants to grow more

North star: where is the market going, and where do I fit in it?

Feature	What it does
Market Recommendations	Growth suggestions from current + predicted-market direction
Skill Half-Life	Estimated runway before a skill combination gets commoditised
Adjacent Leap	Nearby roles ranked by new-skill investment vs. trajectory gained
Compensation Trajectory	Realistic pay-growth bands from real aggregated outcomes, not vendor surveys
Future-You Mentor Match	Short connection to someone 3–5 years further down a weighed path
7.4 Colleges — universities, colleges, schools

North star: which parts of our curriculum are actually working?

Feature	What it does
Curriculum vs Market Overlay	Live diff between what's taught and what's actually predictive of outcomes
Curriculum Autopsy	Per-course correlation with graduates' real outcomes
Early Warning	Flags a specialisation browning 2–3 years before enrolment/placement suffers
Guest-Faculty Auto-Match	Surfaces opted-in Grower-side professionals for an emerging gap
Cohort Heat-Map	Which student segments — not just which courses — are falling behind
7.5 Hiring — HR and recruiters

North star: the best-fit candidate, not the best-keyword candidate.

Feature	What it does
Predicted-Success Matching	Ranks candidates on predicted success in the role, not keyword overlap
Shadow Candidate Audit	Quantifies how many good-fit people a JD's requirements filtered out
Skill-Decay-Aware Screening	Flags a listed skill as stale when there's no recent verified activity
Team-Fit View	Scores what a candidate adds to the existing team's profile
Calibrated Interview Questions	Generated from the 2–3 things that actually separated success from failure historically
7.6 Company — train existing staff or hire new

North star: build or buy — and prove it with numbers.

Feature	What it does
Bench Radar	Flags internal skills about to go stale before performance drops
Build-vs-Buy Simulator	Slider between training N people over M months vs. hiring externally, with real cost/ramp/risk
Internal Mobility Surfacing	Checks other departments before recommending an external hire
Attrition-Aware Planning	Cross-references stagnating skills with flight risk before someone quits
8. Example user journey (Builder)

Builder is the strongest hackathon-demo candidate — the gap-diagnosis-against-the-tree flow is the clearest proof the mechanism works.

Yes
No
User logs in to /build
System pulls target rolefrom the Live Skill Graph
Tree Overlay renders:user's verified skills lit up
Gap between lit skillsand thriving-but-unlitleaves?
Stuck Detector checksbehaviour:repeated abandonedattempts?
User is on track —surface Adjacent Leapoptions
Rank gaps by demand score× proximity to target role
Generate Micro-Projectscoped to top-ranked gap
Show Trail Matching:2–3 real paths that closedthis gap
User completesmicro-project
Confidence vs CompetenceCheck
Emit outcome event →Outcome Loop
9. Data model

Conceptual shape of the Neo4j graph underneath the Skill Tree and the ML/matching layer.

prerequisite / transfer
required_by
target_of
verified_in
generates
context_for
affects_demand_score
teaches
correlated_with
SKILL
string
id
string
name
float
demand_score
string
status
thriving | steady | fading | dried
datetime
last_updated
ROLE
string
id
string
title
string
field
USER
string
id
string
portal
explorer|builder|grower|colleges|hiring|company
OUTCOME_EVENT
string
id
string
type
hire|promotion|dropout|placement|project_result
datetime
timestamp
CURRICULUM
string
id
string
institution
string
course_name
10. Tech stack
secures
runs
runs
runs
runs
runs
Infra
Docker Compose →Kubernetes
GitHub Actions CI/CD
AWS / GCP + object storage
Trust layer
W3C Verifiable Credentials+ DIDs
Differential-privacy-styleaggregation
Stretch: Polygon anchor forattestation timestamps
Frontend
React + Next.jsone codebase, sixrole-based pipelines
D3.js — Skill Tree(force-directed)
Tailwind CSS
Backend
FastAPI (Python)
GraphQL (Strawberry)one core, six portal-specificqueries
ML / matching layer
Sentence-Transformers(skill/role embeddings)
Hybrid recommender(content-based +collaborative)
Claude API — textgeneration only,never the source of therecommendation
Outcome Loop
Kafka (event streaming)
PostgreSQL / TimescaleDB(outcome + behaviouralhistory)
Skill graph storage & scoring
Neo4j — skills/roles asnodes,co-occurrence/prerequisite/transfer as edges
Demand score: posting freq+momentum + salarycorrelation
Data ingestion — Live Skill Graph
Python: Scrapy /BeautifulSoupjob postings, publiccurricula PDFs
Public APIs: GitHub, coursecatalogs, arXiv
spaCy / HF Transformers —skill NER
Airflow (Celery+cron athackathon scale)
Layer	Choice	Why
Ingestion	Scrapy/BeautifulSoup, spaCy/HF NER	Turns unstructured postings/curricula into structured skill entities
Graph store	Neo4j	Skills and roles are natively a graph problem (co-occurrence, prerequisite, transfer)
Event backbone	Kafka (or Postgres queue at hackathon scale)	Outcome events need to be streamed, not batched, once it's live
Matching	Sentence-Transformers + hybrid recommender	Powers gap analysis, adjacent-role and trail matching without an LLM in the decision path
LLM usage	Claude API, narrowly	Turns graph output into readable text — never the source of the recommendation
Backend	FastAPI + GraphQL (Strawberry)	One shared core, six portals querying it differently
Frontend	Next.js + D3.js + Tailwind	One codebase, one design system, six role-based pipelines
Trust	W3C VCs + DIDs, DP-style aggregation	Lets six mutually distrustful sides share a graph safely
11. Proposed repository structure
text
vriksha/
├── apps/
│   ├── web/                  # Next.js frontend — six portal pipelines, shared design system
│   │   ├── explorer/
│   │   ├── builder/
│   │   ├── grower/
│   │   ├── colleges/
│   │   ├── hiring/
│   │   └── company/
│   └── api/                  # FastAPI + GraphQL backend
│       ├── graph/            # Neo4j queries, demand scoring
│       ├── outcomes/         # Kafka producers/consumers
│       ├── matching/         # Sentence-Transformers, hybrid recommender
│       └── trust/            # VC issuance, DID resolution, DP aggregation
├── ingestion/
│   ├── scrapers/             # job postings, curricula PDFs
│   ├── ner/                  # spaCy/HF skill-entity extraction
│   └── pipelines/            # Airflow DAGs / Celery tasks
├── packages/
│   └── design-system/        # shared React + Tailwind components
├── infra/
│   ├── docker-compose.yml
│   ├── k8s/
│   └── .github/workflows/    # CI/CD
├── docs/
│   ├── blueprint.pdf         # full system doc
│   └── demo-visuals.html     # static demo/mockup visuals
└── README.md
12. Roadmap
Jan 2027
Jan 2028
Jan 2029
Jan 2030
Jan 2031
Jan 2032
Jan 2033
Jan 2034
36–48 hr build
Colleges + companies opt in
Outcome Loop collects real data
All six portals live
Trust Layer shipped
Multi-state / multi-language
Mature Outcome Loop
Network-effect compounding
Skill India / NCS integration talks
Self-sustaining infrastructure
Phase 0 — Hackathon
Phase 1 — Pilot
Phase 2 — Year one
Phase 3 — Years 3–5
Phase 4 — Decade vision
Vriksha roadmap
Phase	Timeframe	Milestone
0 — Hackathon build	36–48 hrs	One pipeline's core loop end-to-end on real data; rest pitched as the architected roadmap the working slice makes credible
1 — Pilot	0–3 months	1–2 colleges + a handful of companies opt in with real, consented data; Outcome Loop starts collecting for real
2 — Year one	Year 1	All six portals live; Trust Layer (verifiable credentials) shipped; multi-state, multi-language rollout
3 — Years 3–5	Years 3–5	Outcome Loop mature enough for confident predictions; network effect compounds; integration talks with Skill India/NCS become more interesting than competing
4 — Decade vision	Year 10+	A living, self-sustaining piece of workforce infrastructure, still being mined and validated the same way it was in month one
13. Hackathon build plan (hour-by-hour)
gantt
    title Phase 0 — 48-hour build
    dateFormat HH:mm
    axisFormat %Hh
    section Build
    Scrape postings + curricula, run NER   :h1, 00:00, 6h
    Build skill graph + demand scoring     :h2, 06:00, 10h
    Build Skill Tree (wired to real scores):h3, 16:00, 12h
    Builder live gap-diagnosis flow        :h4, 28:00, 8h
    Simulated Outcome Loop + 5 portal mockups :h5, 36:00, 8h
    Pitch deck + demo rehearsal            :h6, 44:00, 4h

Builder is the demo focus: the gap-diagnosis-against-the-tree flow is the single clearest proof the mechanism actually works. The other five portals ship as high-fidelity mockups, and the Outcome Loop is transparently simulated and clearly labelled as such.

14. Getting started (planned)

This section documents the intended setup once implementation begins — nothing is wired up yet.

bash
# clone
git clone https://github.com/<org>/vriksha.git
cd vriksha

# spin up local infra (Neo4j, Postgres, Kafka)
docker compose -f infra/docker-compose.yml up -d

# backend
cd apps/api
pip install -r requirements.txt
uvicorn main:app --reload

# frontend
cd apps/web
npm install
npm run dev

Planned environment variables:

Variable	Purpose
NEO4J_URI / NEO4J_USER / NEO4J_PASSWORD	Skill graph store
KAFKA_BROKER_URL	Outcome event streaming
DATABASE_URL	PostgreSQL/TimescaleDB for outcome history
CLAUDE_API_KEY	Narrow text-generation layer only
GITHUB_API_TOKEN	Ingestion source for tooling/skill trends
15. Competitive landscape
Vriksha's territory
Enterprise suites (walled)
Job boards / govt credentialing
Learning platforms
Vriksha
Skill India / NCS / ASEEM / iMocha
Eightfold / Gloat / Workday / SAP
Coursera / Udemy / LinkedIn Learning
LinkedIn / Naukri / Indeed
Single side of market
All six sides at once
Sees the credential/hire
Sees the real outcome
Where Vriksha sits
16. Risks & open questions
Cold start — the Outcome Loop needs real, consented data before predictions are trustworthy; Phase 1 pilots exist specifically to solve this.
Trust adoption — all six sides have to trust the system enough to feed it real data, or the loop never closes. The Trust Layer (VCs + DP aggregation) is the answer, but it has to be credible from day one, not bolted on later.
LLM boundary discipline — the Claude API is scoped to text generation only; keeping recommendations grounded in the graph (not the LLM) is a design constraint that needs enforcing in code review, not just in docs.
Data sourcing at scale — job-posting and curriculum scraping across languages/regions (multi-state rollout in Phase 2) is a much bigger ingestion problem than the hackathon sample.
Naming — "Vriksha" is a placeholder; trademark/availability unchecked.
17. Contributing

This repo is pre-implementation. Once Phase 0 code lands:

Fork and branch off main
Follow the structure in §11
Run the relevant service locally (see §14)
Open a PR with a clear description of which portal/layer it touches
18. The pitch, in one breath

Every recommendation this system makes writes an event back into the same graph it read from — a room finished, a gap closed, a hire that worked out, a course that didn't predict success. That loop is what makes Vriksha compound instead of decay, and it's why nobody on the competitor list can copy it in a sprint: LinkedIn, Naukri and Indeed never see past the hire; Coursera and Udemy never see past the certificate; Eightfold, Gloat and the HR suites are walled inside single companies; Skill India, NCS and ASEEM never see past the credential. Vriksha is the only one built to sit across all six sides of the market at once.

Built for Build For Bharat 2.0 — Intelligent Talent & Workforce Ecosystem.
