So okay, this is a Silverlight to Javascript converter.

It generates readable JS courtesy of JSIL.

Rather than try to bring across all the .NET core code, 
I am re-implementing the entire framework in Javascript as and when it is needed.

This has some advantages in that we can write (largely) idiomatic Javascript code and not 
have to suffer the disadvantages of trying to fit square pegs into round holes.

It has some disadvantages because it means writing a lot of code. 

C'est la vie, writing code is easy.

For more information, hit me up on Twitter @robashton, you can probably help.

So far we have a subset of the dependency property/object system implemented as well as some skeleton implementations of some controls with their events just to prove that end-to-end this whole thing actually works!

Note: Project schedule looks something like this:

NDC2011: Start developing it
End of July: Publicly put some demos up
August: Hope people start helping