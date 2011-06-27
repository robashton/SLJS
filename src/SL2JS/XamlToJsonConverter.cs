using System;
using System.Collections.Generic;
using System.Xml;

namespace SL2JS
{
    public class XamlToJsonConverter
    {
        private readonly XmlReader input;
        private XmlReader current;
        private readonly Stack<XmlReader> readers = new Stack<XmlReader>();
        private bool ended = false;

        public XamlToJsonConverter(XmlReader input)
        {
            this.input = input;
        }

        public void WriteTo(string jsonFilepath)
        {
            current = input;
            using (var writer = new JsonWriter(jsonFilepath))
            {
                ParseDocument(writer);
            }
        }

        private void ParseDocument(JsonWriter writer)
        {
            ParseContent(writer);
        }

        private void ParseContent(JsonWriter writer)
        {
            while (Next())
            {
                switch (current.NodeType)
                {
                    case XmlNodeType.Element:
                        ParseElement(writer);
                        continue;
                    case XmlNodeType.EndElement:
                        continue;
                    default:
                        Console.WriteLine(current.NodeType);
                        break;
                }
            }
        }

        private void ParseElement(JsonWriter writer)
        {
            writer.StartBlock();
            writer.WriteProperty("$ElementType", current.LocalName);

            ParseElementAttributes(writer);
            ParseElementChildren(writer);
            
            writer.EndBlock();
        }

        private void ParseElementAttributes(JsonWriter writer)
        {
            if (!current.HasAttributes) return;
            current.MoveToFirstAttribute();

            do
            {
                string attributeName = GetCurrentAttributeName();
                string attributeValue = current.Value;
                writer.WriteProperty(attributeName, attributeValue);

            } while (current.MoveToNextAttribute());
            current.MoveToElement();
        }

        private string GetCurrentAttributeName()
        {
            if (current.Name.Contains(":"))
            {
                return current.Name.Substring(current.Name.IndexOf(':') + 1);
            }
            return current.Name;
        }

        private void ParseElementChildren(JsonWriter writer)
        {
            if (current.IsEmptyElement) return;
            writer.StartArray("$Elements");
            Descend();
            Next();
            ParseContent(writer);
            Ascend();
            Next();
            writer.EndArray();
        }

        private void Ascend()
        {
            current.Close();
            current = readers.Pop();
        }

        private void Descend()
        {
            var child = current.ReadSubtree();
            readers.Push(current);
            current = child;
        }

        private bool Next()
        {
            while (current.Read())
            {
                switch (current.NodeType)
                {
                    case XmlNodeType.Whitespace:
                        continue;
                    case XmlNodeType.Element:
                        return true;
                    case XmlNodeType.EndElement:
                        return true; 
                    case XmlNodeType.None:
                        continue;
                }
            }
            return false;
        }
    }
}