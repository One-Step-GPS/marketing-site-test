Setup:
- Install Node.js
- npm i

When Changes to files under the /assets folder(css/js) are made:
- 'npm run build' to re-minify and consolidate served files

When new CSS or JS files are added:
- add task to gulpfile.js to add to consolidated js or css

When new HTML files are added:
- the path for these files are added to the ctrl-static-sites.go
