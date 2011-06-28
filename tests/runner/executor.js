var sljs = sljs || {};
var sljsconfig = sljsconfig || {  };

sljs.getXaml = function (path) {
    var data = sljs.globalXaml[path.toLowerCase()];
    return data;
};

sljs.Executor = function (rootPath, config) {
    this.rootPath = rootPath ? rootPath + '/' : '';
    this.config = config || sljsconfig;
    this.application = null;
};

Class.setup(sljs.Executor, {
    startApplication: function (callback) {
        var executor = this;
        this.loadXamlJson(function () {
            var typename = executor.config.entryPoint;
            var factoryFunc = new Function("return new " + typename + "();");
            executor.app = factoryFunc();
            executor.runApplication();
            if (callback) callback();
        });
    },
    loadXamlJson: function (callback) {
        $.ajax({
            url: this.rootPath + 'xaml.json',
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
   LazyLoad.js(sljsconfig.code, callback);
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
            var templateName = sljs.sanitiseTemplateName(template);
            
            // We'll store it here for future reference
            sljs.templates[templateName] = data;
            
            callback();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            sljs.processErr(textStatus, errorThrown);
        }
    });
};

sljs.sanitiseTemplateName = function (templateName) {
    var extensionIndex = templateName.lastIndexOf('.');
    var fileWithoutExtension = templateName.substr(0, extensionIndex);
    return fileWithoutExtension.toLowerCase();
};

sljs.initialize = function() {
    var application = new sljs.Executor();
    application.startApplication();
};

$(document).ready(function () {
    sljs.loadJavascript(function () {
        sljs.loadTemplates(function () {
            $('#container').hide();
            sljs.initialize();
            $('#container').show();
        });
    });
});