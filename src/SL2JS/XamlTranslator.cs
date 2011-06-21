using System;
using System.IO;
using System.Xml;

namespace SL2JS
{
    public class XamlTranslator
    {
        public void Translate(Resource resource, string outputDirectory)
        {
            using (var reader = XmlReader.Create((Stream)resource.Value))
            {
                string jsonFilename = Path.ChangeExtension(resource.Name, ".json");
                string jsonFilepath = Path.Combine(outputDirectory, jsonFilename);
                var converter = new XamlToJsonConverter(reader);
                converter.WriteTo(jsonFilepath);
            }
        }
    }
}