import { FilePath, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import fs from "fs"
import path from "path"

export const HtaccessEmitter: QuartzEmitterPlugin = () => ({
  name: "HtaccessEmitter",
  async emit({ argv }) {
    const htaccessContent = `RewriteEngine On
 
ErrorDocument 404 /404.html
 
# Rewrite rule for .html extension removal (with directory check)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_URI}.html -f
RewriteRule ^(.*)$ $1.html [L]
 
# Handle directory requests explicitly
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^(.*)/$ $1/index.html [L]
`

    const filePath = joinSegments(argv.output, ".htaccess")
    
    // Ensure the output directory exists
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
    
    // Write the file (this will create it if it doesn't exist, or overwrite if it does)
    await fs.promises.writeFile(filePath, htaccessContent)
    
    return [filePath] as FilePath[]
  },
  async *partialEmit() {},
})