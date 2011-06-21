using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
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
