export type ServiceSlug =
  | "database-administration"
  | "cloud-architecture"
  | "data-engineering"
  | "training";

export type Platform = {
  key: string;
  name: string;
  short: string;
  /** brand-ish hue used only for small accents on badges */
  hue: string;
  items: string[];
};

export type Service = {
  slug: ServiceSlug;
  index: string;
  icon: "database" | "cloud" | "workflow" | "graduation";
  title: string;
  kicker: string;
  summary: string;
  headline: string;
  intro: string;
  platformsLabel: string;
  platforms: Platform[];
  offerings: { title: string; body: string }[];
  outcomes: string[];
};

export const engines = [
  { key: "oracle", name: "Oracle Database", short: "Oracle", hue: "#F80000" },
  { key: "mssql", name: "Microsoft SQL Server", short: "SQL Server", hue: "#CC2927" },
  { key: "mysql", name: "MySQL", short: "MySQL", hue: "#00758F" },
  { key: "postgres", name: "PostgreSQL", short: "PostgreSQL", hue: "#336791" },
] as const;

export const clouds = [
  { key: "aws", name: "Amazon Web Services", short: "AWS", hue: "#FF9900" },
  { key: "azure", name: "Microsoft Azure", short: "Azure", hue: "#0078D4" },
  { key: "oci", name: "Oracle Cloud Infrastructure", short: "OCI", hue: "#C74634" },
] as const;

