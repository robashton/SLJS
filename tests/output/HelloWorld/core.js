sljs = sljs || {};

sljs.EventTable = function () {
    this.handlers = {};
    this.knownEvents = {};
};

Class.setup(sljs.EventTable, {
    raise: function(obj, id, args) {
        var events = this.findEvent(obj, id) || [];
        for (var i = 0; i < events.length; i++) {
            events[i](obj, args);
        }
    },
    registerKnownEvent: function (eventId) {
        this.knownEvents[eventId] = true;
    },
    isKnownEvent: function (eventId) {
        return this.knownEvents[eventId];
    },
    findEvent: function (obj, id) {
        return this.handlers[obj][id];
    },
    addHandler: function(obj, id, handler) {
        if(!this.handlers[obj]) this.handlers[obj] = {};
        if(!this.handlers[obj][id]) this.handlers[obj][id] = [];
        this.handlers[obj][id].push(handler);
    }
});