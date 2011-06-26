Class = {};
Class.setup = function (destination, content) {
    for (var name in content) {
        destination.prototype[name] = content[name];
    }
}