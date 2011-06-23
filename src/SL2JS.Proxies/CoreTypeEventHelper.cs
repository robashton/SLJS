using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("MS.Internal.CoreTypeEventHelper")]
    public abstract class CoreTypeEventHelper
    {
        [JSExternal()]
        [JSRuntimeDispatch]
        public CoreTypeEventHelper()
        {

        }

        [JSExternal()]
        [JSRuntimeDispatch]
        public abstract AnyType AddEventListener(params AnyType[] values);

        [JSExternal()]
        [JSRuntimeDispatch]
        public abstract AnyType RemoveEventListener(params AnyType[] values);
    }
}