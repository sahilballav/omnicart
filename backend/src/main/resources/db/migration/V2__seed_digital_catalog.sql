-- ==============================================================================
-- Flyway Migration: V2__seed_digital_catalog.sql
-- Description: Seed initial digital asset catalog with rich JSONB specifications
-- ==============================================================================

INSERT INTO products (
    id, name, description, price, category, brand, rating, review_count, inventory_count, images, tags, attributes
) VALUES
(
    'prod-001',
    'CloudOps EKS Production Blueprint & Terraform Suite',
    'Infrastructure as Code bundle for enterprise Kubernetes deployments. Includes Terraform modules, Helm charts, automated ArgoCD GitOps workflows, Karpenter autoscaling, and zero-trust IAM role bindings. Deploys an AWS production cluster via Terraform.',
    189.00,
    'Cloud & DevOps',
    'CloudArchitects',
    5.00,
    0,
    99,
    '["/assets/schematics/eks-blueprint.svg"]'::jsonb,
    '["kubernetes", "aws-eks", "terraform", "devops", "helm", "argocd"]'::jsonb,
    '{"version": "v3.4.2", "license_type": "Commercial Team License (Unlimited Seats)", "delivery_format": "Private GitHub Repo Access + Signed ZIP Bundle", "iac_framework": "Terraform", "cloud_provider": "AWS", "target_clouds": ["AWS (EKS)", "Optional GCP (GKE) overlay"], "modules_included": ["VPC Multi-AZ", "EKS Cluster v1.30", "Karpenter Autoscaler", "Ingress-NGINX + Cert-Manager", "Prometheus & Grafana Dashboards"], "documentation_pages": 86, "lifetime_updates": true, "docker_ready": true}'::jsonb
),
(
    'prod-002',
    'AgenticLLM: Autonomous Multi-Agent Orchestration Framework',
    'Agentic AI foundation library engineered for production workloads. Features asynchronous graph orchestration, vector memory recall, streaming JSON output validators, automated subagent spawning, and built-in resilience circuits for OpenAI, Anthropic, and Gemini models.',
    149.00,
    'AI & Agent Kits',
    'NeuroLabs',
    5.00,
    0,
    150,
    '["/assets/schematics/agentic-llm.svg"]'::jsonb,
    '["agentic-ai", "llm", "autonomous-agents", "python", "typescript", "rag"]'::jsonb,
    '{"version": "v2.1.0-enterprise", "license_type": "Full Commercial & SaaS Royalty-Free License", "ai_engine": "LangChain", "supported_languages": ["Python 3.10+", "TypeScript 5.3+"], "model_providers": ["OpenAI", "Anthropic Claude 3.5", "Google Gemini 2.0", "Ollama (Local)"], "vector_databases": ["pgvector", "Redis Vector", "Pinecone", "Qdrant"], "lifetime_updates": true}'::jsonb
),
(
    'prod-003',
    'OmniUI: Enterprise SaaS Design System & React Component Suite',
    'Design system for cloud platforms, analytics dashboards, and B2B SaaS. Includes Figma variants with auto-layout v5, dark and light theme tokens, and React components with TypeScript support and WCAG AAA compliance.',
    99.00,
    'UI Systems & Figma',
    'PixelCraft',
    5.00,
    0,
    300,
    '["/assets/schematics/omni-ui.svg"]'::jsonb,
    '["figma", "design-system", "tailwind", "react", "dashboard", "saas"]'::jsonb,
    '{"version": "v4.0.0", "license_type": "Unlimited Projects & Client Work", "figma_components_count": 4200, "react_components_count": 125, "framework": "React 18 / 19 + Tailwind CSS 3.4+", "accessibility": "WCAG 2.2 Level AAA Compliant"}'::jsonb
),
(
    'prod-004',
    'Spring Boot 3.3 Event-Driven Microservices Starter Boilerplate',
    'Distributed backend starter. Features Spring Cloud Eureka, Spring Security JWT authentication, Kafka Producer and Consumer abstractions, transactional outbox pattern, Flyway migration scripts, and Docker Compose environments for local development.',
    129.00,
    'Microservices & APIs',
    'JArchitect',
    5.00,
    0,
    80,
    '["/assets/schematics/microservices.svg"]'::jsonb,
    '["java-21", "spring-boot-3", "kafka", "redis", "postgresql", "microservices"]'::jsonb,
    '{"version": "v3.3.1", "java_version": "21", "spring_boot_version": "3.3.4", "message_broker": "Apache Kafka 3.7", "database_layer": "PostgreSQL 16 with JSONB", "resilience_module": "Resilience4j Circuit Breaker + Rate Limiter"}'::jsonb
),
(
    'prod-005',
    'HyperTrace: Distributed Tracing & Observability SDK',
    'Microservice call-graph visibility without code pollution. Integrates with Grafana Tempo, Datadog, and Jaeger. Redacts sensitive PII headers and logs slow database JSONB queries.',
    79.00,
    'Developer Tools',
    'TelemetryWorks',
    5.00,
    0,
    190,
    '["/assets/schematics/hypertrace.svg"]'::jsonb,
    '["observability", "opentelemetry", "tracing", "apm", "grafana", "developer-tools"]'::jsonb,
    '{"version": "v1.8.4", "license_type": "Single Organization Enterprise License", "supported_runtimes": ["JVM (Java 17/21)", "Node.js 18+", "Go 1.22+"], "telemetry_standard": "OpenTelemetry (OTel) v1.31"}'::jsonb
),
(
    'prod-006',
    'Architecting High-Throughput Kafka Systems Masterclass',
    'Enterprise event-driven architecture course. Covers partition balancing, idempotent producers, consumer group rebalance protocols, exactly-once semantics (EOS), schema evolution, and deploying Kafka KRaft on AWS EKS.',
    159.00,
    'Courses & Masterclasses',
    'StreamSchool',
    5.00,
    0,
    500,
    '["/assets/schematics/kafka-masterclass.svg"]'::jsonb,
    '["kafka", "event-driven", "masterclass", "system-design", "video-course", "architecture"]'::jsonb,
    '{"course_duration_hours": 18.5, "video_resolution": "4K Ultra HD", "modules_count": 14, "hands_on_labs": 24, "language": "English"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;
