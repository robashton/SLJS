using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

namespace SLJS.Compiler.Controls
{
    public class Grid : Control
    {
        public override void WriteStart(XmlWriter writer)
        {
            writer.WriteStartElement("div");
            writer.WriteAttributeString("code", "System.Windows.Controls.Grid");
        }

        public override void WriteEnd(XmlWriter writer)
        {
            writer.WriteEndElement();
        }
    }
}
