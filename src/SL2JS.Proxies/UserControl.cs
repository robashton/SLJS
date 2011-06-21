using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Windows.Controls.UserControl")]
    public class UserControl
    {
        [JSRuntimeDispatch]
        [JSExternal]
        public UserControl(params AnyType[] values)
        {
            
        }
    } 
}
