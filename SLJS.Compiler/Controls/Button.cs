using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

namespace SLJS.Compiler.Controls
{
    public class Button : Control
    {
        public string Content { get; set; }
        public string Height { get; set; }
        public string Width { get; set; }
        public string Click { get; set; }
        
        public override void WriteStart(XmlWriter writer)
        {
            writer.WriteStartElement("input");
            writer.WriteAttributeString("type", "button");
            writer.WriteAttributeString("code", "System.Windows.Controls.Button");
            writer.WriteAttributeString("style", string.Format("height: {0}; width: {1}", Height, Width));
            writer.WriteAttributeString("value", Content);

            if(!string.IsNullOrEmpty(Click))
            {
                writer.WriteAttributeString("onclick", string.Format("$(this).parent().parent().data('code').{0}()", this.Click));
            }
        }

        public override void WriteEnd(XmlWriter writer)
        {
            writer.WriteEndElement();
        }
    }
}
