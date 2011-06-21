using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Meta;
using JSIL.Proxy;

namespace Proxies.Silverlight
{
    [JSProxy(
         new[] { 
            "MS.Internal.NativeObjectSafeHandle",
         },
         JSProxyMemberPolicy.ReplaceDeclared,
         JSProxyAttributePolicy.ReplaceAll,
         JSProxyInterfacePolicy.ReplaceAll
     )]
    [JSIgnore]
    public abstract class UnsafeNativeMethodsProxy
    {
    }
}
