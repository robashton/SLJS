JSIL.DeclareAssembly("System.Windows");
JSIL.DeclareNamespace("System.Windows");
JSIL.DeclareNamespace("System.Windows.Controls");

System.Windows = System.Windows || {};
System.Windows.Controls = System.Windows.Controls || {};

JSIL.MakeClass(Object, "System.Windows.MessageBox", true);
System.Windows.MessageBox.Show = function (msg) {
    alert(msg);
};

GlobalEvents = {
    OnStartup: 0,
    OnExit: 1,
    OnUnhandledException: 2
};

JSIL.MakeClass(Object, "System.Windows.Application", true);
Class.setup(System.Windows.Application, {
    _ctor: function () {
        this.eventTable = new sljs.EventTable();
    },
    add_Startup: function (handler) {
        this.eventTable.addHandler(this, GlobalEvents.OnStartup, handler);
    },
    add_Exit: function (handler) {
        this.eventTable.addHandler(this, GlobalEvents.OnExit, handler);
    },
    add_UnhandledException: function (handler) {
        this.eventTable.addHandler(this, GlobalEvents.OnUnhandledException, handler);
    },
    notifyStartup: function () {
        this.eventTable.raise(this, GlobalEvents.OnStartup);
    },
    set_RootVisual: function (control) {
        console.log("Setting root visual");
    }
});

System.Windows.Application.LoadComponent = function (component, resource) {
    var resource = resource.toString();
    var hackyStringIndex = resource.indexOf('component/');

    var resourceNameAsXaml = resource.substr(hackyStringIndex + 'component/'.length);
    var resourceNameAsJson = resourceNameAsXaml.replace('xaml', 'json');

    var data = sljs.getXaml(resourceNameAsJson);
    System.Windows.Application.mapPropertiesIntoTarget(component, component, data);
};

System.Windows.Application.mapPropertiesIntoTarget = function (component, target, data) {
    component.$data = data;
    for (key in data) {
        if (key == '$Elements') {
            System.Windows.Application.addChildrenToTarget(component, target, data[key]);
        }
        else if (key == "$ElementType") continue;
        else {
            var property = System.Windows.Application.findPropertyInTarget(target, key);
            if (!property) {
                console.log("Unable to find destination property: " + key + " on " + target);
            }
            else {
                target.SetValue(property, data[key]);
                console.log("Set property: " + key + " on " + target.GetType() + " to " + data[key]);
            }
        }
    }
};
System.Windows.Application.addChildrenToTarget = function (component, target, elements) {
    var childrenProperty = this.findPropertyInTarget(target, "Children");
    var contentProperty = this.findPropertyInTarget(target, "Content");
    var children = null;
    if (childrenProperty) {
        children = new System.Windows.Controls.UIElementCollection();
        target.SetValue(childrenProperty, children);
    }

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var child = System.Windows.Application.createChild(component, element);
        if (child == null) { continue; }

        System.Windows.Application.mapPropertiesIntoTarget(component, child, element);
        if (childrenProperty) {
            children.Add(child);
        }
        else if (contentProperty) {
            target.SetValue(contentProperty, child);
        }
        else {
            console.warn("Unable to find somewhere to place the control: " + child.Name + " " + child.GetType());
        }
    }
};

System.Windows.Application.createChild = function (component, data) {
    var controlType = "System.Windows.Controls." + data["$ElementType"];
    var factoryFunc = new Function("return new " + controlType + "()");
    var control = null;

    try {
        control = factoryFunc();
    } catch (ex) {
        console.log("Failed to create instance of: " + controlType);
    }
    return control;
};

System.Windows.Application.findPropertyInTarget = function (target, name) {
    return System.Windows.Application.findPropertyInType(target.GetType(), name);
};
System.Windows.Application.findPropertyInType = function (type, name) {
    if (!type) return null;
    var property = type[name + "Property"];
    if (property) return property;
    return this.findPropertyInType(type.prototype.__BaseType__, name);
};

