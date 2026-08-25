import { auth } from "./components/UI/auth-status/auth.js";

await auth.init();

await import("./components/portfolio-app.js");
await import("./components/blog/blog-app.js");
await import("./components/UI/auth-status/auth-status.js");

// page specific .js
await import("./stash/page-stuff/home/home.js");
await import("./stash/page-stuff/about/about.js");
await import("./stash/page-stuff/contact/contact.js");