using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
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
