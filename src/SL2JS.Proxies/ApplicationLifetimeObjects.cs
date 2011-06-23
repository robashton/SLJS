using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("MS.Internal.ApplicationLifetimeObjectsCollection")]
    public class ApplicationLifetimeObjects
    {
        public AnyType IEnumerable_GetEnumerator(params AnyType[] values)
        {
            throw new NotImplementedException();
        }
    }
}
