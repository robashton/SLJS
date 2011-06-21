using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using JSIL.Meta;
using JSIL.Proxy;

namespace Proxies.Silverlight
{
    [JSProxy("System.Windows.MessageBox")]
    public static class MessageBox
    {
        [JSRuntimeDispatch]
        [JSExternal]
        public static MessageBoxResult Show(params AnyType[] values)
        {
            throw new NotImplementedException();
        }
    }

    [JSProxy("System.Windows.MessageBoxResult")]
    public class MessageBoxResult
    {

    }
}
