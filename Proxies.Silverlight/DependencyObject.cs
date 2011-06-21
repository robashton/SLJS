using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Meta;
using JSIL.Proxy;

namespace Proxies.Silverlight
{
    [JSProxy("System.Windows.DependencyObject")]
    public abstract class DependencyObject
    {
        [JSRuntimeDispatch]
        [JSExternal]
        public DependencyObject(params AnyType[] values)
        {
            throw new NotImplementedException();
        }

        [JSRuntimeDispatch]
        [JSExternal]
        public abstract void SetValue(params AnyType[] values);

        [JSRuntimeDispatch]
        [JSExternal]
        public abstract void AddEventListener(params AnyType[] values);
    }
}
