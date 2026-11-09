const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  Header,
  Footer,
  PageNumber
} = require('docx');

// Professional Palette
const FONT_PRIMARY = 'Calibri';
const COLOR_PRIMARY = '0A192F';   // Dark Navy
const COLOR_SECONDARY = '1E3A8A'; // Deep Blue
const COLOR_TEXT = '2D3748';      // Charcoal Body
const COLOR_MUTED = '718096';     // Cool Gray
const COLOR_ACCENT = '2B6CB0';    // Accent Blue
const COLOR_BG_HEADER = 'EDF2F7';  // Light Cool Gray
const COLOR_BG_ALT = 'F7FAFC';     // Very Light Slate
const BORDER_COLOR = 'CBD5E0';

const thinBorder = {
  style: BorderStyle.SINGLE,
  size: 4,
  color: BORDER_COLOR,
};

const cellBorders = {
  top: thinBorder,
  bottom: thinBorder,
  left: thinBorder,
  right: thinBorder,
};

function createTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text: text,
        font: FONT_PRIMARY,
        size: 36, // 18pt
        bold: true,
        color: COLOR_PRIMARY,
      }),
    ],
  });
}

function createSubtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 60, after: 240 },
    children: [
      new TextRun({
        text: text,
        font: FONT_PRIMARY,
        size: 24, // 12pt
        italics: true,
        color: COLOR_MUTED,
      }),
    ],
  });
}

function createHeading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 140 },
    children: [
      new TextRun({
        text: text,
        font: FONT_PRIMARY,
        size: 30, // 15pt
        bold: true,
        color: COLOR_PRIMARY,
      }),
    ],
  });
}

function createHeading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 100 },
    children: [
      new TextRun({
        text: text,
        font: FONT_PRIMARY,
        size: 26, // 13pt
        bold: true,
        color: COLOR_SECONDARY,
      }),
    ],
  });
}

function createHeading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text: text,
        font: FONT_PRIMARY,
        size: 22, // 11pt
        bold: true,
        color: COLOR_ACCENT,
      }),
    ],
  });
}

function createParagraph(text, options = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 100, line: 276 },
    children: [
      new TextRun({
        text: text,
        font: FONT_PRIMARY,
        size: 22,
        color: options.color || COLOR_TEXT,
        bold: options.bold || false,
        italics: options.italics || false,
      }),
    ],
  });
}

function createBulletItem(boldPrefix, text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 40, after: 60 },
    children: [
      new TextRun({
        text: boldPrefix ? boldPrefix + ' ' : '',
        font: FONT_PRIMARY,
        size: 22,
        bold: true,
        color: COLOR_PRIMARY,
      }),
      new TextRun({
        text: text,
        font: FONT_PRIMARY,
        size: 22,
        color: COLOR_TEXT,
      }),
    ],
  });
}

function createCallout(title, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              left: { style: BorderStyle.SINGLE, size: 24, color: COLOR_ACCENT },
            },
            shading: { fill: COLOR_BG_ALT },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { before: 0, after: 60 },
                children: [
                  new TextRun({
                    text: title,
                    font: FONT_PRIMARY,
                    size: 22,
                    bold: true,
                    color: COLOR_SECONDARY,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 0, after: 0 },
                children: [
                  new TextRun({
                    text: text,
                    font: FONT_PRIMARY,
                    size: 20,
                    italics: true,
                    color: COLOR_TEXT,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createStyledTable(headers, rowsData, colWidths) {
  const tableRows = [];

  // Header Row
  tableRows.push(
    new TableRow({
      tableHeader: true,
      children: headers.map((headerText, i) =>
        new TableCell({
          borders: cellBorders,
          shading: { fill: COLOR_BG_HEADER },
          width: { size: colWidths[i], type: WidthType.PERCENTAGE },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 0, after: 0 },
              children: [
                new TextRun({
                  text: headerText,
                  font: FONT_PRIMARY,
                  size: 20,
                  bold: true,
                  color: COLOR_PRIMARY,
                }),
              ],
            }),
          ],
        })
      ),
    })
  );

  // Data Rows
  rowsData.forEach((row, rowIndex) => {
    const isAlt = rowIndex % 2 === 1;
    tableRows.push(
      new TableRow({
        children: row.map((cellText, colIndex) =>
          new TableCell({
            borders: cellBorders,
            shading: isAlt ? { fill: COLOR_BG_ALT } : undefined,
            width: { size: colWidths[colIndex], type: WidthType.PERCENTAGE },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { before: 0, after: 0 },
                children: [
                  new TextRun({
                    text: cellText,
                    font: FONT_PRIMARY,
                    size: 19,
                    color: COLOR_TEXT,
                  }),
                ],
              }),
            ],
          })
        ),
      })
    );
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows,
  });
}

