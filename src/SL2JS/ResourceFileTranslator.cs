using System;
using System.IO;
using System.Resources;

namespace SL2JS
{
    public class ResourceFileTranslator
    {
        private readonly XamlTranslator xamlTranslator;

        public ResourceFileTranslator(XamlTranslator xamlTranslator)
        {
            this.xamlTranslator = xamlTranslator;
        }

        public void Translate(string filename, string outputDirectory)
        {
            using (var stream = new FileStream(filename, FileMode.Open, FileAccess.Read))
            {
                TranslateFromStream(stream, outputDirectory);
            }
        }

        private void TranslateFromStream(FileStream stream, string outputDirectory)
        {
            var resourceReader = new ResourceReader(stream);
            var enumerator = resourceReader.GetEnumerator();
            while (enumerator.MoveNext())
            {
                var resource = new Resource(enumerator.Key, enumerator.Value);
                xamlTranslator.Translate(resource, outputDirectory);
            }
        }
    }
}