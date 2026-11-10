# OmniCart: 10-Day Engineering Roadmap & Progress Tracker

> **Project Vision**: Enterprise cloud-native multi-platform e-commerce ecosystem built with **Java 21, Spring Boot, React (Vite/Tailwind), Flutter (BLoC), PostgreSQL (JSONB), Redis, Apache Kafka, Resilience4j, Docker, and Kubernetes (AWS EKS)**.

---

## Progress Overview

| Phase | Core Objective | Status | Completed Date |
|---|---|:---:|:---:|
| **Day 1** | **React Storefront Prototyping** | Completed | 2026-11-03 |
| **Day 2** | **React Admin Dashboard & AI Interface** | Completed | 2026-11-03 |
| **Day 3** | **Infrastructure Provisioning & Data Layer** | Completed | 2026-11-03 |
| **Day 4** | **Spring Boot Core APIs & Redis Caching** | Completed | 2026-11-06 |
| **Day 5** | **Agentic AI Integration & Resilience4j** | Completed | 2026-11-10 |
| **Day 6** | **Kafka Event Streaming Pipeline** | Completed | 2026-11-11 |
| **Day 7** | **Web Integration & End-to-End Testing** | Up Next | - |
| **Day 8** | **Flutter Mobile Scaffold & State Management** | Pending | - |
| **Day 9** | **Mobile Backend Integration** | Pending | - |
| **Day 10** | **Containerization & Cloud Deployment** | Pending | - |

**Overall Progress**: `60% Complete` (6/10 Days Finished)

---

## Detailed Daily Breakdown & Checklist

### Day 1: React Storefront Prototyping
- [x] **Repository & Scaffolding**:
  - [x] Initialize Git repository with root `.gitignore`.
  - [x] Scaffold Vite + React 18 + TypeScript + Tailwind CSS application in `frontend/`.
  - [x] Configure Tailwind CSS, PostCSS, Lucide icons, and strict typing.
- [x] **Digital Asset Catalog & Dynamic Schema**:
  - [x] Model schema-less PostgreSQL `JSONB` data structure (`types/product.ts`).
  - [x] Populate comprehensive mock catalog of digital assets (`data/mockProducts.ts`) with dynamic attributes (licensing, versions, runtimes, cloud targets).
- [x] **Storefront UI Components**:
  - [x] Responsive product catalog grid with category filters, dynamic tag chips, and deep search (`ProductGrid.tsx`).
  - [x] Product card with dynamic specification pills, stock indicator, and quick-view actions (`ProductCard.tsx`).
  - [x] Detailed product modal with dynamic JSONB specification inspector and seat modifier (`ProductDetailModal.tsx`).
  - [x] Slide-out shopping cart drawer with price calculations and Kafka checkout dispatch simulation (`CartDrawer.tsx`).
  - [x] Persistent session state management via `CartContext.tsx` (local storage precursor to Redis sync).
- [x] **Animations & Micro-Interactions**:
  - [x] Cyber boot loading screen with sequential service verification and progress bar (`LoadingScreen.tsx`).
  - [x] IntersectionObserver scroll-reveal animations (`ScrollReveal.tsx`).
  - [x] Top viewport scroll reading progress bar (`ScrollProgressBar.tsx`).
  - [x] Floating "Back to Top" button (`BackToTop.tsx`).
  - [x] Animated floating Add-to-Cart toast notification (`Toast.tsx`).
  - [x] Bouncy cart badge pop animation (`Navbar.tsx`).
  - [x] Enterprise Architecture Showcase section (`ArchitectureShowcase.tsx`).
  - [x] Full Dark Mode theme engine with animated Sun/Moon toggle and persistent preferences (`ThemeContext.tsx`, `ThemeToggle.tsx`).

---

### Day 2: React Admin Dashboard & AI Interface
- [x] **Secure Admin Route Architecture**:
  - [x] Configure client-side role-based routing (Customer vs Admin view).
  - [x] Implement mock authentication context (Admin token, permission guards, `AuthContext.tsx`).
- [x] **Predictive Inventory Dashboard**:
  - [x] Real-time inventory and license management data table (`InventoryTable.tsx`).
  - [x] Predictive sales velocity, inventory depletion charts, and Kafka pipeline monitor (`PredictiveAnalytics.tsx`).
  - [x] Quick actions to modify inventory counts and edit digital asset JSONB specs.
