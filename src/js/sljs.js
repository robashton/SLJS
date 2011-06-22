sljs = {

    application: null,
    initializeApplication: function () {
        var typename = sljsconfig.entryPoint;
        var factoryFunc = new Function("return new " + typename + "()");
        sljs.application = factoryFunc();
        sljs.application.InitializeComponent();
    },

    getObject: function (path, callback) {
        $.ajax({
            url: path,
            dataType: 'json',
            success: function (data) {
                callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                sljs.processErr(textStatus, errorThrown);
            }
        });
    },

    loadComponentFromJson: function (component, resource) {
        var resource = resource.toString();
        var hackyStringIndex = resource.indexOf('component/');

        var resourceNameAsXaml = resource.substr(hackyStringIndex + 'component/'.length);
        var resourceNameAsJson = resourceNameAsXaml.replace('xaml', 'json');

        sljs.getObject(resourceNameAsJson, function (data) {
            sljs.mapPropertiesIntoObject(component, data);           
        });
    },

    mapPropertiesIntoObject: function (component, data) {

        // This is where dependency properties and shizzle come in
        component.$data = data;
    },

    processErr: function (text, error) {
        alert(text + ':' + error);
    }
};

$(document).ready(function () {
    $('.code').hide();
    LazyLoad.js(sljsconfig.files,
        function () {
            sljs.initializeApplication();
        });
});
