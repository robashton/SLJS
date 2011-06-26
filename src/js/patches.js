/*
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
 */