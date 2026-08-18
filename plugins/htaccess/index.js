import fs from "fs"
import path from "path"

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

export default () => ({
  name: "HtaccessEmitter",
  async emit({ argv }) {
    const filePath = path.join(argv.output, ".htaccess")

    // Ensure the output directory exists
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true })

    // Write the file (this will create it if it doesn't exist, or overwrite if it does)
    await fs.promises.writeFile(filePath, htaccessContent)

    return [filePath]
  },
  async *partialEmit() {},
})