using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Windows.DependencyObject")]
    public abstract class DependencyObject
    {
        [JSRuntimeDispatch]
        [JSExternal]
        public abstract void SetValue(params AnyType[] values);

        [JSRuntimeDispatch]
        [JSExternal]
        public abstract void AddEventListener(params AnyType[] values);
    }
}
