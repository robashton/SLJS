msbuild ../src/SL2JS.sln
msbuild	input/Tests.sln


msbuild copyjs.targets /p:OutDir=output\HelloWorld
msbuild copytemplates.targets /p:OutDir=output\HelloWorld
..\bin\SL2JS.Compiler.exe "input\HelloWorld\Bin\Debug\HelloWorld.dll" -OutputDirectory:output\HelloWorld -IncludeDependencies:false

msbuild copyjs.targets /p:OutDir=output\Calculator
msbuild copytemplates.targets /p:OutDir=output\Calculator
..\bin\SL2JS.Compiler.exe "input\Calculator\Bin\Debug\Calculator.dll" -OutputDirectory:output\Calculator -IncludeDependencies:false


msbuild copyjs.targets /p:OutDir=runner
msbuild copytemplates.targets /p:OutDir=runner