async function generateMasterDocument(outputPath) {
  console.log(`Generating Master Architecture Specification at: ${outputPath}`);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'RESTRICTED // OMNICART INTERNAL SYSTEM DESIGN SPECIFICATION',
                    font: FONT_PRIMARY,
                    size: 16,
                    color: COLOR_MUTED,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: 'Page ', font: FONT_PRIMARY, size: 18, color: COLOR_MUTED }),
                  new TextRun({ children: [PageNumber.CURRENT], font: FONT_PRIMARY, size: 18, color: COLOR_MUTED }),
                  new TextRun({ text: ' of ', font: FONT_PRIMARY, size: 18, color: COLOR_MUTED }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT_PRIMARY, size: 18, color: COLOR_MUTED }),
                ],
              }),
            ],
          }),
        },
        children: [
          createTitle('OMNICART // MASTER SYSTEM DESIGN & TECHNICAL ARCHITECTURE'),
          createSubtitle('Confidential Enterprise Specification: Cloud-Native Multi-Platform Digital Commerce'),

          createCallout(
            'RESTRICTED // INTERNAL PROPRIETARY SPECIFICATION',
            'This specification outlines the unified system design, cryptographic entitlement protocols, data persistence models, resilience topologies, and event streaming pipelines of the OmniCart engineering platform. Do not distribute externally or publish to public repositories.'
          ),

          new Paragraph({ spacing: { before: 180, after: 180 } }),

          createStyledTable(
            ['System Dimension', 'Technical Specification'],
            [
              ['System Architecture Style', 'Cloud-Native Decoupled Hexagonal Gateway with Asynchronous Event Streaming'],
              ['Primary Runtimes', 'Java 21 LTS (Spring Boot 3.3.4), TypeScript 5.x (Node 24 / Vite 6), SQL (PostgreSQL 16), Dart (Flutter 3.x)'],
              ['Relational Data Layer', 'PostgreSQL 16 with native JSONB dynamic attributes, GIN indexing, and pg_trgm trigrams'],
              ['In-Memory Caching', 'Redis 7 Alpine (sub-millisecond transient shopping cart sessions, 24-hour TTL)'],
              ['Event Streaming Broker', 'Apache Kafka 3.7.0 in KRaft consensus mode (omnicart.orders.placed topic, 3 partitions)'],
              ['Fault Tolerance Engine', 'Resilience4j 2.2.0 (Sliding-window CircuitBreaker, RateLimiter, Exponential Backoff Retry)'],
              ['Agentic AI Engine', 'Natural Language Intent Parser with dynamic PostgreSQL JSONB relevance scoring & CLI plan synthesis'],
              ['Frontend Client', 'React 18 / 19 Single Page Application, Tailwind CSS 3.4+, Lucide Icons, Dual Motion Video Backgrounds'],
              ['Security Architecture', 'Zero-Trust RBAC, Ed25519 digital license tokens, OAuth 2.1 PKCE, BCrypt (strength 12), Spring Security 6 JWT'],
              ['Cloud Deployment Target', 'Docker & Docker Compose (Local Development); AWS EKS Kubernetes Manifests (Production)']
            ],
            [30, 70]
          ),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 1
          createHeading1('1. Domain Architecture & Problem Statement'),
          createParagraph(
            'OmniCart is an enterprise digital commerce ecosystem engineered to distribute, license, and verify cloud blueprints, infrastructure-as-code modules, multi-agent AI frameworks, and distributed systems masterclasses.'
          ),
          createParagraph(
            'Unlike legacy physical retail e-commerce, digital technical artifacts demand a fundamentally specialized system design:'
          ),
          createBulletItem('Schema-Less Specification Engine:', 'Technical blueprints cannot fit into rigid relational columns. A Terraform EKS bundle requires iac_framework, cloud_provider, and modules_included, while an AI kit requires ai_engine, model_providers, and vector_databases. OmniCart implements PostgreSQL 16 JSONB with Generalized Inverted (GIN) indices to query nested specifications in sub-millisecond time without schema alter migrations.'),
          createBulletItem('Cryptographic Entitlement Verification:', 'Physical goods require shipping manifests; software assets require cryptographic seat allocations. OmniCart generates asymmetric Ed25519 digital license tokens (e.g. ED25519-EKS-774A-91BF-2026-OMNI) paired with verified private GitHub repository access grants.'),
          createBulletItem('High-Velocity Cart Offloading:', 'Frequent add-to-cart, seat modification, and coupon evaluations are offloaded from relational disk storage into Redis 7 in-memory cache with automated 24-hour TTL, slashing relational database load by over 80%.'),
          createBulletItem('Event-Driven Decoupled Lifecycle:', 'Checkout transactions do not synchronously process downstream inventory, email deliveries, and analytics. Instead, an OrderPlaced event is published to Apache Kafka, allowing independent consumer services to deduct seats and aggregate sales metrics asynchronously.'),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 2
          createHeading1('2. Master System Topology & Data Flow'),
          createParagraph(
            'The platform is structured into decoupled architectural tiers with strict ingress boundaries:'
          ),
          createBulletItem('Presentation Tier (Web & Mobile):', 'React 18/19 Single Page Application with brutalist high-contrast aesthetic (SNKS style, OLED pitch black #000000, volt yellow #D4FF00 accents). Equipped with dual-mode video motion backgrounds and an RBAC-gated Operator Console (Ctrl+Shift+A). Future Flutter 3.x mobile app connects natively to the same gateway.'),
          createBulletItem('API Gateway Tier (Java 21 / Spring Boot 3.3):', 'Embedded Tomcat on port 8080. Handles RESTful routing, CORS policies, Jakarta Bean Validation, and universal ApiResponse<T> envelopes.'),
          createBulletItem('Resilience Tier (Resilience4j):', 'Intercepts high-risk external dependencies (third-party payment clearinghouses, AI proxies). Enforces 6-call sliding window circuit breakers, 3-attempt exponential retries, and 5 req/sec rate limiters with graceful fallback ledgers.'),
          createBulletItem('Data Tier (PostgreSQL 16 & Redis 7):', 'PostgreSQL on host port 5433 stores products, orders, and order_items with JSONB specs and GIN indexing. Redis 7 on port 6379 caches user cart sessions with 8% tax calculation and 24-hour TTL.'),
          createBulletItem('Event Streaming Tier (Apache Kafka 3.7):', 'KRaft consensus broker on port 9092. Orchestrates omnicart.orders.placed topic dispatches to asynchronous Inventory Consumers and Analytics Velocity Aggregators.'),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 3
          createHeading1('3. Client Subsystem: React Storefront & Operator Console'),
          createParagraph(
            'The client application is built with React 18/19, Vite 6, TypeScript 5.x, and Tailwind CSS 3.4+:'
          ),
          createBulletItem('Dual-Mode Video Motion Background (BackgroundMotionVideo.tsx):', 'Dynamically swaps motion video streams based on active theme: tech-flow.mp4 / dark-motion.mp4 for dark mode and light-motion.mp4 for light mode. Positioned at fixed z-0 behind content at relative z-10 with zero text translucent blur.'),
          createBulletItem('Dynamic Navigation Indicator Pill (Navbar.tsx):', 'Neon highlight pill smoothly animates across category buttons upon click and synchronizes with viewport scroll position using IntersectionObserver scroll-spy.'),
          createBulletItem('Zero-Trust Operator Console (AdminDashboard.tsx):', 'Hidden from public navbars and footers to eliminate bot scanning. Unlocked via global shortcut Ctrl+Shift+A (or Cmd+Shift+A) or direct #admin URL route. Unauthenticated visitors are intercepted by a zero-trust cryptographic challenge screen.'),
          createBulletItem('Live Inventory Modifier (InventoryTable.tsx):', 'Allows authorized platform administrators to modify license seats and edit JSONB specifications in real time.'),
          createBulletItem('Predictive Analytics Engine (PredictiveAnalytics.tsx):', 'Displays real-time sales velocity charts, inventory depletion forecasts, and live Kafka event throughput telemetry.'),
          createBulletItem('AI Shopping Assistant Drawer (AiShoppingAssistant.tsx):', 'Floating interactive terminal assistant with natural language query templates and simulated SQL feedback.'),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 4
          createHeading1('4. Backend Subsystem: Spring Boot 3.3 Core Microservices'),
          createParagraph(
            'The backend is built with Java 21 LTS and Spring Boot 3.3.4, using virtual threads and strict memory safety:'
          ),
          createBulletItem('Product Management Controller (ProductController.java):', 'Provides /api/v1/products supporting pagination, category filtering, full-text trigram search, and native PostgreSQL JSONB queries (findByJsonbAttribute).'),
          createBulletItem('Redis Shopping Cart Service (CartController.java, CartServiceImpl.java):', 'Manages high-velocity volatile cart sessions. Serializes Cart and CartItem objects into Redis with sub-millisecond read/write latency, automated 8% digital tax calculation, and 24-hour TTL.'),
          createBulletItem('Resilient Payment Controller (PaymentController.java):', 'Exposes /api/v1/payments/process and /api/v1/payments/circuit-status. Protected by Resilience4j CircuitBreakers, Retries, and RateLimiters.'),
          createBulletItem('Agentic AI Controller (AiAssistantController.java):', 'Exposes /api/v1/ai/search, /api/v1/ai/chat, and /api/v1/ai/prompts for natural language architecture recommendations.'),
          createBulletItem('Universal Response Architecture (ApiResponse.java):', 'Standardized JSON envelope with success status, human-readable message, typed data payload, and ISO timestamp.'),
          createBulletItem('Global Exception Interceptor (GlobalExceptionHandler.java):', 'Centralized handler mapping ResourceNotFoundException to 404, Bean Validation errors to 400, PaymentGatewayException to 503, and RateLimiter rejections to 429.'),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 5
          createHeading1('5. Persistence & In-Memory Data Architecture'),
          createParagraph(
            'The storage tier leverages PostgreSQL 16 (on remapped host port 5433) and Redis 7 (port 6379):'
          ),
          createHeading2('Database Schema Specification'),
          createStyledTable(
            ['Table Name', 'Primary Key', 'Key Indices & Types', 'Architectural Role'],
            [
              ['products', 'id VARCHAR(64)', 'idx_products_category (B-Tree), idx_products_attributes_gin (GIN JSONB), idx_products_name_trgm (GIN Trigram)', 'Stores digital blueprints with dynamic JSONB attributes, rating, price, and stock seats.'],
              ['orders', 'id VARCHAR(64)', 'idx_orders_user_id (B-Tree), idx_orders_status (B-Tree), idx_orders_created_at (DESC)', 'Records checkout transactions, delivery emails, settled totals, and Kafka lifecycle states.'],
              ['order_items', 'id VARCHAR(64)', 'idx_order_items_order_id (FK), idx_order_items_product_id (FK)', 'Stores purchased line item seats, unit prices, and issued Ed25519 digital license tokens in JSONB.']
            ],
            [18, 18, 34, 30]
          ),
          new Paragraph({ spacing: { before: 120, after: 60 } }),
          createParagraph(
            'PostgreSQL JSONB Generalized Inverted Indices (GIN) allow dynamic queries such as attributes ->> \'iac_framework\' = \'Terraform\' to execute in logarithmic time O(log n) rather than sequential full-table scans.'
          ),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 6
          createHeading1('6. Subsystem: Agentic AI Natural Language Intent Parser'),
          createParagraph(
            'The AI search engine translates unstructured customer prompts into high-precision database filters:'
          ),
          createBulletItem('Natural Language Parsing (AiQueryParserService.java):', 'Extracts budget limits (under $200), target cloud providers (AWS, GCP, Multi-Cloud), IaC frameworks (Terraform, Helm), runtimes (Java 21, Python 3.11, Go 1.22, TypeScript 5.x), categories, and distinct keyword tokens.'),
          createBulletItem('Dynamic Specification Search (AiSearchServiceImpl.java):', 'Executes multi-factor candidate scoring: +25 per keyword match, +40 category match, +20 budget adherence, +35 JSONB attribute match. Synthesizes automated architectural reasoning explaining candidate fit alongside executable CLI next steps (e.g. terraform init, docker compose up -d).'),
          createBulletItem('Graceful Fallback Mode:', 'If the NLP parser or external LLM trips, the service automatically falls back to an ultra-fast in-memory heuristic ranker without interrupting the customer search experience.'),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 7
          createHeading1('7. Subsystem: Fault Tolerance, Circuit Breaking & Chaos Engineering'),
          createParagraph(
            'Resilience4j 2.2.0 protects the microservice layer against cascading failures:'
          ),
          createStyledTable(
            ['Fault Tolerance Primitive', 'Configured Setting', 'System Behavior Under Stress'],
            [
              ['CircuitBreaker Sliding Window', '6 calls', 'Monitors recent transactions; trips if 3 of 6 calls fail or exceed 2000ms.'],
              ['CircuitBreaker Open Duration', '8,000ms', 'Blocks downstream traffic for 8 seconds, instantly invoking fallbackPayment().'],
              ['Half-Open Trial Calls', '3 calls', 'Permits 3 trial requests after 8s; automatically heals circuit to CLOSED if all succeed.'],
              ['Exponential Backoff Retry', 'Max 3 attempts (multiplier: 2)', 'Retries transient network glitches at 500ms -> 1000ms -> 2000ms intervals.'],
              ['RateLimiter', '5 req/sec (100ms timeout)', 'Throttles concurrent checkout bursts to protect payment clearinghouse and inventory.'],
              ['Chaos Simulation Modes', 'SIMULATE_FAIL / SIMULATE_TIMEOUT', 'Allows automated testing of HTTP 503 outages and 3.5s latency spikes.']
            ],
            [25, 25, 50]
          ),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 8
          createHeading1('8. Subsystem: Apache Kafka Event Streaming Pipeline'),
          createParagraph(
            'The asynchronous order lifecycle decouples checkout settlement from downstream processing:'
          ),
          createBulletItem('Asynchronous Checkout Producer:', 'Checkout API publishes an OrderPlacedEvent payload to Kafka topic omnicart.orders.placed upon customer payment clearance.'),
          createBulletItem('Inventory Consumer Service:', 'Subscribes to omnicart.orders.placed and atomically decrements product inventory seats in PostgreSQL, triggering backorder alerts if stock drops below threshold.'),
          createBulletItem('Analytics Consumer Service:', 'Aggregates purchasing velocity in 5-minute sliding windows for real-time broadcast to the operator dashboard.'),
          createBulletItem('Integration Verification:', 'JUnit 5 and Testcontainers suite verifies containerized PostgreSQL, Redis, and Kafka producer-consumer contracts with exactly-once semantics.'),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 9
          createHeading1('9. Enterprise Zero-Trust Security Architecture'),
          createStyledTable(
            ['Security Dimension', 'Implementation Mechanism', 'Threat Mitigated'],
            [
              ['Role-Based Access Control', 'AdminDashboard.tsx RBAC security gateway with unauthenticated challenge screen', 'Unauthorized administrative console access'],
              ['Hidden Operator Route', 'Admin access removed from public navbars/footers; accessible via Ctrl+Shift+A hotkey or #admin route', 'Reconnaissance and automated brute-force bot scanning'],
              ['Digital License Cryptography', 'Ed25519 asymmetric key signatures embedded in license tokens (e.g. ED25519-EKS-774A...)', 'Software entitlement forgery and license tampering'],
              ['Client Authentication', 'OAuth 2.1 Authorization Code Flow with PKCE and Passwordless Email Magic Links', 'Client-side credential exposure and secret leakage'],
              ['Backend Authentication', 'Spring Security 6 stateless filter chain with short-lived JWTs and JWKS verification', 'Session fixation, CSRF, and stateful cookie vulnerabilities'],
              ['Credential Storage', 'BCrypt password hashing with adaptive work factor of 12', 'Database credential dumping and rainbow table cracking'],
              ['Data Query Security', 'JPA parameterized queries and Criteria API with PostgreSQL JSONB validation', 'SQL Injection (SQLi) and dynamic parameter tampering'],
              ['Denial-of-Service Defense', 'Resilience4j RateLimiter (5 req/s on checkout, 10 req/s on AI search)', 'Brute-force credential stuffing and volumetric traffic floods'],
              ['Subnet Isolation', 'Dedicated Docker bridge network (omnicart-network) and remapped host port 5433', 'Default port probing and cross-container lateral traversal']
            ],
            [22, 45, 33]
          ),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 10
          createHeading1('10. Complete REST API Endpoint Directory'),
          createStyledTable(
            ['HTTP Method', 'Path', 'Access Role', 'Purpose & Query Parameters'],
            [
              ['GET', '/api/v1/products', 'Public', 'Retrieve paginated products. Params: category, query, maxPrice, page, size, sort.'],
              ['GET', '/api/v1/products/{id}', 'Public', 'Retrieve single blueprint by ID with complete JSONB attributes and specs.'],
              ['POST', '/api/v1/products', 'ADMIN', 'Create new digital blueprint with JSONB attributes.'],
              ['PUT', '/api/v1/products/{id}', 'ADMIN', 'Update blueprint details and technical attributes.'],
              ['DELETE', '/api/v1/products/{id}', 'ADMIN', 'Remove blueprint asset from database.'],
              ['GET', '/api/v1/cart/{sessionId}', 'Public', 'Retrieve active shopping cart from Redis cache with sub-millisecond latency.'],
              ['POST', '/api/v1/cart/{sessionId}/items', 'Public', 'Add item to cart; recalculates 8% digital tax and total in Redis.'],
              ['PUT', '/api/v1/cart/{sessionId}/items/{id}', 'Public', 'Update item quantity / seats in Redis cart.'],
              ['DELETE', '/api/v1/cart/{sessionId}/items/{id}', 'Public', 'Remove item from Redis cart.'],
              ['DELETE', '/api/v1/cart/{sessionId}', 'Public', 'Flush and clear shopping cart session from Redis.'],
              ['POST', '/api/v1/ai/search', 'Rate-Limited', 'Submit natural language query for NLP intent parsing and JSONB spec matching.'],
              ['POST', '/api/v1/ai/chat', 'Rate-Limited', 'Conversational assistant endpoint returning recommendations and CLI action steps.'],
              ['GET', '/api/v1/ai/prompts', 'Public', 'Retrieve curated sample engineering prompts for customer guidance.'],
              ['POST', '/api/v1/payments/process', 'Circuit-Guarded', 'Execute payment authorization with CircuitBreaker, RateLimiter, and fallback.'],
              ['GET', '/api/v1/payments/circuit-status', 'ADMIN', 'Retrieve live Resilience4j CircuitBreaker metrics (state, failure rate, calls).'],
              ['GET', '/actuator/health', 'Public', 'Expose system health status for PostgreSQL, Redis, and disk space.']
            ],
            [12, 28, 20, 40]
          ),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 11
          createHeading1('11. Master Technology Stack Matrix'),
          createStyledTable(
            ['Domain / Layer', 'Technology & Version', 'Architectural Purpose in OmniCart'],
            [
              ['Language Runtime', 'Java 21 LTS (Oracle / Temurin)', 'Core enterprise backend runtime providing virtual threads and strict memory safety.'],
              ['Backend Framework', 'Spring Boot 3.3.4', 'Microservice framework providing IoC, web MVC, and cloud configuration.'],
              ['Database Engine', 'PostgreSQL 16 Alpine', 'Primary relational persistence with native JSONB dynamic schema support and GIN indices.'],
              ['Database Migrations', 'Flyway 10.x', 'Automated version-controlled database DDL and DML schema execution.'],
              ['Cache Engine', 'Redis 7 Alpine', 'In-memory key-value data store powering sub-millisecond shopping cart sessions.'],
              ['Message Streaming', 'Apache Kafka 3.7 (KRaft)', 'High-throughput event streaming platform for checkout and inventory dispatches.'],
              ['Fault Tolerance', 'Resilience4j 2.2.0', 'CircuitBreaker, RateLimiter, and Exponential Backoff Retry modules.'],
              ['Frontend Runtime', 'Node.js 24.x + Vite 6', 'High-performance ES module frontend bundling and development server.'],
              ['Frontend Framework', 'React 18 / 19 + TypeScript 5.x', 'Reactive component rendering with strict type safety and modular architecture.'],
              ['Styling Engine', 'Tailwind CSS 3.4+ + PostCSS', 'Utility-first brutalist styling system with OLED dark and light modes.'],
              ['Iconography', 'Lucide React', 'Consistent micro-interaction icon set.'],
              ['Mobile Runtime (Upcoming)', 'Flutter 3.x + Dart 3.x', 'Cross-platform native mobile application engine.'],
              ['Mobile State Management', 'BLoC Pattern (flutter_bloc)', 'Predictable, unidirectional reactive event-state management.'],
              ['Containerization', 'Docker 29.x & Docker Compose', 'Isolated multi-container local and production deployment runtimes.'],
              ['Cloud Orchestration', 'AWS EKS (Kubernetes)', 'Production scalable container orchestration with multi-AZ high availability.'],
              ['CI/CD Pipeline', 'GitHub Actions', 'Automated testing, container building, and deployment pipeline.']
            ],
            [20, 28, 52]
          ),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Section 12
          createHeading1('12. Production Cloud Infrastructure & Kubernetes (AWS EKS)'),
          createParagraph(
            'The production environment is architected for containerized deployment across multi-availability zone AWS EKS clusters:'
          ),
          createBulletItem('Multi-Stage Production Dockerfiles:', 'Frontend uses a multi-stage Docker build exporting static assets to an NGINX Alpine runtime (<25MB). Backend uses an Eclipse Temurin 21 JRE Alpine image with layer caching and non-root execution privileges.'),
          createBulletItem('Kubernetes Workloads & Services:', 'Deployments configure readiness/liveness probes pointing to /actuator/health, Horizontal Pod Autoscaling (HPA) driven by CPU/memory thresholds, and ClusterIP services.'),
          createBulletItem('Secret Management:', 'Zero plaintext credentials in repository; secrets are provisioned via AWS Secrets Manager or HashiCorp Vault and injected into Kubernetes Secrets at runtime.')
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document successfully generated at: ${outputPath}`);
}

const targetPath = process.argv[2] || path.join(__dirname, '..', 'OmniCart_Master_System_Design_Architecture.docx');
generateMasterDocument(targetPath).catch((err) => {
  console.error('Failed to generate document:', err);
  process.exit(1);
});
