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

## Core System Modules

- **Web Storefront & Admin Portal**: Responsive client interface with cyber loading screen, product detail inspectors, and a synchronized slide-out cart drawer.
- **Spring Boot 21 Backend Engine**: Microservices architecture powered by Java 21, Spring Data JPA, and Resilience4j circuit breakers.
- **Apache Kafka Event Broker**: Asynchronous event streams handling order placements, inventory updates, and analytical data pipelines.
- **PostgreSQL JSONB Dynamic Schema**: Schema-less storage for versatile product specs, licensing metadata, and dynamic configurations.
- **Redis Session Tier**: High-speed volatile memory caching for sub-millisecond cross-platform cart synchronization.
- **Flutter Native Mobile Client**: Native mobile experience using BLoC state management synchronized with the cloud backend.

---

## Project Structure

```
Omnicart/
├── frontend/             # React 18 + TypeScript + Tailwind CSS Storefront & Admin
│   ├── src/
│   │   ├── components/   # UI components (Navbar, CartDrawer, LoadingScreen, etc.)
│   │   ├── context/      # React Cart & Session State Management
│   │   ├── data/         # Dynamic JSONB Digital Asset Catalog
│   │   └── types/        # TypeScript Interfaces & Models
│   └── package.json
├── backend/              # Java 21 + Spring Boot Microservices
├── mobile/               # Flutter + BLoC Mobile App
├── infra/                # Docker Compose & Kubernetes Manifests
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
