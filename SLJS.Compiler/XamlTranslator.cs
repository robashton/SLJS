using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Resources;
using System.Text;
using System.Xaml;
using System.Xml;

namespace SLJS.Compiler
{
    public class XamlTranslator
    {
        private readonly string filename;
        private readonly string outputDirectory;
        private HashSet<HtmlOutput> output = new HashSet<HtmlOutput>();

        public XamlTranslator(string filename, string outputDirectory)
        {
            this.filename = filename;
            this.outputDirectory = outputDirectory;
        }

        public void Write()
        {
            using (var stream = new FileStream(filename, FileMode.Open, FileAccess.Read))
            {
                ParseXamlFromStream(stream);
            }
            WriteIncludes();
        }

        private void WriteIncludes()
        {
            File.WriteAllText(Path.Combine(outputDirectory, "jquery-1.6.1.js"),
                              Includes.Scripts.jquery_1_6_1);
            File.WriteAllText(Path.Combine(outputDirectory, "lazyload.js"),
                              Includes.Scripts.lazyload);
            File.WriteAllText(Path.Combine(outputDirectory, "sljs.js"),
                              Includes.Scripts.sljs);
            File.WriteAllText(Path.Combine(outputDirectory, "Patches.js"),
                   Includes.Scripts.Patches);
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
                var nsmanager = new XmlNamespaceManager(reader.NameTable);
                nsmanager.AddNamespace("", "http://schemas.microsoft.com/winfx/2006/xaml");

                string htmlFilename = Path.ChangeExtension((string) key, ".html");
                string htmlFilePath = Path.Combine(outputDirectory, htmlFilename);
                var htmlFile = new HtmlOutput(htmlFilePath);
                htmlFile.ParseXamlFromXml(reader);
            }
        }
    }
}
