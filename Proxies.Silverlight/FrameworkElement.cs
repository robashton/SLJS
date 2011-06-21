using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Meta;
using JSIL.Proxy;

namespace Proxies.Silverlight
{
    [JSProxy("System.Windows.FrameworkElement")]
    public class FrameworkElement
    {
        [JSReplacement("this.findElement($name)")]
        public Object FindName(string name)
        {
            throw new NotImplementedException();
        }
    }
}
