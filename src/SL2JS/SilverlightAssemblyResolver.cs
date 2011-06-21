
using JSIL;

namespace SL2JS
{
    public class SilverlightAssemblyResolver : AssemblyResolver
    {
        public SilverlightAssemblyResolver(string mainAssemblyPath)
            : base(new[] { mainAssemblyPath, "C:\\Program Files\\Microsoft Silverlight\\4.0.60310.0" })
        {

        }
    }
}