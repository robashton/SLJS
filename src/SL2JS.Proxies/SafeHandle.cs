using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Runtime.InteropServices.SafeHandle")]
    public class SafeHandle
    {
        [JSRuntimeDispatch]
        [JSExternal]
        public SafeHandle(params AnyType[] values)
        {
            
        }
    }
}
