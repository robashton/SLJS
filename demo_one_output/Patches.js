System.Threading.Thread.GetCurrentThreadNative = function () {
    return new System.Threading.Thread();
};

System.Environment.GetResourceString$0 = function (key) {
    return key; // for now
}

System.Windows.Controls.Control.prototype.set_DefaultStyleKey = function () { }

System.Windows.Controls.UserControl.prototype._ctor$0 = function () { };
System.Windows.Controls.UserControl.prototype._ctor$1 = function (ignored) {};
JSIL.OverloadedMethod(System.Windows.Controls.UserControl.prototype, "_ctor", [
    ["_ctor$0", []],
    ["_ctor$1", [System.Int32]],
  ]);

System.Windows.FrameworkElement.prototype.findElement = function (name) {
    var childElement = this.element.find('[name=' + name + ']');
    setupElementAsControl(childElement);
    var code = childElement.data('code');
    return code;
}

System.Windows.DependencyProperty.prototype._cctor = function () { };
System.Windows.DependencyProperty.prototype._ctor = function () { };

/*
System.Windows.FrameworkElement.prototype._ctor$0 = function () { };
System.Windows.FrameworkElement.prototype._ctor$1 = function (ignored) { };
JSIL.OverloadedMethod(System.Windows.FrameworkElement.prototype, "_ctor", [
["_ctor$0", []],
["_ctor$1", [System.Int32]],
]); */

System.Windows.DependencyObject.prototype.SetValue = function () {

};

System.Windows.DependencyObject.prototype.AddEventListener = function () {

}

/*
System.Windows.DependencyObject.prototype.SetValue = function () { }




System.Windows.Controls.Control.prototype._ctor$0 = function () { };
System.Windows.Controls.Control.prototype._ctor$1 = function (ignored) { };
JSIL.OverloadedMethod(System.Windows.Controls.Control.prototype, "_ctor", [
["_ctor$0", []],
["_ctor$1", [System.Int32]],
]);


System.Windows.DependencyObject.prototype._ctor$2 = function (typeIndex, contructDo) {
System.Object.prototype._ctor.call(this);
// NOTE: This is irrelevant
};

*/

//Probably have to sort out dictionaries properly at some point
Dictionary = function () { };
Dictionary.prototype.set_Item = function (key, value) {
this[key] = value;
};
Dictionary.prototype.get_Item = function (key) {
return this[key];
};
System.Windows.DependencyProperty._registeredCoreProperties = new Dictionary();
