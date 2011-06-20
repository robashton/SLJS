using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

namespace SLJS.Compiler
{
    public class HtmlOutput
    {
        private readonly string filename;
        private readonly Dictionary<string, ReflectedControl> controls = new Dictionary<string, ReflectedControl>();

        public HtmlOutput(string filename)
        {
            this.filename = filename;
            InitializeControls();
        }

        private void InitializeControls()
        {
            var types = this.GetType()
                .Assembly
                .GetTypes()
                .Where(x => !string.IsNullOrEmpty(x.Namespace) && x.Namespace.EndsWith("Controls"));

            foreach(var type in types)
            {
                this.controls.Add(type.Name, new ReflectedControl(type));
            }
        }

        public void ParseXamlFromXml(XmlReader reader)
        {
            using(var writer = XmlWriter.Create(filename))
            {
                ParseHtmlBody(reader, writer);
            }
        }

        private void ParseHtmlBody(XmlReader reader, XmlWriter writer)
        {
            Next(reader);
            switch (reader.NodeType)
            {
                case XmlNodeType.Element:
                    writer.WriteStartElement("html");
                    writer.WriteStartElement("body");
                    ParseContent(reader, writer);
                    writer.WriteEndElement();
                    writer.WriteEndElement();
                    break;
                default:
                    Console.WriteLine(reader.NodeType);
                    break;
            }
        }


        private void ParseContent(XmlReader reader, XmlWriter writer)
        {
           Next(reader);
           switch(reader.NodeType)
           {
               case XmlNodeType.Element:
                   ParseHtmlElement(reader, writer);
                   break;
               default:
                   Console.WriteLine(reader.NodeType);
                   break;
           }

        }

        private void ParseHtmlElement(XmlReader reader, XmlWriter writer)
        {
           ReflectedControl control = null;
            if(this.controls.TryGetValue(reader.LocalName, out control))
            {
                control.Write(reader, writer);
            }
            else
            {
                Console.WriteLine(reader.NodeType);
                Console.WriteLine(reader.LocalName);
                return;
            }

            ParseHtmlElementChildren(reader, writer);
        }

        private void ParseHtmlElementChildren(XmlReader reader, XmlWriter writer)
        {
            if (!reader.IsEmptyElement)
            {
                var child = reader.ReadSubtree();
                Next(child);
                ParseContent(child, writer);
            }
        }

        private void Next(XmlReader reader)
        {
            while(reader.Read())
            {
                switch(reader.NodeType)
                {
                    case XmlNodeType.Whitespace:
                        continue;
                    case XmlNodeType.Element:
                        return;
                    case XmlNodeType.None:
                        continue;
                }
            }
           throw new InvalidOperationException("Unexpected end of xml found");
       }
    }
}
