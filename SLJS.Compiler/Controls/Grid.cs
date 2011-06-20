using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

namespace SLJS.Compiler.Controls
{
    public class Grid
    {
        public void Write(XmlWriter writer)
        {
            writer.WriteStartElement("div");
            writer.WriteEndElement();
        }
    }
}
