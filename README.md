Sample ionic 3 - ngrx 4 app with structure

Run + livereload via `ionic cordova run [android | ios] -lcs`

Production: `npm run build --prod --aot`

### PAGES
 It probably makes more sense to define a module per page to follow Ionic page-components structure with 

      IonicPageModule.forChild(<Page component>) // page lazy loading
      
  rather than defining separate modules 
  and in the same module define a separate `store` (if stored used across multiple pages -> `shared/store`)

### COMPONENT MODULES

For non-page components it makes sense too having a module per component to leverage **lazy loading**

We can also group **component modules** by **feature** (less optimized - i.e. we load more stuff - but easier to mantain)

See for example http://blog.ionic.io/ionic-and-lazy-loading-pt-2/ 
