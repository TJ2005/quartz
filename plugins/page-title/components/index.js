import { h } from "preact"

const fonts = [
  "Bitcount Grid Double",
  "StMartin",
  "CHAOS16",
  "Darkness",
  "Hayko Demo",
  "IntraNet",
  "IntraNet Outline",
  "Moctavo",
  "Offenbach Mager",
  "Runefa",
  "Star Rust",
  "CHAOS16-Alternate",
]

const RandFont = () => fonts[Math.floor(Math.random() * fonts.length)]

function pathToRoot(slug) {
  const parts = String(slug).split("/")
  return parts.length <= 1 ? "." : "../".repeat(parts.length - 1)
}

const PageTitleComponent = ({ fileData, cfg, displayClass }) => {
  const title = cfg?.pageTitle ?? "Quartz"
  const baseDir = pathToRoot(fileData.slug)

  // Avoid React hooks so this component can run in environments that don't provide React.
  // Compute the chosen font imperatively and persist it to localStorage if available.
  let chosen = RandFont()
  if (typeof window !== "undefined") {
    try {
      const last = localStorage.getItem("quartz_title_font")
      // if there's more than one font available, avoid repeating the last one
      if (last && fonts.length > 1) {
        while (chosen === last) {
          chosen = RandFont()
        }
      }
      localStorage.setItem("quartz_title_font", chosen)
    } catch {
      // localStorage may be unavailable — ignore errors
    }
  }
  const titleFont = chosen

  return h(
    "h2",
    {
      class: [displayClass, "page-title"].filter(Boolean).join(" "),
      style: titleFont ? { fontFamily: `'${titleFont}', sans-serif` } : undefined,
    },
    h("a", { href: baseDir }, title),
  )
}

PageTitleComponent.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  /* font-family is applied inline so it can change every refresh */
}
`

export const PageTitle = () => PageTitleComponent
export default PageTitleComponent