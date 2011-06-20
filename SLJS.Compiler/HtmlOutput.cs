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

        public HtmlOutput(string filename)
        {
            this.filename = filename;
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
            switch(reader.LocalName)
            {
                case "UserControl":
                    ParseUserControl(reader, writer);
                    break;
                case "Grid":
                    ParseGrid(reader, writer);
                    break;
                case "Button":
                    ParseButton(reader, writer);
                    break;
                default:
                    Console.WriteLine(reader.NodeType);
                    Console.WriteLine(reader.LocalName);
                    return;
            }
            if (!reader.IsEmptyElement)
            {
                var child = reader.ReadSubtree();
                Next(child);
                ParseContent(child, writer);
            }
        }

        private void ParseButton(XmlReader reader, XmlWriter writer)
        {
            var content = reader["Content"];
            var height = reader["Height"];
            var name = reader["Name"];
            var width = reader["Width"];

            writer.WriteStartElement("input");
            writer.WriteAttributeString("type", "button");
            writer.WriteAttributeString("name", name);
            writer.WriteAttributeString("style", string.Format("height: {0}; width: {1}", height, width));
            writer.WriteAttributeString("value", content);
            writer.WriteEndElement();
        }

        private void ParseGrid(XmlReader reader, XmlWriter writer)
        {
            writer.WriteStartElement("div");

            writer.WriteEndElement();
        }

        private void ParseUserControl(XmlReader reader, XmlWriter writer)
        {
            var height = reader["DesignHeight"];
            var width = reader["DesignWidth"];

            writer.WriteStartElement("div");
            writer.WriteAttributeString("style", string.Format("height: {0}; width: {1}", height, width));
            writer.WriteEndElement();
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
