# React Advises
Hi. These are some good practices I'm collecting for common scenarios we face to while building apps. I'll be updating the code to improve it and adding more examples little by little. Please read the takeaways and check out the code. Any feedback is welcome.

## Stack
- ⚛️ React
- 🐜 Ant Design

## How to run
```
yarn install
yarn start
```
## Live preview
https://react-practices-eight.vercel.app/

## Key takeaways
- 🤝 Keep the persistance responsibility at `services` layer to **avoid coupling to a technology** (axios, apollo, SDKs, etc.)
- 💉 *Dependency injection* through a  `ServiceLayerProvider` to **allow testability**
- 💊 Keep the hard data handling encapsulated in *hooks* (like `useUserActions`) to allow **reusability and keep clean components**
- 📦 Use *hooks* to reuse repetitive mechanisms (like the `useService` or `useServiceLayer` hooks)
- 👪 Keep the complex logic in the parent components so there will be many `Simple components` and few `Complex components`
- 🚴 Use **Composition** to reuse behaviors for same type components (like the `ImperativeModal` wrapper)

<img width="1232" alt="Project Screenshot" src="https://user-images.githubusercontent.com/19628446/159146992-5108eed6-f572-4a42-9774-7b8b0dfe9b9b.png">

