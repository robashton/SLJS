using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Windows.Deployment")]
    public class Deployment
    {
        [JSReplacement("{}")]
        public AnyType get_Current(params AnyType[] values)
        {
            throw new NotImplementedException();
        }
    }
}