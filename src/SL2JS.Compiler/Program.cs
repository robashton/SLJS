using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text.RegularExpressions;
using JSIL;
using Mono.Cecil;
using SL2JS;

namespace SLJS.Compiler
{
    class Program
    {

        static void Main(string[] arguments)
        {
            var assemblyTranslator = new SilverlightAssemblyTranslator();
            HookTranslatorEvents(assemblyTranslator);
          

            var configuration = new SilverlightApplicationTranslatorConfiguration();
            configuration.ParseArguments(arguments);

            var xamlTranslator = new XamlTranslator();
            var resourceTranslator = new ResourceFileTranslator(xamlTranslator);
            var applicationTranslator = new SilverlightApplicationTranslator(configuration, resourceTranslator);
            applicationTranslator.ProcessWith(assemblyTranslator);
        }

        private static void HookTranslatorEvents(SilverlightAssemblyTranslator translator)
        {
            translator.LoadingAssembly += (fn, progress) =>
            {
                Console.Error.WriteLine("// Loading {0}...", fn);
            };
            translator.Decompiling += (progress) =>
            {
                Console.Error.Write("// Decompiling ");

                var previous = new int[1] { 0 };

                progress.ProgressChanged += (s, p, max) =>
                {
                    var current = p * 20 / max;
                    if (current != previous[0])
                    {
                        previous[0] = current;
                        Console.Error.Write(".");
                    }
                };

                progress.Finished += (s, e) =>
                {
                    Console.Error.WriteLine(" done");
                };
            };
            translator.Optimizing += (progress) =>
            {
                Console.Error.Write("// Optimizing ");

                var previous = new int[1] { 0 };

                progress.ProgressChanged += (s, p, max) =>
                {
                    var current = p * 20 / max;
                    if (current != previous[0])
                    {
                        previous[0] = current;
                        Console.Error.Write(".");
                    }
                };

                progress.Finished += (s, e) =>
                {
                    Console.Error.WriteLine(" done");
                };
            };
            translator.Writing += (progress) =>
            {
                Console.Error.Write("// Writing JS ");

                var previous = new int[1] { 0 };

                progress.ProgressChanged += (s, p, max) =>
                {
                    var current = p * 20 / max;
                    if (current != previous[0])
                    {
                        previous[0] = current;
                        Console.Error.Write(".");
                    }
                };

                progress.Finished += (s, e) =>
                {
                    Console.Error.WriteLine(" done");
                };
            };
            translator.CouldNotLoadSymbols += (fn, ex) =>
            {
                Console.Error.WriteLine("// {0}", ex.Message);
            };
            translator.CouldNotResolveAssembly += (fn, ex) =>
            {
                Console.Error.WriteLine("// Could not load module {0}: {1}", fn, ex.Message);
            };
            translator.CouldNotDecompileMethod += (fn, ex) =>
            {
                Console.Error.WriteLine("// Could not decompile method {0}: {1}", fn, ex.Message);
            };
        }
    }

}
