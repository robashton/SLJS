using System;
using System.Collections.Generic;
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

        // Seems assemblies are load order dependent
        // This should be fixed in JSIL I think, that's the whole "deferred dependency thing"
        // For now therefore I'll shove all the JS in these cos I want to get on with things

        private static readonly string[] BootstrapJs = new[]
                                                          {
                                                              "jquery-1.6.1.js",
                                                              "lazyload.js",
                                                              "support.js",
                                                              "executor.js",
                                                          };

        private static readonly string[] CoreJs = new[]
                                                          {
                                                              "JSIL.Core.js",
                                                              "JSIL.Bootstrap.js",
                                                              "core.js",
                                                              "system.js",
                                                              "system.windows.js",
                                                              "jquery.tmpl.js",
                                                              "knockout.js",
                                                          };
        private static readonly string[] PatchJs = new string[] {};

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
            var dependencies = GetJavascriptFilenames()
                .Select(x => string.Format("'{0}'", x))
                .ToArray();
            var templates = GetTemplateFilenames()
                .Select(x => string.Format("'{0}'", x))
                .ToArray();
           
            var configurationDirectiveBuilder = new StringBuilder();
            configurationDirectiveBuilder.AppendLine("sljsconfig = {");
            configurationDirectiveBuilder.AppendFormat("entryPoint: '{0}',", applicationEntrypoint).AppendLine();
            configurationDirectiveBuilder.AppendFormat("code: [{0}]", string.Join("\r\n,", dependencies)).AppendLine(",");
            configurationDirectiveBuilder.AppendFormat("templates: [{0}]", string.Join("\r\n,", templates)).AppendLine();
            configurationDirectiveBuilder.AppendLine("};");

            container = container.Replace("{configuration}", configurationDirectiveBuilder.ToString());
            File.WriteAllText(Path.Combine(configuration.OutputDirectory, "index.html"), container);
        }

        private IEnumerable<string> GetTemplateFilenames()
        {
            var filesInOutputDirectory = Directory.GetFiles(configuration.OutputDirectory, "*.htm")
                .Where(x=> Path.GetExtension(x) == ".htm")
                .Select(Path.GetFileName);
            return filesInOutputDirectory.ToArray();
        }

        private IEnumerable<string> GetJavascriptFilenames()
        {
            var filesInOutputDirectory = Directory.GetFiles(configuration.OutputDirectory, "*.js")
                .Select(Path.GetFileName);

            var applicationFiles = filesInOutputDirectory
                .Where(file =>  !BootstrapJs.Contains(file, StringComparer.InvariantCultureIgnoreCase) && 
                                !CoreJs.Contains(file, StringComparer.InvariantCultureIgnoreCase) &&
                                !PatchJs.Contains(file, StringComparer.InvariantCultureIgnoreCase))
                .ToArray();

            foreach (var standardFile in CoreJs)
            {
                yield return standardFile;
                }

            foreach(var file in applicationFiles)
            {
                yield return file;
            }

            foreach (var standardFile in PatchJs)
            {
                yield return standardFile;
            }
        }

        private void ProcessResources()
        {
            var resourceFolderName = Path.GetFileNameWithoutExtension(configuration.Filename);
            var resourceFolder = Path.Combine(configuration.OutputDirectory, resourceFolderName);

            if (!Directory.Exists(resourceFolder)) return;

            foreach (var file in Directory.GetFiles(resourceFolder, "*.resources"))
            {
                resourceFileTranslator.Translate(file, resourceFolder);
            }

            ClumpJsonFromDirectoryIntoFile(resourceFolder);
        }

        private void ClumpJsonFromDirectoryIntoFile(string sourceDirectoryPath)
        {
            var clumpedFilepath = Path.Combine(configuration.OutputDirectory, "xaml.json");
            using (var clumpedWriter = new JsonWriter(clumpedFilepath))
            {
                clumpedWriter.StartBlock();
                foreach (var jsonFile in Directory.GetFiles(sourceDirectoryPath, "*.json"))
                {
                    var propertyName = Path.GetFileName(jsonFile);
                    clumpedWriter.WriteRawProperty(propertyName, File.ReadAllText(jsonFile));
                }
                clumpedWriter.EndBlock();
            }
        }

        private void ProcessAssembly(SilverlightAssemblyTranslator translator)
        {
            translator.OutputDirectory = configuration.OutputDirectory;
            translator.IncludeDependencies = configuration.IncludeDependencies;
            translator.AddProxyAssembly(typeof (MessageBox).Assembly, false);
            translator.Translate(configuration.Filename);
            translator.EliminateTemporaries = false;
            translator.SimplifyLoops = false;
            translator.SimplifyOperators = false;
        }
    }
}
