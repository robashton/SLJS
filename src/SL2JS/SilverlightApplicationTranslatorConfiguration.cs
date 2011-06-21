using System;
using System.IO;
using System.Text.RegularExpressions;

namespace SL2JS
{
    public class SilverlightApplicationTranslatorConfiguration
    {
        public string Filename { get; set; }
        public string OutputDirectory { get; set; }
        public bool IncludeDependencies { get; set; }

        public void ParseArguments(string[] args)
        {
            foreach (var arg in args) ParseArgument(arg);
        }

        private void ParseArgument(string argument)
        {
            var m = Regex.Match(argument, "-(-?)(?'key'[a-zA-Z]*)([=:](?'value'.*))?", RegexOptions.ExplicitCapture);
            if (m.Success)
                CopyArgumentToProperty(m.Groups["key"].Value, m.Groups["value"].Value);
            else
                this.Filename = argument;
        }

        private void CopyArgumentToProperty(string propertyName, string value)
        {
            var property = GetType().GetProperty(propertyName);
            var convertedValue = Convert.ChangeType(value, property.PropertyType);
            property.SetValue(this, convertedValue, null);
        }
    }
}