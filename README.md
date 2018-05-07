
# "vue2leafleteditablepolyline"
# Technology stack: vue+webpack

### Development
``` bash
$ npm install
```
``` bash
$ npm run dev
$ open http://localhost:8010/
```
** PS: Local debugging recommended to enable browser cross-domain mode to directly access the mock platform or test environment interface across domains
``` bash
$ open -a Google\ Chrome --args --disable-web-security --user-data-dir
```

### Package Deployment
``` bash
$ npm run build
```

### Description
--vue2leafleteditablepolyline project root directory
----config webpack compiler configuration
----src source code
------assets small static resource files (icons, etc.), large static resources recommended on cdn
------constants global constants
------pages page root
--------common Site-wide common view components
--------welcome Welcome module
------public common styles and plugins
------routes Total station routing configuration
------utils tool
------index.html master template
------index.js main entrance