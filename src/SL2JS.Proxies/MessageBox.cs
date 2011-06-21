using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
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
