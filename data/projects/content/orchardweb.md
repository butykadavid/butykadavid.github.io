## Orchard Web Platform (2025)

Orchard started from a simple question:

"What if small web applications could be created and shared without needing a complete deployment process every time?"

The idea was to create a small platform where applications could be uploaded, housed and executed inside an existing environment. Then users can share them, organize them into dashboards and share those too!

The project became an experiment around modular web applications. Instead of every small application handling everything itself, Orchard provides the environment and communication layer.

Applications can communicate with the platform through a simple API, allowing them to access features like storage and data handling.

The biggest challenge was figuring out how isolated applications should communicate with the main platform. This led me to experiment with browser messaging APIs and sandboxed environments.

The applications living in Orchard are running in iframes (yeah I know, but keep in mind, Orchard has no ambitions growing bigger than a customisable dashboard collection for mainly personal use). The applications in the iframe can persist their data to apps SupaBase database. The uploaded app and the platform can communicate if the uploaded app were properly developed using the SDK.

### What I am proud of
- I came up with an idea to speed up my own development
- I created a system where applications can run independently while still communicating with the host.

---
### Important
The project is the result of **peak vibe coding**. Therefore I do not look at this project as a technical or professional achievement, but rather as proof that sometimes the best ideas come from "what if I just built this?"