# React Advises
Hi. These are some good practices I'm collecting for common scenarios we face to while building apps. I'll be updating them to improve them. Please read the takeaways and check out the code. Any feedback is welcome.

## Stack
- ⚛️ React
- 🐜 Ant Design

## Key takeaways
- 🤝 Keep the persistance responsibility at `services` layer to **avoid coupling to a technology** (axios, apollo, SDKs, etc.)
- 💉 *Dependency injection* through a  `ServiceLayerProvider` to **allow testability**
- 💊 Keep the hard data handling encapsulated in *hooks* (like `useUserActions`) to allow **reusability and keep clean components**
- 📦 Use *hooks* to reuse repetitive mechanisms (like the `useService` or `useServiceLayer` hooks)
- 👪 Keep the complex logic in the parent components so there will be many `Simple components` and few `Complex components`
- 🚴 Use **Composition** to reuse behaviors for same type components (like the `ImperativeModal` wrapper)

