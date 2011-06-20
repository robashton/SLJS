using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

namespace SLJS.Compiler.Controls
{
    public class Button
    {
        public string Content { get; set; }
        public string Height { get; set; }
        public string Name { get; set;  }
        public string Width { get; set; }
        
        public void Write(XmlWriter writer)
        {
            writer.WriteStartElement("input");
            writer.WriteAttributeString("type", "button");
            writer.WriteAttributeString("name", Name);
            writer.WriteAttributeString("style", string.Format("height: {0}; width: {1}", Height, Width));
            writer.WriteAttributeString("value", Content);
            writer.WriteEndElement();
        }
    }
}
