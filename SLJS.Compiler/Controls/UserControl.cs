using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

namespace SLJS.Compiler.Controls
{
    public class UserControl
    {
        public string DesignHeight { get; set; }
        public string DesignWidth { get; set; }

        public void Write(XmlWriter writer)
        {
            writer.WriteStartElement("div");
            writer.WriteAttributeString("style", string.Format("height: {0}; width: {1}", DesignHeight, DesignWidth));
            writer.WriteEndElement();
        }
    }
}
