import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'CloudOps EKS Production Blueprint & Terraform Suite',
    slug: 'cloudops-eks-production-blueprint-terraform',
    brand: 'CloudArchitects',
    category: 'Cloud & DevOps',
    price: 189.00,
    compareAtPrice: 249.00,
    inventoryCount: 99,
    rating: 5.0,
    reviewCount: 0,
    images: [
      '/assets/schematics/eks-blueprint.svg'
    ],
    shortDescription: 'Production AWS EKS Kubernetes infrastructure module with multi-AZ VPC, Prometheus, Karpenter, and CI/CD pipelines.',
    description: 'Infrastructure as Code bundle for enterprise Kubernetes deployments. Includes Terraform modules, Helm charts, automated ArgoCD GitOps workflows, Karpenter autoscaling, and zero-trust IAM role bindings. Deploys an AWS production cluster via Terraform.',
    isFeatured: true,
    tags: ['kubernetes', 'aws-eks', 'terraform', 'devops', 'helm', 'argocd'],
    attributes: {
      version: 'v3.4.2',
      license_type: 'Commercial Team License (Unlimited Seats)',
      delivery_format: 'Private GitHub Repo Access + Signed ZIP Bundle',
      iac_framework: 'Terraform >= 1.7.0 & OpenTofu Compliant',
      target_clouds: ['AWS (EKS)', 'Optional GCP (GKE) overlay'],
      modules_included: ['VPC Multi-AZ', 'EKS Cluster v1.30', 'Karpenter Autoscaler', 'Ingress-NGINX + Cert-Manager', 'Prometheus & Grafana Dashboards'],
      documentation_pages: 86,
      lifetime_updates: true,
      docker_ready: true,
      sla_support: 'Priority Discord & Direct GitHub Issues'
    },
    createdAt: '2026-01-10T08:00:00Z'
  },
  {
    id: 'prod-002',
    name: 'AgenticLLM: Autonomous Multi-Agent Orchestration Framework',
    slug: 'agentic-llm-autonomous-multi-agent-orchestrator',
    brand: 'NeuroLabs',
    category: 'AI & Agent Kits',
    price: 149.00,
    compareAtPrice: 199.00,
    inventoryCount: 150,
    rating: 5.0,
    reviewCount: 0,
    images: [
      '/assets/schematics/agentic-llm.svg'
    ],
    shortDescription: 'Python and TypeScript SDK for building hierarchical autonomous AI agents with memory, tool calling, and deterministic state.',
    description: 'Agentic AI foundation library engineered for production workloads. Features asynchronous graph orchestration, vector memory recall, streaming JSON output validators, automated subagent spawning, and built-in resilience circuits for OpenAI, Anthropic, and Gemini models.',
    isFeatured: true,
    tags: ['agentic-ai', 'llm', 'autonomous-agents', 'python', 'typescript', 'rag'],
    attributes: {
      version: 'v2.1.0-enterprise',
      license_type: 'Full Commercial & SaaS Royalty-Free License',
      supported_languages: ['Python 3.10+', 'TypeScript 5.3+'],
      model_providers: ['OpenAI', 'Anthropic Claude 3.5', 'Google Gemini 2.0', 'Ollama (Local)'],
      vector_databases: ['pgvector', 'Redis Vector', 'Pinecone', 'Qdrant'],
      download_size_mb: 28.5,
      unit_tests_coverage_pct: 94.2,
      lifetime_updates: true,
      files_included: ['Source SDK', '12 Real-World Sample Agent Workflows', 'Full OpenAPI Schemas']
    },
    createdAt: '2026-01-18T10:30:00Z'
  },
  {
    id: 'prod-003',
    name: 'OmniUI: Enterprise SaaS Design System & React Component Suite',
    slug: 'omniui-enterprise-saas-design-system-figma-react',
    brand: 'PixelCraft',
    category: 'UI Systems & Figma',
    price: 99.00,
    compareAtPrice: 139.00,
    inventoryCount: 300,
    rating: 5.0,
    reviewCount: 0,
    images: [
      '/assets/schematics/omni-ui.svg'
    ],
    shortDescription: '4,000+ Figma components paired with 120+ accessible Tailwind CSS & React 18/19 components, charts, and dashboard layouts.',
    description: 'Design system for cloud platforms, analytics dashboards, and B2B SaaS. Includes Figma variants with auto-layout v5, dark and light theme tokens, and React components with TypeScript support and WCAG AAA compliance.',
    isFeatured: true,
    tags: ['figma', 'design-system', 'tailwind', 'react', 'dashboard', 'saas'],
    attributes: {
      version: 'v4.0.0',
      license_type: 'Unlimited Projects & Client Work',
      figma_components_count: 4200,
      react_components_count: 125,
      framework: 'React 18 / 19 + Tailwind CSS 3.4+',
      design_tokens: ['Light & Dark Modes', 'Variable Fonts', 'High Contrast Mode'],
      delivery_format: 'Figma Community File Key + Private npm Token',
      accessibility: 'WCAG 2.2 Level AAA Compliant',
      icon_pack_included: 'Lucide Pro 1,200+ SVG Icons'
    },
    createdAt: '2026-01-25T14:15:00Z'
  },
  {
    id: 'prod-004',
    name: 'Spring Boot 3.3 Event-Driven Microservices Starter Boilerplate',
    slug: 'spring-boot-3-event-driven-microservices-starter',
    brand: 'JArchitect',
    category: 'Microservices & APIs',
    price: 129.00,
    compareAtPrice: 179.00,
    inventoryCount: 80,
    rating: 5.0,
    reviewCount: 0,
    images: [
      '/assets/schematics/microservices.svg'
    ],
    shortDescription: 'Enterprise Java 21 template with Apache Kafka streams, PostgreSQL JSONB mappings, Redis session cache, and Resilience4j breakers.',
    description: 'Distributed backend starter. Features Spring Cloud Eureka, Spring Security JWT authentication, Kafka Producer and Consumer abstractions, transactional outbox pattern, Flyway migration scripts, and Docker Compose environments for local development.',
    isFeatured: true,
    tags: ['java-21', 'spring-boot-3', 'kafka', 'redis', 'postgresql', 'microservices'],
    attributes: {
      version: 'v3.3.1',
      java_version: 'Java 21 LTS (GraalVM Native Image Ready)',
      spring_boot_version: '3.3.4',
      message_broker: 'Apache Kafka 3.7 (Confluent Schema Registry ready)',
      database_layer: 'PostgreSQL 16 with JSONB & Hibernate Types',
      resilience_module: 'Resilience4j Circuit Breaker + Rate Limiter',
      testing_suite: 'JUnit 5 + Testcontainers for Kafka & PostgreSQL',
      license_type: 'Full Commercial Source Code License'
    },
    createdAt: '2026-02-02T12:00:00Z'
  },
  {
    id: 'prod-005',
    name: 'HyperTrace: Distributed Tracing & Observability SDK',
    slug: 'hypertrace-distributed-tracing-observability-sdk',
    brand: 'TelemetryWorks',
    category: 'Developer Tools',
    price: 79.00,
    compareAtPrice: 119.00,
    inventoryCount: 190,
    rating: 5.0,
    reviewCount: 0,
    images: [
      '/assets/schematics/hypertrace.svg'
    ],
    shortDescription: 'OpenTelemetry wrapper for Java, Go, and Node.js with database query profiling and trace propagation.',
    description: 'Microservice call-graph visibility without code pollution. Integrates with Grafana Tempo, Datadog, and Jaeger. Redacts sensitive PII headers and logs slow database JSONB queries.',
    isFeatured: false,
    tags: ['observability', 'opentelemetry', 'tracing', 'apm', 'grafana', 'developer-tools'],
    attributes: {
      version: 'v1.8.4',
      license_type: 'Single Organization Enterprise License',
      supported_runtimes: ['JVM (Java 17/21)', 'Node.js 18+', 'Go 1.22+'],
      telemetry_standard: 'OpenTelemetry (OTel) v1.31',
      memory_overhead: '1.2 MB RAM',
      exporters: ['OTLP (gRPC & HTTP)', 'Jaeger', 'Prometheus', 'Datadog'],
      lifetime_updates: true
    },
    createdAt: '2026-02-08T09:40:00Z'
  },
  {
    id: 'prod-006',
    name: 'Architecting High-Throughput Kafka Systems Masterclass',
    slug: 'architecting-high-throughput-kafka-systems-masterclass',
    brand: 'StreamSchool',
    category: 'Courses & Masterclasses',
    price: 159.00,
    compareAtPrice: 220.00,
    inventoryCount: 500,
    rating: 5.0,
    reviewCount: 0,
    images: [
      '/assets/schematics/kafka-masterclass.svg'
    ],
    shortDescription: '18 hours of technical instruction, code repositories, partition tuning strategies, and disaster recovery blueprints.',
    description: 'Enterprise event-driven architecture course. Covers partition balancing, idempotent producers, consumer group rebalance protocols, exactly-once semantics (EOS), schema evolution, and deploying Kafka KRaft on AWS EKS.',
    isFeatured: true,
    tags: ['kafka', 'event-driven', 'masterclass', 'system-design', 'video-course', 'architecture'],
    attributes: {
      course_duration_hours: 18.5,
      video_resolution: '4K Ultra HD + Full Download Access',
      modules_count: 14,
      hands_on_labs: 24,
      downloadable_resources: 'Source Code Repos + 150-page PDF Architecture Guide',
      certificate_of_completion: 'Verifiable Digital Credential (Credly)',
      instructor_office_hours: 'Bi-weekly live Q&A sessions',
      language: 'English (Subtitles in 8 languages)'
    },
    createdAt: '2026-02-15T15:20:00Z'
  },
  {
    id: 'prod-007',
    name: 'VectorDB Neural Search & RAG Starter Pipeline',
    slug: 'vectordb-neural-search-rag-starter-pipeline',
    brand: 'NeuroLabs',
    category: 'AI & Agent Kits',
    price: 119.00,
    compareAtPrice: 159.00,
    inventoryCount: 120,
    rating: 5.0,
    reviewCount: 0,
    images: [
      '/assets/schematics/vectordb-rag.svg'
    ],
    shortDescription: 'RAG indexing pipeline with hybrid dense/sparse search, chunking algorithms, and reranking models.',
    description: 'Transform documentation, PDF archives, and product catalogs into vector embeddings. Implements reciprocal rank fusion (RRF), Colbert reranking, and query routing with PostgreSQL pgvector and Redis.',
    isFeatured: false,
    tags: ['rag', 'vector-search', 'pgvector', 'embeddings', 'ai-pipeline', 'semantic-search'],
    attributes: {
      version: 'v1.5.0',
      license_type: 'Commercial Developer License',
      embedding_models_tested: ['OpenAI text-embedding-3', 'BGE-Large-v1.5', 'Cohere Embed v3'],
      chunking_strategies: ['Semantic Chunking', 'Recursive Markdown', 'Token Sliding Window'],
      supported_stores: ['PostgreSQL pgvector', 'Redis VSS', 'Qdrant', 'Milvus'],
      benchmark_accuracy: '92.4% Recall@5 on HotpotQA',
      source_code_included: true,
      lifetime_updates: true
    },
    createdAt: '2026-02-20T11:10:00Z'
  },
  {
    id: 'prod-008',
    name: 'ZeroTrust JWT & OAuth2 Identity Gateway Bundle',
    slug: 'zerotrust-jwt-oauth2-identity-gateway',
    brand: 'SecOpsCloud',
    category: 'Microservices & APIs',
    price: 89.00,
    compareAtPrice: 129.00,
    inventoryCount: 210,
    rating: 5.0,
    reviewCount: 0,
    images: [
      '/assets/schematics/zerotrust-gateway.svg'
    ],
    shortDescription: 'Reverse proxy with JWT validation, rotating public keys (JWKS), rate limiting, and role-based access control (RBAC).',
    description: 'Protect microservices and REST endpoints with an enterprise security layer. Built with Go and Envoy proxy filters. Handles crypto verification and Redis token blacklisting.',
    isFeatured: false,
    tags: ['jwt', 'oauth2', 'security', 'api-gateway', 'rbac', 'zero-trust'],
    attributes: {
      version: 'v2.2.0',
      license_type: 'Single Organization Commercial License',
      protocols: ['OAuth 2.1', 'OpenID Connect (OIDC)', 'mTLS'],
      key_rotation_mode: 'Automated RFC 7517 JWKS Caching & Refresh',
      session_store: 'Redis Cluster with Auto-Expiring Blacklist',
      docker_and_helm_charts: true,
      documentation_included: true,
      support: 'Standard Email & Slack Channel'
    },
    createdAt: '2026-02-26T17:30:00Z'
  }
];
