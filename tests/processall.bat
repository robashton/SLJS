msbuild ../src/SL2JS.sln
msbuild	input/Tests.sln


msbuild copyjs.targets /p:OutDir=output\HelloWorld
..\bin\SL2JS.Compiler.exe "input\HelloWorld\Bin\Debug\HelloWorld.dll" -OutputDirectory:output\HelloWorld -IncludeDependencies:false