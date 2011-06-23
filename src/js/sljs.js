sljs = {

    globalHandlers: {},
    application: null,

    initializeApplication: function () {
        sljs.loadXamlJson(function () {
            var typename = sljsconfig.entryPoint;
            var factoryFunc = new Function("return JSIL.New(" + typename + ", '_ctor')");
            sljs.application = factoryFunc();
            sljs.runApplication();
        });
    },

    loadXamlJson: function (callback) {
        $.ajax({
            url: 'xaml.json',
            dataType: 'json',
            success: function (data) {
                sljs.xaml = data;
                callback();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                sljs.processErr(textStatus, errorThrown);
            }
        });
    },

    runApplication: function () {

        // Note: I'm sure I'll find a more appropriate way of doing this
        // When I start having to worry about other kinds of event (button clicks for example)
        sljs.raiseApplicationStartingEvent();
        sljs.raiseApplicationStartupEvent();
        sljs.raiseApplicationStartedEvent();
    },

    raiseApplicationStartingEvent: function () {
        var event = sljs.findGlobalEvent(sljs.application, 24508);
        event.raise(sljs.application, {});
    },

    raiseApplicationStartupEvent: function () {
        var event = sljs.findGlobalEvent(sljs.application, 24500);
        event.raise(sljs.application, {});
    },

    raiseApplicationStartedEvent: function () {
        var event = sljs.findGlobalEvent(sljs.application, 24509);
        event.raise(sljs.application, {});
    },

    findGlobalEvent: function (obj, propertyId) {
        return sljs.globalHandlers[obj][propertyId];
    },
    getObject: function (path, callback) {
        var data = sljs.xaml[path.toLowerCase()];
        callback(data);
    },

    loadComponentFromJson: function (component, resource) {
        var resource = resource.toString();
        var hackyStringIndex = resource.indexOf('component/');

        var resourceNameAsXaml = resource.substr(hackyStringIndex + 'component/'.length);
        var resourceNameAsJson = resourceNameAsXaml.replace('xaml', 'json');

        sljs.getObject(resourceNameAsJson, function (data) {
            sljs.mapPropertiesIntoTarget(component, component, data);
        });
    },

    // This is where dependency properties and shizzle probably come in, but
    // we'll ignore the implementation details for now and focus on getting
    // something that looks like it works
    mapPropertiesIntoTarget: function (component, target, data) {
        component.$data = data;
        for (key in data) {
            if (key == '$Elements') {
                sljs.addChildrenToTarget(component, target, data[key]);
            }
            if (key == "$ElementType") continue;
            else {

                // Find the appropriate property and set it

                // Note: It may be an "attached" dependency property
                // But cross that bridge when we come to it
            }
        }
    },

    addChildrenToTarget: function (component, target, elements) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var child = sljs.createChild(component, element);
            if (child == null) { continue; }
            target.AddChild(child);
        }
    },

    createChild: function (component, data) {
        var controlType = "System.Windows.Controls." + data["$ElementType"];
        var factoryFunc = new Function("return JSIL.New(" + controlType + ", '_ctor')");
        var control = null;

        try {
            control = factoryFunc();
        } catch (ex) {
            console.log("Failed to create instance of: " + controlType);
        }
        sljs.mapPropertiesIntoTarget(component, control, data);
        return control;
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

sljs.ManagedEvent = function(peer, property)
{
    this.peer = peer;
    this.property = property;
    this.handlers = [];
};

sljs.ManagedEvent.prototype.addHandler = function(handler) {
    this.handlers.push(handler);
};
sljs.ManagedEvent.prototype.removeHandler = function(handler) {
    console.log("Not supported, removing event handlers (sorry, lazy)");
};

sljs.ManagedEvent.prototype.raise = function (sender, ev) {
    for (var i = 0; i < this.handlers.length; i++) {
        this.handlers[i]();
    }
};
