using System;
using System.IO;
using JSIL;
using Mono.Cecil;

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
            translator.Translate(configuration.Filename);
        }
    }
}
