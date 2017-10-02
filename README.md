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

### NAMING

Angular 2+ convention `.component/service/ etc.` is not used here. Rather the files are in specific folders

### CLASS PROPERTIES

Source: https://stackoverflow.com/questions/37506343/private-and-public-in-angular-2-component

use `private` when ... 
- you want to prevent children from accessing the component (i.e. not always necessary)

and

- the property is used ONLY from within the component (not the template)

use `public` (default value) for **all** properties used in **template** 

### TESTING

An example is included. Run all tests by `npm test`

The Angular docs provide excellent use cases examples: https://angular.io/guide/testing

More on Jasmine is provided by the likewise Jasmine docs: https://jasmine.github.io/2.0/introduction.html

### STORE

There is a root store (AppModule) and a feature store (ListModule) with multiple reducers support (one per component)
