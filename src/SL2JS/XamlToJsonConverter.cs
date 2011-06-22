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
            writer.StartBlock();
            ParseContent(writer);
            writer.EndBlock(true);
        }

        private void ParseContent(JsonWriter writer)
        {
            writer.StartArray("$Elements");
            Next();
            switch (current.NodeType)
            {
                case XmlNodeType.Element:
                    ParseElement(writer);
                    break;
                case XmlNodeType.EndElement:
                    break;
                default:
                    Console.WriteLine(current.NodeType);
                    break;
            }
            writer.EndArray();
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

            Descend();
            Next();
            ParseContent(writer);
            Ascend();
            Next();
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

        private void Next()
        {
            while (current.Read())
            {
                switch (current.NodeType)
                {
                    case XmlNodeType.Whitespace:
                        continue;
                    case XmlNodeType.Element:
                        return;
                    case XmlNodeType.EndElement:
                        return;
                    case XmlNodeType.None:
                        continue;
                }
            }
            if (ended) throw new InvalidOperationException("Unexpected end of XML found");
            ended = true;
        }
    }
}