sljs = sljs || {};

sljs.EventTable = function () {
    this.knownEvents = {};
};

Class.setup(sljs.EventTable, {
    raise: function (obj, id, args) {
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
    ensureEvent: function (obj, id) {
        if (!obj.$eventTable) obj.$eventTable = {  };
        if (!obj.$eventTable[id]) obj.$eventTable[id] = [];
    },
    findEvent: function (obj, id) {
        this.ensureEvent(obj, id);
        return obj.$eventTable[id];
    },
    addHandler: function (obj, id, handler) {
        this.ensureEvent(obj, id);
        obj.$eventTable[id].push(handler);
    }
});