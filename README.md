# Sentinel Access Hub (SAH)

**Sentinel Access Hub** — platform-first, policy-driven access control system for enterprise applications.  
Designed to demonstrate domain-first architecture, modularity, and an explainable policy engine.

---

## Overview

SAH is a **modular IAM platform** built as a React/TypeScript monolith with a clear separation of domain, application, and UI layers.  
It provides:

- **Role-Based Access Control (RBAC) + Attribute-Based Access Control (ABAC)**  
- **Policy Engine** with explainable access decisions  
- **Plugin architecture** for extending modules (HR, DB Access, Analytics)  
- **Audit logs** and event-driven architecture  

This project is designed to showcase **enterprise-grade architecture** and scalable frontend design, suitable for portfolio demonstration in German B2B context.

---

## Features

- **User & Role Management**  
  Assign roles to users, define policies, evaluate access dynamically.  

- **Policy Engine**  
  - Role aggregation  
  - Condition evaluation (attributes, time-bound access)  
  - Conflict resolution strategies (deny-overrides, allow-overrides, priority-based)  

- **Access Evaluation**  
  Returns explainable decisions for each action on a resource.  

- **Plugin System**  
  Modules like HR, DB Access, Analytics register resources and permissions dynamically.  

- **Audit & Event Bus**  
  Tracks all access decisions, user activity, and policy changes.

---

## Architecture

```text
src/
├── core/
│ ├── domain/ # Entities: User, Role, Policy, Permission
│ ├── application/ # Use-cases: CreateUser, AssignRole, EvaluateAccess
│ ├── access-evaluator/ # Policy evaluation engine
│ ├── audit/ # Audit logs and events
│ └── plugin-system/ # Plugin registry and domain events
├── plugins/
│ ├── db-access/
│ ├── hr/
│ └── analytics/
├── shared/ # UI components, hooks, utils
└── app/ # React app entry point
```


- **Core** contains all domain logic, independent of UI.  
- **Plugins** extend the platform without modifying core.  
- **Shared** contains reusable utilities and components.  
- **App** contains UI adapter layer.

---

## Access Evaluation Flow

1. Collect user roles  
2. Aggregate policies from roles  
3. Filter rules relevant to requested action/resource  
4. Evaluate conditions (attributes, time, context)  
5. Apply conflict resolution strategy  
6. Return `AccessDecision` with explanation  

```ts
interface AccessDecision {
  result: "allow" | "deny";
  matchedPolicies: string[];
  reason: string;
}
```

Conflict Resolution Strategies

Deny Overrides – any deny policy takes precedence

Allow Overrides – any allow policy takes precedence

Priority Based – higher priority policies override lower ones


```ts
interface IAMPlugin {
  name: string;
  registerResources(): void;
  registerPermissions(): void;
  registerRoutes(): void;
  onEvent(event: DomainEvent): void;
}
```

### Plugins register themselves to the core engine and extend resources/permissions without changing the core.

## Domain Model (Core Entities)

### User
- **id**  
- **attributes**: department, employmentType, seniorityLevel, location, active  
- **roleIds**: array of Role IDs  

### Role
- **id**  
- **policyIds**: array of Policy IDs  

### Policy
- **id**  
- **effect**: `"allow"` | `"deny"`  
- **priority**: number  
- **rules**: array of Rule  

### Rule
- **resource**: ResourceType  
- **action**: ActionType  
- **condition** (optional): Condition  

### Condition
- **type**: `"attribute"` | `"time"`  
- **operator**: `"equals"` | `"notEquals"` | `"in"` | `"gt"` | `"lt"`  
- **field**: string  
- **value**: unknown  

---

## Future Directions

- Expand plugins: additional modules like Feature Flags, Approval Workflows  
- Optional migration to **microfrontend architecture**  
- CI/CD, Docker setup for production-ready deployment  
- More advanced ABAC expressions and policy templates  

---

## Tech Stack

- **React 18 / TypeScript**  
- **Next.js App Router**  
- **Zustand** for local state, **TanStack Query** for server interactions  
- **React Hook Form + Zod** for forms & validation  
- Mock backend via **MSW** (can be swapped for real API)  
- Unit testing: **Vitest / React Testing Library**  

---

## License

MIT License