export const services: Service[] = [
  {
    slug: "database-administration",
    index: "01",
    icon: "database",
    title: "Database Administration",
    kicker: "Expert DBA services",
    summary:
      "Senior DBAs for Oracle, SQL Server, MySQL and PostgreSQL. We keep your databases fast, highly available, secure and recoverable.",
    headline: "Senior DBAs for Oracle, SQL Server, MySQL and PostgreSQL.",
    intro:
      "Your databases hold the business together. Our DBAs have run mission-critical estates on all four major relational engines, so you get one accountable team rather than a different vendor for each technology. We take on health checks, managed support and complex upgrades alike.",
    platformsLabel: "By database engine",
    platforms: [
      {
        key: "oracle",
        name: "Oracle Database",
        short: "Oracle",
        hue: "#F80000",
        items: [
          "RAC, Data Guard & Active Data Guard",
          "RMAN backup, recovery & DR rehearsals",
          "AWR / ASH / ADDM performance diagnostics",
          "Multitenant (CDB/PDB) consolidation",
          "Patching, release updates & major upgrades",
          "Exadata & GoldenGate replication",
        ],
      },
      {
        key: "mssql",
        name: "Microsoft SQL Server",
        short: "SQL Server",
        hue: "#CC2927",
        items: [
          "Always On Availability Groups & FCIs",
          "Query Store & execution-plan tuning",
          "Index, statistics & maintenance strategy",
          "In-place & side-by-side upgrades",
          "SSIS / SSRS estate support",
          "Azure SQL Database & Managed Instance",
        ],
      },
      {
        key: "mysql",
        name: "MySQL",
        short: "MySQL",
        hue: "#00758F",
        items: [
          "InnoDB configuration & query tuning",
          "InnoDB Cluster & Group Replication",
          "Replication topologies & failover",
          "Hot backups and point-in-time recovery",
          "Schema change without downtime",
          "Amazon RDS / Aurora & HeatWave",
        ],
      },
      {
        key: "postgres",
        name: "PostgreSQL",
        short: "PostgreSQL",
        hue: "#336791",
        items: [
          "Streaming & logical replication",
          "Patroni high-availability clusters",
          "pgBackRest backup & PITR",
          "Autovacuum, bloat & planner tuning",
          "Partitioning & extensions (PostGIS, pg_stat_statements)",
          "Aurora PostgreSQL & Azure Flexible Server",
        ],
      },
    ],
    offerings: [
      {
        title: "Health checks & performance audits",
        body: "A fixed-scope review of configuration, workload, wait events and risk. You get a prioritised remediation plan, not just a report.",
      },
      {
        title: "Managed & remote DBA",
        body: "Proactive monitoring, patching, capacity planning and incident response under an agreed service level.",
      },
      {
        title: "High availability & disaster recovery",
        body: "We design and test clustering, replication and backup strategies against real RPO and RTO targets.",
      },
      {
        title: "Upgrades & migrations",
        body: "Version upgrades, platform moves and cross-engine migrations such as Oracle to PostgreSQL, planned for minimal downtime.",
      },
      {
        title: "Security hardening",
        body: "Least-privilege access, encryption at rest and in transit, auditing and patch compliance mapped to your controls.",
      },
      {
        title: "Performance engineering",
        body: "SQL tuning, indexing, memory and I/O optimisation, with before-and-after evidence for every change.",
      },
    ],
    outcomes: [
      "Fewer incidents and faster recovery",
      "Predictable performance under load",
      "Tested, documented recovery procedures",
      "Licence and infrastructure cost visibility",
    ],
  },
  {
    slug: "cloud-architecture",
    index: "02",
    icon: "cloud",
    title: "Cloud Solutions Architecture",
    kicker: "AWS · Azure · OCI",
    summary:
      "Vendor-neutral architecture across the three major hyperscalers, from landing zones and migrations to resilient, cost-aware platforms.",
    headline: "Cloud database platforms on AWS, Azure and OCI, designed to last.",
    intro:
      "We design cloud platforms that match your workloads, compliance needs and budget. Because we work across AWS, Azure and Oracle Cloud Infrastructure, our advice is vendor-neutral: we recommend what fits, whether that is single-cloud, multi-cloud or hybrid.",
    platformsLabel: "By cloud provider",
    platforms: [
      {
        key: "aws",
        name: "Amazon Web Services",
        short: "AWS",
        hue: "#FF9900",
        items: [
          "Well-Architected reviews",
          "Landing zones with Control Tower",
          "Amazon RDS & Aurora design",
          "Database Migration Service (DMS)",
          "VPC networking, IAM & KMS",
          "Cost optimisation & right-sizing",
        ],
      },
      {
        key: "azure",
        name: "Microsoft Azure",
        short: "Azure",
        hue: "#0078D4",
        items: [
          "Cloud Adoption Framework landing zones",
          "Azure SQL & SQL Managed Instance",
          "Flexible Server for PostgreSQL & MySQL",
          "Oracle Database@Azure",
          "Entra ID, networking & Private Link",
          "Azure Migrate & modernisation",
        ],
      },
      {
        key: "oci",
        name: "Oracle Cloud Infrastructure",
        short: "OCI",
        hue: "#C74634",
        items: [
          "Autonomous Database",
          "Exadata Database Service",
          "Base Database Service",
          "MySQL HeatWave",
          "Zero Downtime Migration (ZDM)",
          "OCI landing zones & FastConnect",
        ],
      },
    ],
    offerings: [
      {
        title: "Cloud readiness assessment",
        body: "An inventory of workloads, dependencies and risk, with a clear recommendation for each: rehost, replatform, refactor or retain.",
      },
      {
        title: "Target architecture",
        body: "Reference designs for compute, data, networking, identity and security that hold up to audit and scale.",
      },
      {
        title: "Migration delivery",
        body: "Wave planning, rehearsed cutovers and rollback plans, so databases move with minimal downtime.",
      },
      {
        title: "Infrastructure as code",
        body: "Repeatable, version-controlled environments with Terraform and native tooling.",
      },
      {
        title: "Multi-cloud & hybrid",
        body: "Interconnect, identity federation and data placement across clouds and on-premises estates.",
      },
      {
        title: "FinOps & governance",
        body: "Tagging, budgets, guardrails and right-sizing, so cloud spend tracks business value.",
      },
    ],
    outcomes: [
      "Secure, compliant landing zones",
      "Migrations with rehearsed rollback",
      "Architectures that scale with demand",
      "Transparent, controllable cloud spend",
    ],
  },
  {
    slug: "data-engineering",
    index: "03",
    icon: "workflow",
    title: "Data Engineering",
    kicker: "Pipelines · Lakehouse · Streaming",
    summary:
      "Reliable batch and streaming pipelines, warehouses and lakehouses on AWS, Azure and OCI, built for trust, lineage and scale.",
    headline: "Pipelines that deliver data people can rely on.",
    intro:
      "We build the platforms that move, shape and serve your data, using each hyperscaler's native services where they make sense and open standards where portability matters. Every pipeline we ship is observable, tested and documented.",
    platformsLabel: "By platform",
    platforms: [
      {
        key: "aws",
        name: "Amazon Web Services",
        short: "AWS",
        hue: "#FF9900",
        items: [
          "AWS Glue & Step Functions",
          "Amazon Redshift",
          "S3 data lakes & Lake Formation",
          "Amazon Kinesis & MSK streaming",
          "Amazon EMR & Athena",
          "DMS change data capture",
        ],
      },
      {
        key: "azure",
        name: "Microsoft Azure",
        short: "Azure",
        hue: "#0078D4",
        items: [
          "Azure Data Factory",
          "Microsoft Fabric",
          "Azure Databricks",
          "Synapse Analytics",
          "Event Hubs streaming",
          "ADLS Gen2 & Purview governance",
        ],
      },
      {
        key: "oci",
        name: "Oracle Cloud Infrastructure",
        short: "OCI",
        hue: "#C74634",
        items: [
          "OCI Data Integration",
          "OCI Data Flow (Apache Spark)",
          "Autonomous Data Warehouse",
          "OCI GoldenGate",
          "Object Storage data lakes",
          "OCI Streaming",
        ],
      },
    ],
    offerings: [
      {
        title: "Pipeline engineering",
        body: "Batch and streaming ingestion with idempotent, testable transformations and clear ownership.",
      },
      {
        title: "Warehouse & lakehouse",
        body: "Modern analytical platforms with dimensional modelling and open table formats.",
      },
      {
        title: "Change data capture",
        body: "Low-latency replication from Oracle, SQL Server, MySQL and PostgreSQL sources into analytics platforms.",
      },
      {
        title: "Data quality & observability",
        body: "Freshness, volume and schema checks with alerting, so broken data never reaches a dashboard.",
      },
      {
        title: "Orchestration",
        body: "Dependable scheduling, retries and backfills with Airflow and native orchestrators.",
      },
      {
        title: "Governance & lineage",
        body: "Cataloguing, access policies and end-to-end lineage that satisfy auditors and analysts.",
      },
    ],
    outcomes: [
      "Trusted, well-documented datasets",
      "Fresher data for analytics and AI",
      "Lower pipeline maintenance overhead",
      "Governance built in, not bolted on",
    ],
  },
  {
    slug: "training",
    index: "04",
    icon: "graduation",
    title: "Training & Enablement",
    kicker: "Upskill your team",
    summary:
      "Practitioner-led training across every service we offer: DBA, cloud architecture and data engineering, delivered in-person or remotely.",
    headline: "Training from the people who do the work.",
    intro:
      "Our trainers are the same consultants who do the work, so courses come from real production experience rather than slide decks. Choose a standard track or a programme built around your own estate, tools and goals.",
    platformsLabel: "Course tracks",
    platforms: [
      {
        key: "dba",
        name: "Database Administration",
        short: "DBA",
        hue: "#00C0AF",
        items: [
          "Oracle DBA: foundations to RAC & Data Guard",
          "SQL Server administration & Always On",
          "MySQL operations & replication",
          "PostgreSQL administration & HA",
          "Performance tuning masterclasses",
          "Backup, recovery & DR drills",
        ],
      },
      {
        key: "cloud",
        name: "Cloud Architecture",
        short: "Cloud",
        hue: "#00C0AF",
        items: [
          "AWS architecture & database services",
          "Azure architecture & data platform",
          "OCI architecture & Autonomous Database",
          "Cloud migration patterns",
          "Terraform & infrastructure as code",
          "Cloud security & governance",
        ],
      },
      {
        key: "data",
        name: "Data Engineering",
        short: "Data",
        hue: "#00C0AF",
        items: [
          "Pipeline design fundamentals",
          "AWS Glue, Redshift & streaming",
          "Azure Data Factory & Microsoft Fabric",
          "OCI Data Integration & Data Flow",
          "SQL for analytics engineering",
          "Data quality & observability",
        ],
      },
    ],
    offerings: [
      {
        title: "Instructor-led courses",
        body: "Structured courses delivered on-site in London or remotely, with hands-on labs in real environments.",
      },
      {
        title: "Bespoke corporate programmes",
        body: "Curricula built around your own estate, tooling and runbooks, so your team practises on what they will run.",
      },
      {
        title: "Workshops & bootcamps",
        body: "Intensive one to five-day sessions focused on a single platform, migration or skill.",
      },
      {
        title: "Mentoring & shadowing",
        body: "Your engineers work alongside ours during an engagement, so knowledge transfers as part of the job.",
      },
      {
        title: "Certification preparation",
        body: "Focused preparation for Oracle, Microsoft, AWS and OCI professional certifications.",
      },
      {
        title: "Skills assessment",
        body: "We baseline team capability and map a development plan to your roadmap.",
      },
    ],
    outcomes: [
      "Self-sufficient internal teams",
      "Reduced reliance on outside support",
      "Consistent operational standards",
      "Faster onboarding of new engineers",
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Coverage matrix: engine × deployment target, with representative services. */
export const coverage: Record<string, Record<string, string>> = {
  oracle: {
    onprem: "RAC · Data Guard · Exadata",
    aws: "RDS for Oracle · EC2",
    azure: "Oracle Database@Azure",
    oci: "Autonomous · Exadata DB Service",
  },
  mssql: {
    onprem: "Always On · FCI",
    aws: "RDS for SQL Server · EC2",
    azure: "Azure SQL · Managed Instance",
    oci: "SQL Server on OCI Compute",
  },
  mysql: {
    onprem: "InnoDB Cluster · Replication",
    aws: "RDS · Aurora MySQL",
    azure: "Flexible Server for MySQL",
    oci: "MySQL HeatWave",
  },
  postgres: {
    onprem: "Patroni · Streaming Replication",
    aws: "RDS · Aurora PostgreSQL",
    azure: "Flexible Server for PostgreSQL",
    oci: "OCI Database with PostgreSQL",
  },
};

export const targets = [
  { key: "onprem", short: "On-prem" },
  { key: "aws", short: "AWS" },
  { key: "azure", short: "Azure" },
  { key: "oci", short: "OCI" },
] as const;
