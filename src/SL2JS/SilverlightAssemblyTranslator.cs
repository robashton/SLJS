using System;
using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<string> GetJavascriptFilenames()
        {
            yield return "JSIL.Bootstrap.js";
            yield return "JSIL.Browser.js";
            yield return "JSIL.Core.js";
            yield return "mscorlib, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js";
            yield return "System, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js";
            yield return "System.Core, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js";
            yield return "System.Net, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js";
            yield return "System.Runtime.Serialization, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js";
            yield return "System.ServiceModel.Web, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js";
            yield return "System.Windows, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js";
            yield return "System.Windows.Browser, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js";
            yield return "System.Xml, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js";
        }

        public string GetEntrypointNameFromAssembly(string filename)
        {
            var assembly = AssemblyDefinition.ReadAssembly(filename, GetReaderParameters(false));
            return "app.json";
        }
    }
}