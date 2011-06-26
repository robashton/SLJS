sljs = sljs || {};

sljs.EventTable = function () {
    this.handlers = {};
};

Class.setup(sljs.EventTable, {
    raise: function(obj, id) {
        var events = this.findEvent(obj, id) || [];
        for (var i = 0; i < events.length; i++) {
            events[i]();
        }
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

sljs.ManagedEvent = function () {
    this.peer = peer;
    this.property = property;
    this.handlers = [];
};

Class.setup(sljs.ManagedEvent, {
    _ctor: function(peer, property) {
        this.peer = peer;
        this.property = property;
        this.handlers = [];
    },
    addHandler: function(handler) {
        this.handlers.push(handler);    
    },
    removeHandler: function(handler) {
        console.log("Not supported, removing event handlers (sorry, lazy)");
    },
    raise: function (sender, ev) {
        for (var i = 0; i < this.handlers.length; i++) {
            this.handlers[i]();
        }
    }
});