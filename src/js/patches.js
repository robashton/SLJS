System.Threading.Thread.GetCurrentThreadNative = function () {
    return new System.Threading.Thread();
};

$asm02.MS.Internal.XcpImports.CreateObjectByTypeIndexNative = function () {
    return System.IntPtr.Zero;
}
System.Runtime.InteropServices.SafeHandle.prototype._ctor = function () { }

System.Environment.GetResourceString$0 = function (key) {
    return key; // This'll probably do as they are mainly exceptions
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

System.Windows.MessageBox.Show = function (msg) {
    alert(msg);
};

$asm02.MS.Internal.CoreTypeEventHelper.prototype._ctor = function () { 
};

$asm02.MS.Internal.CoreTypeEventHelper.prototype.getManager = function(peer, property) {
    if(!sljs.globalHandlers[peer]) {
        sljs.globalHandlers[peer] = {};
    }
    if(!sljs.globalHandlers[peer][property.m_nKnownId]) {
        sljs.globalHandlers[peer][property.m_nKnownId] = new sljs.ManagedEvent(peer, property);
    }
    return sljs.globalHandlers[peer][property.m_nKnownId];
};

$asm02.MS.Internal.CoreTypeEventHelper.prototype.AddEventListener = function (peer, property, handler) {
    var managedEvent = this.getManager(peer, property);
    managedEvent.addHandler(handler);
};

$asm02.MS.Internal.CoreTypeEventHelper.prototype.RemoveEventListener = function () {
    var managedEvent = this.getManager(peer, property);
     managedEvent.removeHandler(handler);
 };


 System.Windows.Application.prototype.Application_Starting = function () {

 };

 System.Windows.Application.prototype.Application_Started = function () {

 };

// Joy!
System.Windows.DependencyObject.prototype._ctor$2 = function (nativeTypeIndex, constructDO) {
    System.Object.prototype._ctor.call(this);
    $asm02.MS.Internal.XcpImports.CheckThread();
    this.m_nativePtr = new $asm02.MS.Internal.NativeObjectSafeHandle();  
    this._coreTypeEventHelper = new $asm02.MS.Internal.CoreTypeEventHelper();
    var type = (JSIL.GetType(this));
    var isCustomType = 0;
    if (!$asm02.MS.Internal.TypeProxy.IsCoreType(type)) {
        isCustomType = 1;
    }
};

// Let's face it, this entire bit of infrastructure will need re-implementing fully from scratch
// written in native javascript, so let's just hack through for now
var XcpImports = $asm02.MS.Internal.XcpImports;
XcpImports.GlobalProperties = [];

XcpImports.GetValue = function (obj, property) {
    if (!XcpImports.GlobalProperties[obj]) XcpImports.GlobalProperties[obj] = {};
    return XcpImports.GlobalProperties[obj][property.m_nKnownId];
};

XcpImports.SetValue = function (obj, property, value) {
    if (!XcpImports.GlobalProperties[obj]) XcpImports.GlobalProperties[obj] = {};
    XcpImports.GlobalProperties[obj][property.m_nKnownId] = value;
};

System.Windows.DependencyObject.prototype.SetValue = function (property, value) {
    if (!property) {
        console.log("Unset property on type: " + this.GetType());
        return;
    }
    XcpImports.SetValue(this, property, value);
}
System.Windows.DependencyObject.prototype.GetValue = function (property) {
    if (!property) {
        console.log("Unset property on type: " + this.GetType());
        return null;
    }
    return XcpImports.GetValue(this, property);
}
 
System.Windows.DependencyObject.prototype.AddEventListener = function () { }
System.Windows.DependencyObject.prototype.RemoveEventListener = function () { } 

DependencyPropertyDictionary = function () { };
DependencyPropertyDictionary.prototype.set_Item = function (key, value) {
    this[key] = value;
};
DependencyPropertyDictionary.prototype.get_Item = function (key) {
    return this[key];
};

System.Windows.DependencyProperty._registeredCoreProperties = new DependencyPropertyDictionary();

/// This is because all the dependency properties are initialized in the static constructors
JSIL.SealTypes(
  $asm02, "System.Windows.Controls",
  "Panel", "Grid", "UserControl", "Button", "Control", "FrameworkElement", "UIElement", "ContentControl");
JSIL.SealTypes(
  $asm02, "System.Windows.Controls.Primitives",
  "ButtonBase");
JSIL.SealTypes(
  $asm02, "System.Windows.Input",
  "KeyboardNavigation");