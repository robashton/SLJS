using System;
using System.Collections.Generic;
using System.IO;
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

        public string GetEntrypointNameFromAssembly(string filename)
        {
            var assembly = AssemblyDefinition.ReadAssembly(filename, GetReaderParameters(false));
            return assembly.MainModule.Types
                .Where(x => x.BaseType != null && x.BaseType.FullName == "System.Windows.Application")
                .Select(x => x.FullName).FirstOrDefault();
        }

        public void DumpResourcesFromAssemblyToDirectory(string filename, string directory)
        {
            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);

            var assembly = AssemblyDefinition.ReadAssembly(filename, GetReaderParameters(false));
            if(!assembly.MainModule.HasResources) return;
            foreach(var resource in assembly.MainModule.Resources)
            {
                if (resource.ResourceType != ResourceType.Embedded) continue;
                var data = ((EmbeddedResource) resource).GetResourceData();
                File.WriteAllBytes(Path.Combine(directory, resource.Name), data);

            }
        }
    }
}