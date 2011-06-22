using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using JSIL;
using Mono.Cecil;
using SL2JS.Proxies;

namespace SL2JS
{
    public class SilverlightApplicationTranslator
    {
        private readonly SilverlightApplicationTranslatorConfiguration configuration;
        private readonly ResourceFileTranslator resourceFileTranslator;

        public SilverlightApplicationTranslator(SilverlightApplicationTranslatorConfiguration configuration, ResourceFileTranslator resourceFileTranslator)
        {
            this.configuration = configuration;
            this.resourceFileTranslator = resourceFileTranslator;
        }

        public void ProcessWith(SilverlightAssemblyTranslator translator)
        {
            ProcessAssembly(translator);
            ProcessResources();
            GenerateContainer(translator);
        }

        private void GenerateContainer(SilverlightAssemblyTranslator translator)
        {
            var container = File.ReadAllText("container.html");

            var applicationEntrypoint = translator.GetEntrypointNameFromAssembly(configuration.Filename);
            var dependencies = translator.GetJavascriptFilenames()
                .Select(x => string.Format("'{0}'", x))
                .ToArray();
           
            var configurationDirectiveBuilder = new StringBuilder();
            configurationDirectiveBuilder.AppendLine("sljsconfig = {");
            configurationDirectiveBuilder.AppendFormat("entryPoint: '{0}',", applicationEntrypoint).AppendLine();
            configurationDirectiveBuilder.AppendFormat("files: [{0}]", string.Join("\r\n,", dependencies)).AppendLine();
            configurationDirectiveBuilder.AppendLine("};");

            container = container.Replace("{configuration}", configurationDirectiveBuilder.ToString());
            File.WriteAllText(Path.Combine(configuration.OutputDirectory, "index.html"), container);
        }

        private void ProcessResources()
        {
            var resourceFolderName = Path.GetFileNameWithoutExtension(configuration.Filename);
            var resourceFolder = Path.Combine(configuration.OutputDirectory, resourceFolderName);

            foreach (var file in Directory.GetFiles(resourceFolder, "*.resources"))
            {
                resourceFileTranslator.Translate(file, configuration.OutputDirectory);
            }
        }

        private void ProcessAssembly(SilverlightAssemblyTranslator translator)
        {
            translator.OutputDirectory = configuration.OutputDirectory;
            translator.IncludeDependencies = configuration.IncludeDependencies;
            translator.AddProxyAssembly(typeof (Application).Assembly, false);
            translator.Translate(configuration.Filename);
        }
    }
}
