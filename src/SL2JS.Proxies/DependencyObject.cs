using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Windows.DependencyObject",
        inheritable: false)]
        public abstract class DependencyObject
    {
        [JSRuntimeDispatch]
        [JSExternal]
        public DependencyObject(params AnyType[] values)
        {
            
        }

        [JSRuntimeDispatch]
        [JSExternal]
        public abstract void SetValue(params AnyType[] values);

        [JSRuntimeDispatch]
        [JSExternal]
        public abstract AnyType GetValue(params AnyType[] values);

        [JSRuntimeDispatch]
        [JSExternal]
        public abstract void AddEventListener(params AnyType[] values);

        [JSRuntimeDispatch]
        [JSExternal]
        public abstract void RemoveEventListener(params AnyType[] values);
        
    }
}
