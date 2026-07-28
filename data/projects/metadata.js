export const data = {
  "name": "Archive",
  "children": [
    {
      "name": "Personal",
      "children": [
        {
          "name": "Web",
          "children": [
            {
              "name": "WallpapersPoint",
              "type": "project",
              "description": "A web project focused on creating and managing wallpaper collections.",
              "content": "wallpaperspoint.md",
              "tags": ["nextjs", "firebase"]
            },
            {
              "name": "GameNotes",
              "type": "project",
              "description": "A platform for documenting and organizing notes and critics about videogames.",
              "content": "gamenotes.md",
              "tags": ["nextjs", "firebase"]
            },
            {
              "name": "LMU SetupHub",
              "type": "project",
              "description": "A telemetry-driven platform for sharing and analyzing Le Mans Ultimate setups.",
              "content": "lmusetuphub.md",
              "tags": ["nextjs", "firebase", "tailwind"]
            },
            {
              "name": "Orchard",
              "type": "project",
              "description": "A platform designed to host and run small web applications inside a unified environment.",
              "children": [
                {
                  "name": "Orchard Web",
                  "type": "subproject",
                  "description": "The main web platform for managing and running Orchard applications.",
                  "content": "orchardweb.md",
                  "tags": ["nextjs", "supabase", "tailwind"]
                },
                {
                  "name": "Orchard SDK",
                  "type": "subproject",
                  "description": "A JavaScript SDK that allows applications to communicate with the Orchard platform.",
                  "content": "orchardsdk.md",
                  "tags": ["javascript", "npmpackage"]
                },
                {
                  "name": "Orchard App Collection",
                  "type": "subproject",
                  "description": "A collection of applications developed to demonstrate Orchard capabilities.",
                  "content": "orcharddemo.md",
                  "tags": ["react", "html", "css", "javascript", "orchardsdk"]
                }
              ]
            },
            {
              "name": "Portfolio & Blog",
              "type": "project",
              "description": "Transforming a GitHub Pages static website into a functioning web application with custom components and a content system.",
              "content": "portfolio.md",
              "featured": "true",
              "tags": ["webcomponents", "html", "css", "javascript", "expressjs"]
            }
          ]
        },
        {
          "name": "Experiments",
          "children": [
            {
              "name": "Motorsport Manager CMD Game",
              "type": "experiment",
              "description": "A command-line motorsport management game prototype.",
              "content": "motorsportcmd.md",
              "tags": ["csharp", "console"]
            },
            {
              "name": "Glyphica: Typing Survival Language Pack",
              "type": "mod",
              "description": "A community contribution creating a language pack for Glyphica: Typing Survival.",
              "content": "glyphicamod.md",
              "tags": ["game", "modding", "steam"]
            }
          ]
        }
      ]
    },
    {
      "name": "Academic",
      "children": [
        {
          "name": "WaveForge",
          "type": "project",
          "description": "My thesis project, WFC image generator webapplication using Next.js and Supabase",
          "content": "wfcforge.md",
          "tags": ["nextjs", "supabase", "algorithms", "wavefunctioncollapse", "javascript",]
        },
        {
          "name": "LMU Racing Assistant",
          "type": "experiment",
          "description": "A software assistant designed around simulator racing workflows and live data.",
          "content": "lmuassistant.md",
          "tags": ["csharp", "windows", "wpf", "desktop"]
        },
      ]
    },
    {
      "name": "Professional",
      "children": [
        {
          "name": "Development",
          "children": [
            {
              "name": "Corporate Applications",
              "type": "professional",
              "description": "Full-stack development of enterprise applications in a professional environment.",
              "content": "corporateapps.md",
              "tags": [".net", "csharp", "react", "agile-workflow"]
            },
            {
              "name": "KUKA Configurator",
              "type": "professional",
              "description": "Frontend development and design leadership for the KUKA Configurator software as a junior developer. Made architectural and design decisions, solved critical blockers, and helped deliver a successful and efficient product after a one-year development cycle.",
              "content": "kukaconfigurator.md",
              "tags": ["frontend", "react", "csharp", "architecture", "product-design", "legacy-modernization", "design-decisions", "enterprise", "agile-workflow"]
            }
          ]
        }
      ]
    },
    {
      "name": "Open Source",
      "children": [
        {
          "name": "TMNF Randomizer",
          "type": "opensource",
          "description": "Contribution to the TMNF Randomizer open-source project.",
          "content": "tmnfrandomizer.md",
          "tags": ["csharp", "game", "modding", "contribution"]
        }
      ]
    }
  ]
}