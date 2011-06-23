using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Windows.Controls.Control")]
    public class Control
    {
        /// <summary>
        ///  This is actually taking place because getting the type from sometihng isn't working in JSIL
        ///  and this is temporary workaround
        /// </summary>
        /// <param name="values"></param>
        /// <returns></returns>
        [JSReplacement("true")]
        public static AnyType IsProperControlSubclass(params AnyType[] values)
        {
            throw new NotImplementedException();
        }
    }
}
