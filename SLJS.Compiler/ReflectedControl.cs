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
        MethodInfo renderMethod = null;
        PropertyInfo[] properties = null;
        Type type = null;

        public ReflectedControl(Type type)
        {
            this.type = type;
            renderMethod = type.GetMethod("Write");
            this.properties = type.GetProperties();
        }
        
        public void Write(XmlReader reader, XmlWriter writer)
        {
            var control = Activator.CreateInstance(this.type);
            foreach(var property in properties)
            {
                property.SetValue(control, reader[property.Name], null);
            }
            renderMethod.Invoke(control, new[] {writer});
        }
    }
}
