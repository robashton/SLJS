using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    // Imma handle it all please thanks
    [JSProxy(new [] {
        "System.Windows.Application",
        "System.Windows.Controls.Button",
        "System.windows.Controls.Grid",
        "System.Windows.Controls.UserControl",
        "System.Uri"
    }, inheritable: false)]
  public class Ctors
    {
        [JSExternal]
        [JSRuntimeDispatch]
        public Ctors(params AnyType[] values)
        {
            
        }
    }
}
