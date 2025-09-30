import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

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

const RandFont = (): string => fonts[Math.floor(Math.random() * fonts.length)]

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

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

  return (
    <h2 class={classNames(displayClass, "page-title")} style={{ fontFamily: titleFont ? `'${titleFont}', sans-serif` : undefined }}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  /* font-family is applied inline so it can change every refresh */
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
