using System;
using System.IO;

namespace SL2JS
{
    /// <summary>
    /// HAhaaaaha, good luck debugging this future-self, replace it with someone elses yeah?
    /// </summary>
    public class JsonWriter : IDisposable
    {
        private readonly FileStream stream;
        private readonly StreamWriter writer;
        private string indent = "";
        private bool first = true;

        public JsonWriter(string jsonFilepath)
        {
            this.stream = new FileStream(jsonFilepath,  FileMode.Create, FileAccess.Write);
            this.writer = new StreamWriter(stream);
        }

        public void StartBlock()
        {
            WriteCommaIfNecessary();
            WriteLine("{{");
            IncreaseIndent();
            first = true;
        }

        public void EndBlock()
        {
            DecreaseIndent();
            WriteLine("}}");
        }

        public void WriteProperty(string name, string value)
        {
            WriteRawProperty(name, string.Format("\"{0}\"", value));
        }


        public void WriteRawProperty(string name, string value)
        {
            WriteCommaIfNecessary();
            WriteLine("\"{0}\": {1}", name, value);
        }

        private void WriteCommaIfNecessary()
        {
            if (first)
            {
                first = false;
                return;
            }
            writer.Write(",");
        }

        public void StartArray(string name)
        {
            WriteCommaIfNecessary();
            WriteLine("\"{0}\": [ ", name);
            IncreaseIndent();
            first = true;
        }
        
        public void EndArray()
        {
            DecreaseIndent();
            WriteLine("]");
            first = false;
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
            first = false;
        }


        private void IncreaseIndent()
        {
            indent += "\t";
        }
        
        private void WriteLine(string s, params object[] args)
        {
            writer.WriteLine();
            writer.Write(indent + s, args);
        }

        ~JsonWriter()
        {
            Dispose(false);
        }

    }
}