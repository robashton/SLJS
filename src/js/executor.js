var sljs = sljs || {};

sljs.getXaml = function (path, callback) {
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
                this.processErr(textStatus, errorThrown);
            }
        });
    },
    runApplication: function () {
        this.app.notifyStartup();
    },
    processErr: function (text, error) {
        alert(text + ':' + error);
    }
});

$(document).ready(function () {
    LazyLoad.js(sljsconfig.files,
        function () {
            var application = new sljs.Executor();
            application.startApplication();
    });
});