- [x] **Agentic AI Shopping Assistant Interface**:
  - [x] Floating/docked chat assistant drawer with message history (`AiShoppingAssistant.tsx`).
  - [x] Natural language query prompt templates ("Find Terraform blueprints under $200", "Kubernetes clusters for AWS").
  - [x] Interactive query recommendation chips and PostgreSQL JSONB intent parser SQL feedback display.

---

### Day 3: Infrastructure Provisioning & Data Layer
- [x] **Dockerized Local Infrastructure**:
  - [x] Write root `docker-compose.yml` to spin up:
    - PostgreSQL 16 (port `5432`)
    - Redis 7 (port `6379`)
    - Apache Kafka Broker with KRaft (port `9092`)
- [x] **Spring Boot 21 Backend Scaffolding**:
  - [x] Initialize Java 21 Spring Boot 3.3 project in `backend/` (`pom.xml`, Maven wrapper config).
  - [x] Configure HikariCP connection pool and PostgreSQL data source (`DataSourceConfig.java`).
  - [x] Configure RedisTemplate JSON serializer and Kafka topic declarations (`RedisConfig.java`, `KafkaTopicConfig.java`).
- [x] **Flyway Database Migrations**:
  - [x] Migration script `V1__init_schema.sql` creating `products`, `orders`, and `order_items`.
  - [x] Native PostgreSQL `JSONB` column support for dynamic product specifications and GIN indexing.
  - [x] Seed migration `V2__seed_digital_catalog.sql` populating enterprise digital catalog assets.
  - [x] JPA Entity mapping with Hibernate 6 `@JdbcTypeCode(SqlTypes.JSON)` (`ProductEntity.java`, `OrderEntity.java`, `OrderItemEntity.java`).

---

### Day 4: Spring Boot Core APIs & Redis Caching
- [x] **JPA Entity Mapping & REST Endpoints**:
  - [x] Map PostgreSQL tables to JPA entities with Hibernate JSONB converters (`ProductEntity.java`, `OrderEntity.java`, `OrderItemEntity.java`).
  - [x] Build RESTful CRUD endpoints for product management (`/api/v1/products`) with `ProductController.java` and `ProductServiceImpl.java`.
  - [x] Implement pagination, category filtering, search, and native PostgreSQL JSONB attribute queries (`findByJsonbAttribute`).
- [x] **API Response Architecture & Validation**:
  - [x] Universal JSON response wrapper `ApiResponse<T>` with timestamp and status.
  - [x] Global exception handler with `ResourceNotFoundException` and Bean Validation mapping.
- [x] **Redis Shopping Cart & Session Management**:
  - [x] Configure `RedisTemplate` with custom JSON serializers (`RedisConfig.java`).
  - [x] Build high-speed cart service (`/api/v1/cart`) for volatile session operations (`CartService.java`, `CartController.java`).
  - [x] Auto-recalculating digital asset tax (8%), subtotal, and 24-hour Redis TTL cache.

---

### Day 5: Agentic AI Integration & Resilience4j
- [x] **Natural Language Intent Parsing & Dynamic JSONB Specs**:
  - [x] Natural language intent parser (`AiQueryParserService.java`) extracting budget thresholds, tech stacks, cloud targets, runtimes, and categories.
  - [x] Native PostgreSQL JSONB attribute filtering and dynamic scoring engine (`AiSearchServiceImpl.java`).
  - [x] RESTful AI Assistant endpoints (`/api/v1/ai/search`, `/api/v1/ai/chat`, `/api/v1/ai/prompts`) with `AiAssistantController.java`.
  - [x] Intelligent architectural reasoning generator explaining blueprint fit and deployment action items.
- [x] **Fault Tolerance & Circuit Breaking (Resilience4j)**:
  - [x] Integrated `resilience4j-spring-boot3` (2.2.0) with Spring Boot AOP starter.
  - [x] Configured sliding-window CircuitBreaker, Exponential Backoff Retry, and RateLimiter in `application.yml`.
  - [x] High-resilience Payment Gateway Service (`PaymentGatewayServiceImpl.java`) with chaotic failure simulations (HTTP 503, 3500ms latency spikes).
  - [x] Graceful fallback handlers returning asynchronous reservation states when circuit trips.
  - [x] REST endpoints (`/api/v1/payments/process`, `/api/v1/payments/circuit-status`) and Actuator metrics endpoints.

