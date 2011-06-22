using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Uri")]
    public abstract class Uri
    {
        [JSReplacement("false")]
        public static AnyType ParseScheme(params AnyType[] values)
        {
            throw new NotImplementedException();
        }
    }

}
