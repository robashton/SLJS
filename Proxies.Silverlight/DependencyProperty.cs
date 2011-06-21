using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Meta;
using JSIL.Proxy;

namespace Proxies.Silverlight
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
