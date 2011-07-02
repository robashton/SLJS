var sljs = sljs || {};

sljs.Renderer = {
    render: function (control) {
        var template = sljs.Renderer.findTemplateForControl(control);
        var context = sljs.Renderer.buildContext(control);
        return Mustache.to_html(template, context);
    },
    buildContext: function (input) {
        var output = {};
        for (key in input) {
            output[key] = input[key];
        }
        output.child = function () {
            return function (text) {
                var control = text == "self" ? this : this[text]; // Hah, hack but works!
                var renderedText = sljs.Renderer.render(control);
                return renderedText;
            };
        };
        return output;
    },
    findTemplateForControl: function (control) {
        var type = control.GetType();
        var template = sljs.Renderer.findTemplateForType(type);
        return template;
    },
    findTemplateForType: function (type) {
        var templateName = sljs.Renderer.findTemplateNameForType(type);
        return sljs.templates[templateName];
    },
    findTemplateNameForControl: function (control) {
        var type = control.GetType();
        return sljs.Renderer.findTemplateNameForType(type);
    },
    findTemplateNameForType: function (type) {
        if (type == null) return null;
        var typeName = type.toString().toLowerCase();
        if (sljs.templates[typeName]) return typeName;
        return this.findTemplateNameForType(type.prototype.__BaseType__);
    }
};