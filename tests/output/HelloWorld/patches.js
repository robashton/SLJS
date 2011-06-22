System.Threading.Thread.GetCurrentThreadNative = function () {
    return new System.Threading.Thread();
};

System.Environment.GetResourceString$0 = function (key) {
    return key; // for now
}

System.Windows.FrameworkElement.prototype.findElement = function (name) {
    var childElement = this.element.find('[name=' + name + ']');
    setupElementAsControl(childElement);
    var code = childElement.data('code');
    return code;
}

System.Uri._cctor = function () { } 
System.Uri.prototype._ctor = function (uriString) {
    this.UriString = uriString;
}

System.Windows.Controls.UserControl.prototype._ctor = function () { }

System.Windows.Application.prototype._ctor = function () { }

System.Windows.DependencyProperty._cctor = function () {};
System.Windows.DependencyProperty.prototype._ctor = function () {};

System.Windows.DependencyObject.prototype.SetValue = function () { };

System.Windows.DependencyObject.prototype.AddEventListener = function () {}

System.Windows.MessageBox.Show = function (msg) {
    alert(msg);
};

//Probably have to sort out dictionaries properly at some point
// And implement dependency properties and objects honourably :-)
Dictionary = function () { };
Dictionary.prototype.set_Item = function (key, value) {
this[key] = value;
};
Dictionary.prototype.get_Item = function (key) {
return this[key];
};
System.Windows.DependencyProperty._registeredCoreProperties = new Dictionary();