JSIL.MakeClass(Object, "System.Windows.DependencyObject", true);
Class.setup(System.Windows.DependencyObject, {
 SetValue: function(property, value) {
      if (!property) {
         console.log("Attempt to set missing dependency property on type: " + this.GetType());
         return;
     }
     this["$$$" + property.name] = value;
 },
 GetValue: function(property) {
      if (!property) {
         console.log("Attempt to read missing dependency property on type: " + this.GetType());
         return null;
     }
     return this["$$$" + property.name];
 },
 AddEventListener: function () {
     console.log("AddEventListener not implemented");
 },
 RemoveEventListener: function () {
     console.log("RemoveEventListener not implemented");
 } 
});

DependencyPropertyDictionary = function () { }
Class.setup(DependencyPropertyDictionary, {
    set_Item: function(key, value) {
        this[key] = value;
    },
    get_Item: function(key) {
        return this[key];
    }
});

JSIL.MakeClass(Object, "System.Windows.DependencyProperty", true);
Class.setup(System.Windows.DependencyProperty, {
    _ctor: function(typeIndex, name, propertyType, ownerType, metadata, isAttached, isReadonly) {
        this.typeIndex = typeIndex;
        this.name = name;
        this.propertyType = propertyType;
        this.ownerType = ownerType;
        this.metadata = metadata;
        this.isAttached = isAttached;
        this.isReadonly = isReadonly;
        console.info("Property created with name: " + name);
    }
});

System.Windows.DependencyProperty._registeredCoreProperties = new DependencyPropertyDictionary();
System.Windows.DependencyProperty._registeredProperties = new DependencyPropertyDictionary();
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

JSIL.MakeClass(System.Windows.DependencyObject, "System.Windows.Controls.UIElementCollection", true); // This is going to be complex eventually
Class.setup(System.Windows.Controls.UIElementCollection, {
    _ctor: function () {
        this.items = [];
    },
    Add: function(item) {
        this.items.push(item);
        this.NotifyCountChanged();
    },
    NotifyCountChanged: function() {
        // No idea how to raise events just yet, so
        this.Count = this.items.length;
    },
    ElementAt: function(index) {
        return this.items[index];
    },
    $CountProperty: System.Int32
});

JSIL.MakeClass(System.Windows.DependencyObject, "System.Windows.UIElement", true);
Class.setup(System.Windows.UIElement, {
    _ctor: function () {

    }
});

JSIL.MakeClass(System.Windows.UIElement, "System.Windows.FrameworkElement", true);
Class.setup(System.Windows.FrameworkElement, {
    _ctor: function () {

    },
    FindName: function (name) {
         if (this.Name == name) return this;
         var needle = null;

         // Find the content property on this level of framework element
         var childrenProperty = System.Windows.Application.findPropertyInTarget(this, "Children");
         var contentProperty = System.Windows.Application.findPropertyInTarget(this, "Content");

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
         else console.warn("FindName couldn't find a property to use");

         if (needle) {
             console.info("Found element " + name);
         }
         else {
             console.warn("Couldn't find element: " + name);
         }
         return needle;
    },
    $NameProperty: System.String
});


JSIL.MakeClass(System.Windows.FrameworkElement, "System.Windows.Controls.Control", true);
Class.setup(System.Windows.Controls.Control, {
    _ctor: function () {

    },
});



JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.ContentControl", true);
Class.setup(System.Windows.Controls.ContentControl, {
    _ctor: function () {

    }
});

JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.UserControl", true);
Class.setup(System.Windows.Controls.UserControl, {
    _ctor: function () {

    },
    $ContentProperty: System.Windows.Controls.UIElement
});

JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.Grid", true);
Class.setup(System.Windows.Controls.Grid, {
    _ctor: function () {

    },
    $ChildrenProperty: System.Windows.Controls.UIElementCollection
});


JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.Button", true);
Class.setup(System.Windows.Controls.Button, {
    _ctor: function () {

    }
});