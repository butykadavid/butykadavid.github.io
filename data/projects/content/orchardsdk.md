## Orchard SDK (2025)

The Orchard SDK was created as a companion project for Orchard.

While building the platform I realized, I have to provide a tool for developers creating apps for this platform, so that they can have a simulated Orchard enviroment for their local development.

So the point of the tool is basically the following: if you use Orchard SDK for your apps data persistance, and it works locally, it will work on Orchard just the same. 

The SDK provides simple functions for things like:

- Reading and writing application data 
- Communicating with the host application 
- Handling platform-specific features

In local development it uses localStorage to simulate the Orchard Platform data flow and communication

### What I am proud of

- This was my first attempt at creating a reusable library instead of only building applications.
- I had to think about the design from a potential user's (developer's) perspective.
- I created a tool

---
### Important
The project is the result of **peak vibe coding**. Therefore I do not look at this project as a technical or professional achievement, but rather as proof that sometimes the best ideas come from "what if I just built this?"