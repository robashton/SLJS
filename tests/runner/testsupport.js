contextTest = function (context, testName, testMethod) {
    $(document).ready(function () {
        sljs.loadCoreDependencies(function () {
            var contextData = sljs.contexts[context];
            var qualifiedPaths = [];
            for (var index = 0; index < contextData.code.length; index++) {
                var path = contextData.code[index];
                qualifiedPaths.push(contextData.location + '/' + path);
            }

            var executor = new sljs.Executor(contextData.location, contextData);

            // Bootstrap the current context by loading in its code if necessary
            LazyLoad.js(qualifiedPaths, function () {

                // Run the application
                executor.startApplication(function () {

                    var context = new sljs.TestContext(executor.app, $('#container'));

                    // Execute the test method as a test
                    test(testName, function () { testMethod(context); });
                });
            });
        });
    });
};

// Yes, I'm repeating myself a bit here for the tests, probably want a global
// defines system somewhere, I'll ponder on it and sort it when it starts costing me to do
// it this way, DRY is all very well and good in theory but let's face it
// It's all bollocks really. I'll extract the commonality once I work out what exactly it is

var sljs = sljs || {};
sljs.contexts = {
    "HelloWorld": {
        code: [ 'HelloWorld, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null.js' ],
        templates: [],
        entryPoint: "HelloWorld.App",
        location: '../Output/HelloWorld'
    }
};
sljs.loadCoreDependencies = function (callback) {
    LazyLoad.js([
            'JSIL.Core.js',
            'JSIL.Bootstrap.js',
            'support.js',
            'core.js',
            'executor.js',
            'system.js',
            'system.windows.js',
            'jquery.tmpl.js',
            'knockout.js',
            'jsonselect.js',
            'mustache.js',
            'patches.js',
            'rendering.js'
        ], function() {
            sljsconfig = {
                templates: ['System.Windows.Controls.Button.htm',
                    'System.Windows.Controls.Grid.htm',
                    'System.Windows.Controls.TextBlock.htm',
                    'System.Windows.Controls.UserControl.htm']
            };
            sljs.loadTemplates(callback);
        });
};

sljs.TestContext = function (app, container) {
    this.app = app;
    this.container = container;
};
sljs.TestContext.prototype.findControlById = function(id) {
    return this.app.rootVisual.FindName(id);
};

