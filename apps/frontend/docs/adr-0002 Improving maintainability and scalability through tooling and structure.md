# ADR 0002: Improving maintainability and scalability through tooling and structure



## Context

The current codebase lacks important development and testing infrastructure:

- No centralized UI-kit for reusable components.

- No CI/CD pipeline for automated testing and deployment.

- No Storybook setup for component isolation and documentation.

- No unit tests in place.

These limitations make the system harder to scale and maintain as it grows.



## Decision

To improve maintainability and scalability, I propose:

- Extract all reusable UI components (buttons, inputs, modals, etc.) into components/ui/ to keep the codebase organized, reduce duplication, and make the UI easier to maintain and scale. It improves consistency across the app and simplifies reuse in different parts of the project.

- Write unit tests using Vitest, colocated with the components and logic they test. Vitest was chosen because it provides native integration with Vite (which we already use), offers a Jest-compatible API for familiarity and easy adoption, delivers excellent TypeScript support out of the box, and runs tests extremely fast thanks to its modern architecture and parallel execution. It also simplifies configuration, supports JSDOM for UI testing, and integrates well with tools like Testing Library — making it ideal for a modern frontend codebase.

- Set up Storybook for isolated component development and documentation because it allows you to build and test UI components independently, without relying on the app’s full context. It improves development speed and makes debugging easier.

- Configure GitHub Actions for CI/CD to run linting and tests on pull requests because it helps catch issues early, ensures code quality, and keeps the main branch stable. It automates checks on every PR, saving time and reducing human error in the review process.



## Rationale

Adding a design system and tooling infrastructure will improve collaboration, reduce bugs, and prepare the project for long-term growth.



## Status
Proposed



## Consequences

### Positive:

- Easier reuse of components.

- Faster development cycles.

- Fewer bugs and regressions.

- Better documentation for developers.



### Negative:

- Initial setup effort.

- Slight increase in project complexity.

- Onboarding required for team members unfamiliar with the tools.