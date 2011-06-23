using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("MS.Internal.XcpImports")]
    public class XcpImports
    {
        [JSReplacement("0")]
        public static AnyType CreateObjectByTypeIndex(params AnyType[] values)
        {
            throw new NotImplementedException();
        }

        [JSReplacement("")]
        public static AnyType NotifyHasManagedPeer(params AnyType[] values)
        {
            throw new NotImplementedException();
        }

        [JSReplacement("false")]
        public static AnyType Application_GetHasElevatedPermissions(params AnyType[] values)
        {
            throw new NotImplementedException();
        }

    }
}
