using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("MS.Internal.ManagedPeerTable")]
    public class ManagedPeerTable
    {
        [JSReplacement("")] 
        public static AnyType Add(params AnyType[] values)
        {
            throw new NotImplementedException();
        }

        [JSReplacement("true")] 
        public static AnyType TryGetManagedPeer(params AnyType[] values)
        {
            throw new NotImplementedException();
        }
    }
}