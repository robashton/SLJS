using System;
using System.Xml;

namespace SL2JS
{
    public class XamlToJsonConverter
    {
        private readonly XmlReader input;

        public XamlToJsonConverter(XmlReader input)
        {
            this.input = input;
        }
    }
}