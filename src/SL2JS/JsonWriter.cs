using System;
using System.IO;

namespace SL2JS
{
    public class JsonWriter : IDisposable
    {
        private readonly FileStream stream;
        private readonly StreamWriter writer;
        private string indent = "";

        public JsonWriter(string jsonFilepath)
        {
            this.stream = new FileStream(jsonFilepath,  FileMode.OpenOrCreate, FileAccess.Write);
            this.writer = new StreamWriter(stream);
        }

        public void StartBlock()
        {
            WriteLine("{{");
            IncreaseIndent();
        }

        public void EndBlock(bool finish = false)
        {
            DecreaseIndent();
            WriteLine("}},");
        }

        public void WriteProperty(string name, string value)
        {
            WriteLine("'{0}': '{1}',", name, value);
        }

        public void StartArray(string name)
        {
            WriteLine("'{0}': [ ", name);
            IncreaseIndent();
        }
        
        public void EndArray()
        {
            DecreaseIndent();
            WriteLine("],");
        }

        public void Dispose()
        {
            this.Dispose(true);
        }

        protected void Dispose(bool disposing)
        {
            if(disposing)
            {
                this.writer.Dispose();
                this.stream.Dispose();
            }
        }
        
        private void DecreaseIndent()
        {
            indent = indent.Substring(0, indent.Length - 1);
        }


        private void IncreaseIndent()
        {
            indent += "\t";
        }
        
        private void WriteLine(string s, params object[] args)
        {
            writer.WriteLine(indent + s, args);
        }

        ~JsonWriter()
        {
            Dispose(false);
        }

    }
}