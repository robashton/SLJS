using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Windows.Application")]
    public abstract class Application
    {
        [JSReplacement("sljs.loadComponentFromJson($component, $resourceLocator);")]
        public static void LoadComponent(object component, Uri resourceLocator)
        {
            
        }

        [JSExternal]
        public abstract AnyType Application_Started(params AnyType[] values);

        [JSExternal]
        public abstract AnyType Application_Starting(params AnyType[] values);
    } 
}
