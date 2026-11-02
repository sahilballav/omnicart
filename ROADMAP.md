# OmniCart: 10-Day Engineering Roadmap & Progress Tracker

> **Project Vision**: Enterprise cloud-native multi-platform e-commerce ecosystem built with **Java 21, Spring Boot, React (Vite/Tailwind), Flutter (BLoC), PostgreSQL (JSONB), Redis, Apache Kafka, Resilience4j, Docker, and Kubernetes (AWS EKS)**.

---

## Progress Overview

| Phase | Core Objective | Status | Completed Date |
|---|---|:---:|:---:|
| **Day 1** | **React Storefront Prototyping** | Completed | 2026-11-03 |
| **Day 2** | **React Admin Dashboard & AI Interface** | Up Next | - |
| **Day 3** | **Infrastructure Provisioning & Data Layer** | Pending | - |
| **Day 4** | **Spring Boot Core APIs & Redis Caching** | Pending | - |
| **Day 5** | **Agentic AI Integration & Resilience4j** | Pending | - |
| **Day 6** | **Kafka Event Streaming Pipeline** | Pending | - |
| **Day 7** | **Web Integration & End-to-End Testing** | Pending | - |
| **Day 8** | **Flutter Mobile Scaffold & State Management** | Pending | - |
| **Day 9** | **Mobile Backend Integration** | Pending | - |
| **Day 10** | **Containerization & Cloud Deployment** | Pending | - |

**Overall Progress**: `10% Complete` (1/10 Days Finished)

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

---

### Day 2: React Admin Dashboard & AI Interface
- [ ] **Secure Admin Route Architecture**:
  - [ ] Configure client-side role-based routing (Customer vs Admin view).
  - [ ] Implement mock authentication context (Admin token, permission guards).
- [ ] **Predictive Inventory Dashboard**:
  - [ ] Real-time inventory and license management data table.
  - [ ] Predictive sales velocity and inventory depletion charts.
  - [ ] Quick actions to modify inventory counts and edit digital asset JSONB specs.
- [ ] **Agentic AI Shopping Assistant Interface**:
  - [ ] Floating/docked chat assistant widget with message history.
  - [ ] Natural language query prompt templates ("Find Terraform blueprints for AWS with Karpenter under $200").
  - [ ] Interactive query recommendation chips and intent parser feedback display.

---

### Day 3: Infrastructure Provisioning & Data Layer
- [ ] **Dockerized Local Infrastructure**:
  - [ ] Write root `docker-compose.yml` to spin up:
    - PostgreSQL 16 (port `5432`)
    - Redis 7 (port `6379`)
    - Apache Kafka Broker with KRaft (port `9092`)
- [ ] **Spring Boot 21 Backend Scaffolding**:
  - [ ] Initialize Java 21 Spring Boot 3.3 project in `backend/`.
  - [ ] Configure HikariCP connection pool and PostgreSQL data source.
- [ ] **Flyway Database Migrations**:
  - [ ] Migration script `V1__init_schema.sql` creating `products`, `orders`, and `order_items`.
  - [ ] Native PostgreSQL `JSONB` column support for dynamic product specifications.

---

### Day 4: Spring Boot Core APIs & Redis Caching
- [ ] **JPA Entity Mapping & REST Endpoints**:
  - [ ] Map PostgreSQL tables to JPA entities with Hibernate JSONB converters.
  - [ ] Build RESTful CRUD endpoints for product management (`/api/v1/products`).
  - [ ] Implement pagination, category filtering, and attribute search.
- [ ] **Spring Security & JWT Authentication**:
  - [ ] Stateless JWT authentication filter and token provider.
  - [ ] Role-based authorization (`ROLE_USER`, `ROLE_ADMIN`).
- [ ] **Redis Shopping Cart & Session Management**:
  - [ ] Configure `RedisTemplate` with custom serializers.
  - [ ] Build high-speed cart service (`/api/v1/cart`) for volatile session operations.

---

### Day 5: Agentic AI Integration & Resilience4j
- [ ] **Natural Language Intent Parsing**:
  - [ ] Connect lightweight LLM / AI service to translate natural language search queries.
  - [ ] Dynamic JPA Criteria / Specification queries querying PostgreSQL JSONB fields (`attributes ->> 'iac_framework' = 'Terraform'`).
- [ ] **Fault Tolerance & Circuit Breaking**:
  - [ ] Configure Resilience4j CircuitBreaker, RateLimiter, and Retry on external dependencies.
  - [ ] Build mock payment gateway with simulated network latency and fallback handling.

---

### Day 6: Kafka Event Streaming Pipeline
- [ ] **Asynchronous Checkout Producer**:
  - [ ] Refactor checkout endpoint to publish `OrderPlaced` event payload to Kafka topic `omnicart.orders.placed`.
- [ ] **Event Consumer Services**:
  - [ ] Inventory Consumer: Asynchronously decrements product stock/seats.
  - [ ] Analytics Consumer: Aggregates real-time purchasing velocity for admin dashboard.
- [ ] **Automated Testing Suite**:
  - [ ] Comprehensive JUnit 5 unit and integration tests with Testcontainers.

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
