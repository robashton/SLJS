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

            var filenames = new HashSet<string>(arguments);
            var configuration = new SilverlightApplicationTranslatorConfiguration();
            configuration.ParseArguments(arguments);

            var applicationTranslator = new SilverlightApplicationTranslator(configuration);
            applicationTranslator.ProcessWith(assemblyTranslator);
        }

        private static void HookTranslatorEvents(SilverlightAssemblyTranslator translator)
        {
            translator.StartedLoadingAssembly += (fn) => Console.Error.WriteLine("// Loading {0}...", fn);
            translator.StartedDecompilingAssembly += (fn, s) => Console.Error.WriteLine(s ? "// Generating stub for {0}..." : "// Translating {0}...", fn);
            translator.CouldNotLoadSymbols += (fn, ex) => Console.Error.WriteLine("// Could not load symbols for module {0}: {1}", fn, ex.Message);
            translator.CouldNotResolveAssembly += (fn, ex) => Console.Error.WriteLine("// Could not load module {0}: {1}", fn, ex.Message);
            translator.CouldNotDecompileMethod += (fn, ex) => Console.Error.WriteLine("// Could not decompile method {0}: {1}", fn, ex.Message);
            translator.StartedDecompilingMethod += (fn) => Console.Error.Write("// Decompiling {0}... ", fn);
            translator.FinishedDecompilingMethod += (fn) => Console.Error.WriteLine("done.");
        }
    }

}
