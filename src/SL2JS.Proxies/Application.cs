using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Windows.Application")]
    public class Application
    {
        [JSRuntimeDispatch]
        [JSExternal]
        public Application(params AnyType[] values)
        {
            
        }

        [JSReplacement("sljs.loadComponentFromJson($component, $resourceLocator);")]
        public static void LoadComponent(object component, Uri resourceLocator)
        {
            
        }
    }
}
