using JSIL;
using Mono.Cecil;

namespace SL2JS
{
    public class SilverlightAssemblyTranslator : AssemblyTranslator
    {
        protected override ReaderParameters GetReaderParameters(bool useSymbols, string mainAssemblyPath = null)
        {
            var baseParams = base.GetReaderParameters(useSymbols, mainAssemblyPath);
            baseParams.AssemblyResolver = new SilverlightAssemblyResolver(mainAssemblyPath);
            return baseParams;
        }
    }
}