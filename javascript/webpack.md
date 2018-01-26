# Webpack

Webpack is most popular bundling system for javascript modules. In its homepage, I can find this sentence.
> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it recursively builds a dependency graph that includes every module your application needs, then packages all of those modules into one or more bundles.
I think this sentence explains what webpack is quite simple & pointing main concept so quotes it.

Before I studied it I just followed tutorials and sometimes use webpack without understanding it. I thought it was quite complicated so delayed to study it, and now it is the time to dive into the webpack!

Webpack construct dependancy graph by looking up module-related statement like require, module.exports and also, import and export of ES6.
I noticed that webpack is not fully supported ES6! It means that if you want to bundle modules with ES6 expressions, you should use babel loader to translate ES6 into ES5. This is also main issues for me because there are many project that use webpack with babel. 

`npx webpack src/index.js dist/bundle.js` 

This is simple usage of webpack. npx is webpack binary executor and src/index.js means 'entry point', and dist/bundle.js it output bundle.

To make thing easy, webpack.config.js is required. webpack-confige file contains parameters to run webpack bundling. By default, webpack in CLI consider this 'webpack.config.js' file, so just types `webpack`!
With npm scripts, finally, "build": "webpack" option will give you shortcut to execute `npx webpack input output` such like that.

The most charming part is development-related configuring. You can use webpack-dev-server for hot-reloading. 

I followed [this docs](https://webpack.js.org/guides/) 




