using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Meta;
using JSIL.Proxy;

namespace Proxies.Silverlight
{
    [JSProxy("System.Windows.Application")]
    public class Application
    {
        [JSReplacement("console.log('Initializing Component')")]
        public static void LoadComponent(params AnyType[] values)
        {
            
        }
    }
}
