Bootstrap : Columns same height
===================

# Why ?
When you're working with Bootstrap and developping a responsive website, you may have notice a little unexpected thing when displaying many columns with differents heights in a row :

![Image](./demo.png?raw=true)

Here's a [plunker](http://plnkr.co/edit/XROM6qyh5X8Gfsm4B75n?p=preview) demo.

# Getting Started
You can get it straight from the repository : 
```
git clone https://github.com/maxime1992/angularBootstrapColumnsSameHeight.git
```

Next, include angular module as one of your app's dependencies :
```
angular.module('myApp', ['bootstrapColumnsSameHeight']);
```

Then you just need to add the directive **same-height** into your html, to every row where you want your columns to have the same height :
```
<div class="container" >
  <div same-height class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
      // content
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2">
      // content
    </div>
    ...
  </div>
</div>
```

# Contributing
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

In order to contribute, please run `npm test` and check you don't have any JSHint error :tada:.  
