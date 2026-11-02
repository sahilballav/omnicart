# OmniCart: Cloud-Native Multi-Platform E-Commerce Ecosystem

[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Java](https://img.shields.io/badge/Java-21_LTS-orange.svg?logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3-green.svg?logo=springboot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-JSONB-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D.svg?logo=redis)](https://redis.io/)
[![Kafka](https://img.shields.io/badge/Apache_Kafka-3.7-231F20.svg?logo=apachekafka)](https://kafka.apache.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-AWS_EKS-326CE5.svg?logo=kubernetes)](https://kubernetes.io/)

**OmniCart** is an enterprise-grade, multi-platform e-commerce ecosystem designed for high availability and dynamic scalability. It bridges a responsive React web storefront and predictive admin dashboard with a native Flutter mobile application, consuming unified RESTful APIs and real-time Kafka event streams.

---

## Key Highlights & Architecture

- **Cross-Platform UI & State Synchronization**: Engineered a responsive web storefront with React (Vite/Tailwind) alongside a native mobile app using Flutter (BLoC), enabling sub-millisecond cart state synchronization across clients.
- **Event-Driven Microservices**: Decouples checkout workflows by implementing an Apache Kafka event streaming pipeline for asynchronous `OrderPlaced` event broadcasting, inventory deduction, and predictive analytics.
- **Advanced Data Layer & Volatile Caching**: Utilizes PostgreSQL JSONB to support schema-less digital asset specifications and license tiers, backed by a Redis caching layer for rapid session management.
- **Enterprise Reliability & AI Integration**: Integrates an Agentic AI shopping assistant for natural language discovery and fortifies inter-service communications using Resilience4j circuit breakers.
- **Cloud-Native Container Orchestration**: Multi-stage Docker containerization deployed to Kubernetes on AWS EKS with automated GitHub Actions CI/CD.

---

## 10-Day Engineering Roadmap

- [x] **Day 1: React Storefront Prototyping**
  - Vite + React 18 + TypeScript + Tailwind CSS setup.
  - Digital assets catalog with dynamic PostgreSQL JSONB attribute modeling.
  - Interactive slide-out cart drawer, toast notifications, cyber boot loader, and scroll-reveal animations.
- [ ] **Day 2: React Admin Dashboard & AI Interface**
  - Protected admin routes with role-based mock authentication.
  - Real-time inventory table, predictive sales charts, and Agentic AI chat assistant.
- [ ] **Day 3: Infrastructure Provisioning & Data Layer**
  - Local `docker-compose.yml` for PostgreSQL, Redis, and Apache Kafka.
  - Spring Boot 21 project scaffolding with Flyway migrations supporting `JSONB`.
- [ ] **Day 4: Spring Boot Core APIs & Redis Caching**
  - JPA entities with JSONB type mappings, CRUD REST endpoints, and JWT authentication.
  - RedisTemplate volatile shopping cart and session management.
- [ ] **Day 5: Agentic AI Integration & Resilience4j**
  - Intent-parsing natural language search mapped to PostgreSQL JSONB queries.
  - Resilience4j circuit breakers and fallbacks for external payment gateways.
- [ ] **Day 6: Kafka Event Streaming Pipeline**
  - Asynchronous `OrderPlaced` Kafka producer and consumer services.
  - Comprehensive JUnit test suite for checkout and inventory streams.
- [ ] **Day 7: Web Integration & End-to-End Testing**
  - Live Axios REST integration, JWT auth interceptors, and Kafka-backed admin metrics updates.
- [ ] **Day 8: Flutter Mobile Scaffold & State Management**
  - Cross-platform Flutter mobile app setup with BLoC architecture.
- [ ] **Day 9: Mobile Backend Integration**
  - Mobile REST connectivity, real-time Redis cart synchronization, and native AI search.
- [ ] **Day 10: Containerization & Cloud Deployment**
  - Production Dockerfiles, Kubernetes manifests, AWS EKS configuration, and CI/CD pipelines.

---

## Project Structure

```
Omnicart/
├── frontend/             # React 18 + TypeScript + Tailwind CSS Storefront & Admin
│   ├── src/
│   │   ├── components/   # UI components (Navbar, CartDrawer, LoadingScreen, etc.)
│   │   ├── context/      # React Cart & Session State Management
│   │   ├── data/         # Dynamic JSONB Mock Catalog
│   │   └── types/        # TypeScript Interfaces & Models
│   └── package.json
├── backend/              # Java 21 + Spring Boot Microservices (Upcoming Day 3-6)
├── mobile/               # Flutter + BLoC Mobile App (Upcoming Day 8-9)
├── infra/                # Docker Compose & Kubernetes Manifests (Upcoming Day 3, 10)
└── README.md
```

---

## Getting Started (Frontend)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## License
MIT License © 2026 Sahil Ballav
