Class = {};
Class.setup = function (destination, content) {
    Class.setupEventTable(destination);
    for (var name in content) {
        if (name.indexOf("$") == 0) {
            Class.setupSpecialProperty(destination, name, content[name]);
        }
        else {
            destination.prototype[name] = content[name];
        }
    }
};

Class.setupSpecialProperty = function (destination, rawName, information) {
    if (rawName == "$Events") {
        Class.addEvents(destination, information);
    }
    else Class.setupDependencyProperty(destination, rawName, information);
};

Class.addEvents = function (destination, eventList) {
    var eventTable = destination["$eventTable"];
    for (var x = 0; x < eventList.length; x++) {
        eventTable.registerKnownEvent(eventList[x]);
    }
};

Class.setupEventTable = function (destination) {
    var eventTable = new sljs.EventTable();
    destination["$eventTable"] = eventTable;
    destination.prototype.raiseEvent = function(sender, eventId, args) {
        eventTable.raise(sender, eventId, args);
    },
    destination.prototype.addEventHandler = function(sender, eventId, handler) {
        eventTable.addHandler(sender, eventId, handler);
    };
};

Class.setupDependencyProperty = function(destination, rawName, information) {
    var startIndex = 1;
    var endIndex = rawName.indexOf('Property');
    var actualPropertyName = rawName.substr(startIndex, endIndex - startIndex);
    var propertyFieldName = rawName.substr(startIndex);
    destination[propertyFieldName] = System.Windows.DependencyProperty.Register(actualPropertyName, information, destination);

    Object.defineProperty(destination.prototype, actualPropertyName, {
            get: function() {
                return this.GetValue(destination[propertyFieldName]);
            },
            set: function(value) {
                this.SetValue(destination[propertyFieldName], value);
            },
            configurable: true,
            enumerable: true
        });
};