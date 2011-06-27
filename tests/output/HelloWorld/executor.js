var sljs = sljs || {};
var sljsconfig = sljsconfig || {  };

sljs.getXaml = function (path) {
    var data = sljs.globalXaml[path.toLowerCase()];
    return data;
};

sljs.Executor = function () {
    this.application = null;
};

Class.setup(sljs.Executor, {
    startApplication: function () {
        var executor = this;
        this.loadXamlJson(function () {
            var typename = sljsconfig.entryPoint;
            var factoryFunc = new Function("return new " + typename + "();");
            executor.app = factoryFunc();
            executor.runApplication();
        });
    },
    loadXamlJson: function (callback) {
        $.ajax({
            url: 'xaml.json',
            dataType: 'json',
            success: function (data) {
                sljs.globalXaml = data;
                callback();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                sljs.processErr(textStatus, errorThrown);
            }
        });
    },
    runApplication: function () {
        this.app.notifyStartup();
    }
});

sljs.processErr = function(text, error) {
    alert(text + ':' + error);
};

sljs.loadJavascript = function(callback) {
   LazyLoad.js(sljsconfig.code, callback());
};
sljs.loadTemplates = function (callback) {
    var templatesToLoad = sljsconfig.templates;
    sljs.templates = {  };
    var numberLeft = templatesToLoad.length;
    for (var x = 0; x < templatesToLoad.length; x++) {
        sljs.loadTemplate(templatesToLoad[x], function () {
            numberLeft--;
            if (numberLeft == 0) callback();
        });
    }
};
sljs.loadTemplate = function (template, callback) {
    $.ajax({
        url: template,
        success: function (data) {
            sljs.templates[template] = data;
            callback();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            sljs.processErr(textStatus, errorThrown);
        }
    });
};

sljs.initialize = function() {
    var application = new sljs.Executor();
    application.startApplication();
};

$(document).ready(function () {
    sljs.loadJavascript(function() {
        sljs.loadTemplates(function() {
            sljs.initialize();
        });
    });
});