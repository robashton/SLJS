using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

namespace SLJS.Compiler.Controls
{
    public class UserControl : Control
    {
        public string DesignHeight { get; set; }
        public string DesignWidth { get; set; }
        public string Class { get; set; }

        public override void WriteStart(XmlWriter writer)
        {
            writer.WriteStartElement("div");
            writer.WriteAttributeString("code", this.Class);
            writer.WriteAttributeString("style", string.Format("height: {0}; width: {1}", DesignHeight, DesignWidth));
        }

        public override void WriteEnd(XmlWriter writer)
        {
            writer.WriteEndElement();
        }
    }
}
