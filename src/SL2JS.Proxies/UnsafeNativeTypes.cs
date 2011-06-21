using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
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
