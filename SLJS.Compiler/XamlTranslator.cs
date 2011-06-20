using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Resources;
using System.Text;
using System.Xaml;
using System.Xml;

namespace SLJS.Compiler
{
    public class XamlTranslator
    {
        private readonly string filename;
        private HashSet<HtmlOutput> output = new HashSet<HtmlOutput>();

        public XamlTranslator(string filename)
        {
            this.filename = filename;
        }

        public void WriteTo(string htmlFilepath)
        {
            using (var stream = new FileStream(filename, FileMode.Open, FileAccess.Read))
            {
                ParseXamlFromStream(stream);
            }
        }

        private void ParseXamlFromStream(FileStream stream)
        {
            var resourceReader = new ResourceReader(stream);
            var enumerator = resourceReader.GetEnumerator();
            while(enumerator.MoveNext())
            {
                ParseXamlFromResource(enumerator.Key, enumerator.Value);
            }
        }

        private void ParseXamlFromResource(object key, object resource)
        {
            using (var reader = XmlReader.Create((Stream)resource))
            {
                string htmlFilename = Path.ChangeExtension((string) key, ".html");
                string htmlFilePath = Path.Combine(Path.GetDirectoryName(filename), htmlFilename);
                var htmlFile = new HtmlOutput(htmlFilePath);
                htmlFile.ParseXamlFromXml(reader);
            }
        }

    }
}
