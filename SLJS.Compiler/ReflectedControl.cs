using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Xml;

namespace SLJS.Compiler
{
    public class ReflectedControl
    {
        readonly MethodInfo renderMethod = null;
        private readonly Dictionary<string, PropertyInfo> properties = new Dictionary<string, PropertyInfo>();
        readonly Type type = null;

        public ReflectedControl(Type type)
        {
            this.type = type;
            renderMethod = type.GetMethod("Write");
            foreach(var property in type.GetProperties())
            {
                properties.Add(property.Name, property);
            }
        }
        
        public void Write(XmlReader reader, XmlWriter writer)
        {
            var control = Activator.CreateInstance(this.type);
            if(reader.HasAttributes)
            {
                CopyAttributesIntoControl(reader, control);
            }
             
            renderMethod.Invoke(control, new[] {writer});
        }

        private void CopyAttributesIntoControl(XmlReader reader, object control)
        {
            reader.MoveToFirstAttribute();

            do
            {
                string attributeName = ExtractAttributeName(reader);
                string attributeValue = reader.Value;

                PropertyInfo property = null;
                if (properties.TryGetValue(attributeName, out property))
                {
                    property.SetValue(control, attributeValue, null);
                }
            } while (reader.MoveToNextAttribute());
            reader.MoveToElement();
        }

        private string ExtractAttributeName(XmlReader reader)
        {
            if(reader.Name.Contains(":"))
            {
                return reader.Name.Substring(reader.Name.IndexOf(':') + 1);
            }
            else
            {
                return reader.Name;
            }
        }
    }
}
