Class = {};
Class.setup = function (destination, content) {
    for (var name in content) {
        if (name.indexOf("$") == 0) {
            Class.setupDependencyProperty(destination, name, content[name]);
        }
        else {
            destination.prototype[name] = content[name];
        }
    }
}

Class.setupDependencyProperty = function (destination, rawName, information) {
    var startIndex = 1;
    var endIndex = rawName.indexOf('Property');
    var actualPropertyName = rawName.substr(startIndex, endIndex - startIndex);
    var propertyFieldName = rawName.substr(startIndex);
    destination[propertyFieldName] = System.Windows.DependencyProperty.Register(actualPropertyName, information, destination);

    Object.defineProperty(destination.prototype, actualPropertyName, {
        get: function () {
            return this.GetValue(destination[propertyFieldName]);
        },
        set: function (value) {
            this.SetValue(destination[propertyFieldName], value);
        },
        configurable: true,
        enumerable: true
    });
}