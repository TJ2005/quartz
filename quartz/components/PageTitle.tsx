import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

const RandFont = (() => {
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
  return (): string => fonts[Math.floor(Math.random() * fonts.length)]
})()

const titleFont = RandFont()
PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: '${titleFont}', sans-serif;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
