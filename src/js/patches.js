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

System.Windows.Controls.UserControl.prototype._ctor = function () {}
System.Windows.DependencyProperty.prototype._cctor = function () {};
System.Windows.DependencyProperty.prototype._ctor = function () {};

System.Windows.DependencyObject.prototype.SetValue = function () {

};

System.Windows.DependencyObject.prototype.AddEventListener = function () {

}

System.Windows.MessageBox.Show = function (msg) {
    alert(msg);
};

//Probably have to sort out dictionaries properly at some point
Dictionary = function () { };
Dictionary.prototype.set_Item = function (key, value) {
this[key] = value;
};
Dictionary.prototype.get_Item = function (key) {
return this[key];
};
System.Windows.DependencyProperty._registeredCoreProperties = new Dictionary();
