using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Windows.DependencyProperty")]
    public abstract class DependencyProperty
    {
        [JSRuntimeDispatch]
        [JSExternal]
        public DependencyProperty(params AnyType[] values)
        {
            throw new NotImplementedException();
        }
    }
}
