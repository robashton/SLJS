using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

namespace SLJS.Compiler.Controls
{
    public class Control
    {
        public string Name { get; set; }

        public virtual void WriteStart(XmlWriter writer)
        {
            writer.WriteStartElement("div");
        }

        public virtual void WriteEnd(XmlWriter writer)
        {
            writer.WriteEndElement();
        }

        public virtual void WriteContent(XmlWriter writer)
        {
            
        }

        public virtual void Write(XmlWriter writer)
        {
            WriteStart(writer);
            writer.WriteAttributeString("name", this.Name);
            writer.WriteAttributeString("class", "coded");
            WriteContent(writer);
            WriteEnd(writer);
        }
    }
}