---

### Day 6: Kafka Event Streaming Pipeline
- [x] **Asynchronous Checkout Producer**:
  - [x] Order checkout service (`OrderServiceImpl.java`) with Resilience4j payment settlement and `OrderPlacedEvent` dispatch.
  - [x] Kafka producer (`OrderEventProducer.java`) with async `CompletableFuture` commit handling on topic `omnicart.orders.placed`.
- [x] **Event Consumer Services**:
  - [x] Inventory Consumer (`InventoryKafkaConsumer.java`): Listens on `omnicart.orders.placed`, atomically decrements license seats in PostgreSQL, triggers low-stock alerts, and publishes `InventoryDeductedEvent`.
  - [x] License Issuance Consumer (`LicenseIssuanceKafkaConsumer.java`): Generates asymmetric Ed25519 cryptographic software license tokens, updates order to `CONFIRMED`, and publishes `LicenseIssuedEvent`.
  - [x] Analytics Consumer (`AnalyticsKafkaConsumer.java`): Maintains concurrent rolling 5-minute velocity window, tracking gross volume and top blueprints for the operator console.
  - [x] Order REST Controller (`OrderController.java`): Endpoints for checkout, order status, and `/api/v1/orders/analytics/velocity`.
- [x] **Automated Testing Suite**:
  - [x] JUnit 5 pipeline tests (`OrderEventPipelineTest.java`) verifying event serialization, velocity metric aggregation, and rolling window calculation.

---

### Day 7: Web Integration & End-to-End Testing
- [ ] **Full-Stack REST Connectivity**:
  - [ ] Replace static mock data in React frontend with live Axios API client.
  - [ ] Set up Axios interceptors for JWT token injection and refresh.
  - [ ] Configure Spring Boot Cross-Origin Resource Sharing (CORS).
- [ ] **End-to-End Flow Verification**:
  - [ ] Verify complete checkout flow from React storefront to Kafka event broadcast and admin dashboard metrics update.

---

### Day 8: Flutter Mobile Scaffold & State Management
- [ ] **Flutter Project Setup**:
  - [ ] Initialize Flutter project in `mobile/`.
  - [ ] Set up BLoC architecture (Events, States, Blocs) for predictable state management.
- [ ] **Native Mobile UI Screens**:
  - [ ] Mobile catalog feed, digital asset detail view, cart drawer, and login screen.
  - [ ] Verify responsiveness on Android and iOS emulators.

---

### Day 9: Mobile Backend Integration
- [ ] **Mobile REST Integration**:
  - [ ] Connect Flutter BLoC services to Spring Boot backend via Dart HTTP / Dio.
- [ ] **Real-Time Redis Cart Sync**:
  - [ ] Verify cart synchronization between web (React) and mobile (Flutter) via Redis session ID.
- [ ] **Native Mobile AI Assistant**:
  - [ ] Integrate Agentic AI search interface natively into the Flutter app.

---

### Day 10: Containerization & Cloud Deployment
- [ ] **Production Docker Containerization**:
  - [ ] Multi-stage Dockerfile for React frontend (NGINX Alpine).
  - [ ] Multi-stage Dockerfile for Spring Boot backend (Eclipse Temurin 21 JRE).
- [ ] **Kubernetes Manifests (AWS EKS)**:
  - [ ] K8s Deployments, Services, ConfigMaps, and Secrets for all microservices.
  - [ ] Local testing via Minikube / Kind or AWS EKS cluster deployment.
- [ ] **CI/CD Pipeline**:
  - [ ] GitHub Actions workflow for automated testing, Docker build, and container registry publishing.

---

## Technical Architecture Reference

```
                             [ React Web (Vite + Tailwind) ]
                                          |
                                          | (REST / JWT)
                                          v
[ Flutter Mobile (BLoC) ] ------> [ Spring Boot 21 Gateway / API ]
                                    |         |             |
                         +----------+         |             +----------+
                         |                    |                        |
                         v                    v                        v
                [ PostgreSQL 16 ]     [ Redis Cache ]         [ Apache Kafka ]
                  (JSONB Specs)       (Cart Sessions)        (Event Streaming)
                                                                       |
                                                                       v
                                                             [ Consumer Services ]
                                                             - Inventory Deduction
                                                             - Predictive Analytics
```

