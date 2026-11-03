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
    'Complete battle-tested Infrastructure as Code (IaC) bundle for enterprise Kubernetes deployments. Includes Terraform modules, Helm charts, automated ArgoCD GitOps workflows, Karpenter autoscaling, and zero-trust IAM role bindings. Deploys a full AWS production cluster in under 15 minutes.',
    189.00,
    'Cloud & DevOps',
    'CloudArchitects',
    4.95,
    342,
    99,
    '["https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["kubernetes", "aws-eks", "terraform", "devops", "helm", "argocd"]'::jsonb,
    '{"version": "v3.4.2", "license_type": "Commercial Team License (Unlimited Seats)", "delivery_format": "Private GitHub Repo Access + Signed ZIP Bundle", "iac_framework": "Terraform", "cloud_provider": "AWS", "target_clouds": ["AWS (EKS)", "Optional GCP (GKE) overlay"], "modules_included": ["VPC Multi-AZ", "EKS Cluster v1.30", "Karpenter Autoscaler", "Ingress-NGINX + Cert-Manager", "Prometheus & Grafana Dashboards"], "documentation_pages": 86, "lifetime_updates": true, "docker_ready": true}'::jsonb
),
(
    'prod-002',
    'AgenticLLM: Autonomous Multi-Agent Orchestration Framework',
    'An enterprise agentic AI foundation library engineered for production workloads. Features asynchronous graph orchestration, vector memory recall, streaming JSON output validators, automated subagent spawning, and built-in resilience circuits for OpenAI, Anthropic, and Gemini models.',
    149.00,
    'AI & Agent Kits',
    'NeuroLabs',
    4.90,
    418,
    150,
    '["https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["agentic-ai", "llm", "autonomous-agents", "python", "typescript", "rag"]'::jsonb,
    '{"version": "v2.1.0-enterprise", "license_type": "Full Commercial & SaaS Royalty-Free License", "ai_engine": "LangChain", "supported_languages": ["Python 3.10+", "TypeScript 5.3+"], "model_providers": ["OpenAI", "Anthropic Claude 3.5", "Google Gemini 2.0", "Ollama (Local)"], "vector_databases": ["pgvector", "Redis Vector", "Pinecone", "Qdrant"], "lifetime_updates": true}'::jsonb
),
(
    'prod-003',
    'OmniUI: Enterprise SaaS Design System & React Component Suite',
    'The definitive design system for cloud platforms, analytics dashboards, and B2B SaaS. Includes meticulously organized Figma variants with auto-layout v5, dark/light theme tokens, and drop-in React components with full TypeScript support and WCAG AAA compliance.',
    99.00,
    'UI Systems & Figma',
    'PixelCraft',
    4.85,
    620,
    300,
    '["https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["figma", "design-system", "tailwind", "react", "dashboard", "saas"]'::jsonb,
    '{"version": "v4.0.0", "license_type": "Unlimited Projects & Client Work", "figma_components_count": 4200, "react_components_count": 125, "framework": "React 18 / 19 + Tailwind CSS 3.4+", "accessibility": "WCAG 2.2 Level AAA Compliant"}'::jsonb
),
(
    'prod-004',
    'Spring Boot 3.3 Event-Driven Microservices Starter Boilerplate',
    'Jumpstart your distributed backend. Features Spring Cloud Eureka, Spring Security JWT authentication, Kafka Producer/Consumer abstractions, transactional outbox pattern, Flyway migration scripts, and Docker Compose environments for local development.',
    129.00,
    'Microservices & APIs',
    'JArchitect',
    4.92,
    215,
    80,
    '["https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["java-21", "spring-boot-3", "kafka", "redis", "postgresql", "microservices"]'::jsonb,
    '{"version": "v3.3.1", "java_version": "21", "spring_boot_version": "3.3.4", "message_broker": "Apache Kafka 3.7", "database_layer": "PostgreSQL 16 with JSONB", "resilience_module": "Resilience4j Circuit Breaker + Rate Limiter"}'::jsonb
),
(
    'prod-005',
    'HyperTrace: Distributed Tracing & Observability SDK',
    'Gain full microservice call-graph visibility without code pollution. Integrates seamlessly with Grafana Tempo, Datadog, and Jaeger. Automatically redacts sensitive PII headers and logs slow database JSONB queries.',
    79.00,
    'Developer Tools',
    'TelemetryWorks',
    4.78,
    173,
    190,
    '["https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["observability", "opentelemetry", "tracing", "apm", "grafana", "developer-tools"]'::jsonb,
    '{"version": "v1.8.4", "license_type": "Single Organization Enterprise License", "supported_runtimes": ["JVM (Java 17/21)", "Node.js 18+", "Go 1.22+"], "telemetry_standard": "OpenTelemetry (OTel) v1.31"}'::jsonb
),
(
    'prod-006',
    'Architecting High-Throughput Kafka Systems Masterclass',
    'Master enterprise event-driven architecture from industry veterans. Covers partition balancing, idempotent producers, consumer group rebalance protocols, exactly-once semantics (EOS), schema evolution, and deploying Kafka KRaft on AWS EKS.',
    159.00,
    'Courses & Masterclasses',
    'StreamSchool',
    4.96,
    880,
    500,
    '["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["kafka", "event-driven", "masterclass", "system-design", "video-course", "architecture"]'::jsonb,
    '{"course_duration_hours": 18.5, "video_resolution": "4K Ultra HD", "modules_count": 14, "hands_on_labs": 24, "language": "English"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;
