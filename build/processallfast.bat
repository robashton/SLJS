msbuild ..\src\SL2JS.sln
msbuild	..\testsinput\Tests.sln

msbuild copyjs.targets /p:OutDir=..\tests\output\HelloWorld
msbuild copytemplates.targets /p:OutDir=..\tests\output\HelloWorld
msbuild copyxap.targets /p:ProjectName=HelloWorld /p:OutDir=..\tests\output\HelloWorld
..\bin\SL2JS.Compiler.exe "../testsinput\HelloWorld\Bin\Debug\HelloWorld.dll" -OutputDirectory:..\tests\output\HelloWorld -IncludeDependencies:false



msbuild copyjs.targets /p:OutDir=..\tests\output\Calculator
msbuild copytemplates.targets /p:OutDir=..\tests\output\Calculator
msbuild copyxap.targets /p:ProjectName=Calculator /p:OutDir=..\tests\output\Calculator
..\bin\SL2JS.Compiler.exe "..\testsinput\Calculator\Bin\Debug\Calculator.dll" -OutputDirectory:..\tests\output\Calculator -IncludeDependencies:false


msbuild copyjs.targets /p:OutDir=..\tests\runner
msbuild copytemplates.targets /p:OutDir=..\tests\runner