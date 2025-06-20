# ADR 0001: Improving usability through a unified design system



## Context

The project supports core functionality like adding, editing, deleting, sorting, and playing audio tracks. However, the user experience is lacking in several areas:

- The UI lacks a clear visual hierarchy.

- There is no visual feedback after user actions.

- There is no audio feedback for people with visual impairments.

- The interface is not responsive well on mobile devices.

- Users cannot toggle between light and dark themes.

- The app lacks localization (i18n), limiting it to one language.

These issues reduce intuitiveness and accessibility, especially for new users.



## Decision

To improve usability, I propose the following changes:

- Add toast notifications for success and failure using notistack because it’s simple to use, manages multiple messages smoothly, customizable, and lets you trigger notifications anywhere in the app. It integrates well with React and Material-UI, making it a reliable and efficient choice.

- Enable inline editing of track properties (e.g., title, genre) without modals because it provides a faster, more intuitive user experience. It reduces context switching, keeps users focused on the content, and allows quick edits without breaking the workflow.

- Improve responsive design using Tailwind because it provides a simple, utility-first approach that makes building adaptive layouts fast and consistent. Tailwind’s responsive utilities let you easily control styles at different screen sizes without writing custom CSS, speeding up development and ensuring a clean, maintainable codebase.

- Improve accessibility (screen reader support, ARIA labels, etc.) to ensure the app is usable by everyone, including people with disabilities. This enhances user experience, aligns with web standards, and improves overall quality and inclusivity of the application.

- Implement light/dark theme toggling using Tailwind configuration.

- Integrate react-i18next to support multiple languages (e.g., English and Ukrainian) because it’s easy to set up, handles translations efficiently, supports dynamic language switching, and works seamlessly with React. It also provides useful features like namespaces and interpolation, making multilingual support flexible and maintainable.



## Rationale

Enhancing usability will make the app more intuitive, accessible, and enjoyable to use, attracting a wider user base.



## Status
Proposed



## Consequences

### Positive:

- Better user satisfaction.

- Broader accessibility and mobile support.

- A more polished and modern interface.



### Negative:

- Additional development and testing effort.

- Lock-in to specific third-party tools (e.g. theming with Tailwind) may limit flexibility in the future — migrating to alternative solutions later could require significant effort and refactoring.
