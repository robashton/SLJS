var sljs = sljs || {};

sljs.Renderer = function (templates) {
    this.currentContext = null;
    this.templates = templates;
};
Class.setup(sljs.Renderer, {
    setCurrentContext: function (context) {
        this.currentContext = context;
    },
    render: function (control) {
        var template = this.findTemplateFor(control);
        this.currentContext = control;
    },
    findTemplateFor: function(control) {
        var typeName = control.GetType().toString();
        var template = this.templates[typeName];
        return template;
    }
});