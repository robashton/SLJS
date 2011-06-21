using System;

namespace SL2JS
{
    public class Resource
    {
        private readonly object key;
        private readonly object value;

        public string Name { get { return (string) key; } }
        public object Value { get { return this.value; } }

        public Resource(object key, object value)
        {
            this.key = key;
            this.value = value;
        }
    }
}