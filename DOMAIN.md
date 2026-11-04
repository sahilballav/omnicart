# OmniCart: Custom Domain & Production DNS Configuration

This document specifies the network and DNS records required to bind the custom domain `omnicart.io` to the OmniCart production infrastructure.

---

## 1. Primary Domain Mapping

- **Primary Production Domain**: `omnicart.io`
- **Subdomain Redirect**: `www.omnicart.io`
- **CNAME Mapping**: Configured via `frontend/public/CNAME` pointing to apex routing.

---

## 2. DNS Zone Records

Configure the following records in your authoritative DNS provider (e.g. Cloudflare, Route53, Namecheap):

| Type | Host / Name | Target / Value | TTL | Proxy Status |
|:---:|:---:|:---:|:---:|:---:|
| **A** | `@` (apex) | `185.199.108.153` | Auto / 300s | DNS Only / Proxied |
| **A** | `@` (apex) | `185.199.109.153` | Auto / 300s | DNS Only / Proxied |
| **A** | `@` (apex) | `185.199.110.153` | Auto / 300s | DNS Only / Proxied |
| **A** | `@` (apex) | `185.199.111.153` | Auto / 300s | DNS Only / Proxied |
| **CNAME** | `www` | `omnicart.io` | Auto / 300s | DNS Only / Proxied |
| **CNAME** | `api` | `aws-us-east-1-alb.omnicart.internal` | 300s | DNS Only |

---

## 3. SSL / TLS Certificate Policy

- **TLS Version**: Strict TLS 1.3 requirement (minimum TLS 1.2).
- **Certificate Authority**: Let's Encrypt automated ACME issuance or AWS ACM Certificate.
- **HSTS Header**: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- **Security Headers**:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Content-Security-Policy: default-src 'self' https:; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;`

