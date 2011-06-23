using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("MS.Internal.NativeObjectSafeHandle")]
    public class NativeObjectSafeHandle
    {
        [JSExternal()]
        [JSRuntimeDispatch]
        public NativeObjectSafeHandle()
        {
            
        }
    }
}