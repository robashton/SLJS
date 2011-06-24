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
    if (!sljs.globalHandlers[peer][property.typeIndex]) {
        sljs.globalHandlers[peer][property.typeIndex] = new sljs.ManagedEvent(peer, property);
    }
    return sljs.globalHandlers[peer][property.typeIndex];
};

$asm02.MS.Internal.CoreTypeEventHelper.prototype.AddEventListener = function (peer, property, handler) {
    var managedEvent = this.getManager(peer, property);
    managedEvent.addHandler(handler);
};

$asm02.MS.Internal.CoreTypeEventHelper.prototype.RemoveEventListener = function () {
    var managedEvent = this.getManager(peer, property);
     managedEvent.removeHandler(handler);
 };
 

  System.Windows.PresentationFrameworkCollection$b1.prototype.AddDependencyObject = function (object) {
      console.log("PresentationFrameworkCollection.AddDependencyObject not implemented");
      this.NotifyCountChanged();
 }

 System.Windows.PresentationFrameworkCollection$b1.prototype.RemoveDependencyObject = function (object) {
     console.log("PresentationFrameworkCollection.RemoveDependencyObject not implemented");
     this.NotifyCountChanged();
 }

 System.Windows.PresentationFrameworkCollection$b1.prototype.ContainsDependencyObject = function (object) {
     console.log("PresentationFrameworkCollection.ContainsDependencyObject not implemented");
     return false;
 }

 ////////////////////////
 ////////////////////////
 //// Application ///////
 ////////////////////////
 ////////////////////////

 System.Windows.Application.prototype.set_RootVisual = function (element) {
     console.log("Setting root visual");
 };


 System.Windows.Application.prototype.Application_Starting = function () {
    
 };

 System.Windows.Application.prototype.Application_Started = function () {

 };

 ////////////////////
 // Framework Element
 ////////////////////


 System.Windows.FrameworkElement.prototype.FindName = function (name) {
     if (this.Name == name) return this;
     var needle = null;

     // Find the content property on this level of framework element
     var childrenProperty = sljs.findPropertyInTarget(this, "Children");
     var contentProperty = sljs.findPropertyInTarget(this, "Content");

     if (childrenProperty != null) {
         var childrenElement = this.GetValue(childrenProperty);
         for (var i = 0; i < childrenElement.Count; i++) {
             var haystack = childrenElement.ElementAt(i);
             needle = haystack.FindName(name);
             if (needle) break;
         }
     }
     else if (contentProperty != null) {
         var haystack = this.GetValue(contentProperty);
         needle = haystack.FindName(name);
     }
     else console.log("FindName couldn't find a property to use");

     if (needle) {
         console.log("Found element " + name);
     }
     else {
         console.log("Couldn't find element: " + name);
     }

 }


 /////////////////////////
 /////////////////////////
 //// Dependency Objects//
 /////////////////////////
 /////////////////////////

 System.Windows.DependencyObject.prototype._ctor = function (nativeTypeIndex, constructDo) {
     this.nativeTypeIndex = nativeTypeIndex;
     this.constructDo = constructDo;
 }

 var XcpImports = $asm02.MS.Internal.XcpImports;
 XcpImports.GlobalProperties = [];

 XcpImports.GetValue = function (obj, property) {
     if (!XcpImports.GlobalProperties[obj]) XcpImports.GlobalProperties[obj] = {};
     return XcpImports.GlobalProperties[obj][property.typeIndex];
 };

 XcpImports.SetValue = function (obj, property, value) {
     if (!XcpImports.GlobalProperties[obj]) XcpImports.GlobalProperties[obj] = {};
     XcpImports.GlobalProperties[obj][property.typeIndex] = value;
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
 
 /////////////////////
 /////////////////////
 //// Dependency Properties
 //////////////////////
 //////////////////////

DependencyPropertyDictionary = function () { };
DependencyPropertyDictionary.prototype.set_Item = function (key, value) {
    this[key] = value;
};
DependencyPropertyDictionary.prototype.get_Item = function (key) {
    return this[key];
};

System.Windows.DependencyProperty.prototype._ctor = function (typeIndex, name, propertyType, ownerType, metadata, isAttached, isReadonly) {
    this.typeIndex = typeIndex;
    this.name = name;
    this.propertyType = propertyType;
    this.ownerType = ownerType;
    this.metadata = metadata;
    this.isAttached = isAttached;
    this.isReadonly = isReadonly;
    console.log("Property created");
}

System.Windows.DependencyProperty._cctor = function () {
    System.Windows.DependencyProperty._registeredCoreProperties = new DependencyPropertyDictionary();
    System.Windows.DependencyProperty._registeredProperties = new DependencyPropertyDictionary();
}

System.Windows.DependencyProperty.RegisterCoreProperty = function (typeIndex, type) {
    var property = new System.Windows.DependencyProperty(typeIndex, "", type);
    System.Windows.DependencyProperty._registeredCoreProperties.set_Item(typeIndex, property);
    return property;
}

System.Windows.DependencyProperty.Register = function(name, propertyType, ownerType, metadata)
{
    return System.Windows.DependencyProperty.RegisterImpl(name, propertyType, ownerType, metadata, false, false);
}

System.Windows.DependencyProperty.RegisterReadonly = function (name, propertyType, ownerType, metadata)
{
    return System.Windows.DependencyProperty.RegisterImpl(name, propertyType, ownerType, metadata, false, true);
}


System.Windows.DependencyProperty.RegisterAttached = function (name, propertyType, ownerType, metadata)
{
    return System.Windows.DependencyProperty.RegisterImpl(name, propertyType, ownerType, metadata, true, false);
}


System.Windows.DependencyProperty.RegisterAttachedReadonly = function (name, propertyType, ownerType, metadata) {
    return System.Windows.DependencyProperty.RegisterImpl(name, propertyType, ownerType, metadata, true, true);
}

System.Windows.DependencyProperty.RegisterImpl = function (name, propertyType, ownerType, metadata, isAttached, isReadonly) {
    var property = new System.Windows.DependencyProperty(null, name, propertyType, ownerType, metadata, isAttached, isReadonly);
    System.Windows.DependencyProperty._registeredProperties.set_Item(name + ownerType, property);
    return property;
}

/// This is because all the dependency properties are initialized in the static constructors
JSIL.SealTypes(
  $asm02, "System.Windows",
  "FrameworkElement");
JSIL.SealTypes(
  $asm02, "System.Windows.Controls",
  "Panel", "Grid", "UserControl", "Button", "Control", "UIElement", "ContentControl");
JSIL.SealTypes(
  $asm02, "System.Windows.Controls.Primitives",
  "ButtonBase");
JSIL.SealTypes(
  $asm02, "System.Windows.Input",
  "KeyboardNavigation");