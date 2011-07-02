contextTest = function (context, testName, testMethod) {
    var contextData = sljs.contexts[context];
    sljs.queueTest(function () {

        sljs.loadCoreDependencies(function () {
            var qualifiedPaths = [];
            for (var index = 0; index < contextData.code.length; index++) {
                var path = contextData.code[index];
                qualifiedPaths.push(contextData.location + '/' + path);
            }

            var executor = new sljs.Executor(contextData.location, contextData);
            // Bootstrap the current context by loading in its code if necessary
            LazyLoad.js(qualifiedPaths, function() {

                // Run the application
                executor.startApplication(function() {

                    // Execute the test method as a test
                    test(contextData.title + " : " + testName, function() {
                        var testContext = new sljs.TestContext(executor.app, $('#container'));
                        testMethod(testContext);
                    });
                    sljs.notifyTestEnded();

                });
            });
        });
    });
};

var sljs = sljs || {};

sljs.testIsRunning = false;
sljs.queueTest = function (callback) {
    $(document).ready(function () {
        if (sljs.testIsRunning) {
            setTimeout(function () { sljs.queueTest(callback); }, 20);
        }
        else {
            sljs.testIsRunning = true;
            callback();
        }
    });
};

sljs.notifyTestEnded = function() {
    sljs.testIsRunning = false;
};

// Yes, I'm repeating myself a bit here for the tests, probably want a global
// defines system somewhere, I'll ponder on it and sort it when it starts costing me to do
// it this way, DRY is all very well and good in theory but let's face it
// It's all bollocks really. I'll extract the commonality once I work out what exactly it is
sljs.contexts = {
    "HelloWorld": {
        code: [ 'HelloWorld, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null.js' ],
        templates: [],
        entryPoint: "HelloWorld.App",
        title: "Hello World Button",
        location: '../output/HelloWorld'
    },
    "Calculator": {
        code: ['Calculator, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null.js'],
        templates: [],
        entryPoint: "Calculator.App",
        title: "Calculator Demo",
        location: '../output/Calculator'
    },
    "Databinding": {
        code: ['Databinding, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null.js'],
        templates: [],
        entryPoint: "Databinding.App",
        title: "Databinding Demo",
        location: '../output/Databinding'
    }
};
var coreDependenciesLoaded = false;
sljs.loadCoreDependencies = function (callback) {
    if (coreDependenciesLoaded) { callback(); return; }
    LazyLoad.js([
            'JSIL.Core.js',
            'JSIL.Bootstrap.js',
            'support.js',
            'core.js',
            'executor.js',
            'system.js',
            'system.windows.js',
            'system.windows.controls.js',
            'jquery.tmpl.js',
            'knockout.js',
            'jsonselect.js',
            'mustache.js',
            'patches.js',
            'rendering.js'
        ], function () {
            sljsconfig = {
                templates: ['System.Windows.Controls.Button.htm',
                    'System.Windows.Controls.Grid.htm',
                    'System.Windows.Controls.TextBlock.htm',
                    'System.Windows.Controls.TextBox.htm',
                    'System.Windows.Controls.UserControl.htm']
            };
            sljs.loadTemplates(function () {
                coreDependenciesLoaded = true;
                callback();
            });
        });
};

sljs.TestContext = function (app, container) {
    this.app = app;
    this.container = container;
};
sljs.TestContext.prototype.findControlById = function(id) {
    return this.app.rootVisual.FindName(id);
};

