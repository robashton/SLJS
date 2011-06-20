System.Threading.Thread.GetCurrentThreadNative = function () {
    return new System.Threading.Thread();
};

$asm02.MS.Internal.XcpImports.CreateObjectByTypeIndex = function () {
    return 0;
}

$asm02.MS.Internal.XcpImports.CreateObjectByTypeIndexNative = function () {
    return 0;
};

System.Windows.Application.prototype._ctor$1 = function (nativeTypeIndex) {
    System.Object.prototype._ctor.call(this);
    System.Windows.Application._current = this;
    this.add_Starting(JSIL.Delegate.New("System.Windows.StartupEventHandler", this, System.Windows.Application.prototype.Application_Starting));
    this.add_Started(JSIL.Delegate.New("System.EventHandler", this, System.Windows.Application.prototype.Application_Started));
    this.add_Exiting(JSIL.Delegate.New("System.EventHandler", this, System.Windows.Application.prototype.Application_Exiting));
    this.add_Exited(JSIL.Delegate.New("System.EventHandler", this, System.Windows.Application.prototype.Application_Exited));
}; 

System.Environment.GetResourceString$0 = function (key) {
    return key; // for now
}

System.Globalization.CultureInfo.GetUserDefaultUILanguage = function () {
    return {}; // System.Globalization.CultureInfo.InvariantCulture;
};

/*  Urgh, everything below this line is just pain */

System.Text.StringBuilder.prototype._ctor$4 = function (value, startIndex, length, capacity) {
    
} // JSIL.UntranslatableFunction("System.Void System.Text.StringBuilder::.ctor(System.String,System.Int32,System.Int32,System.Int32)");


System.Text.StringBuilder.prototype.Append$1 = function(value, startIndex, charCount) {
    
} //JSIL.UntranslatableFunction("System.Text.StringBuilder System.Text.StringBuilder::Append(System.Char[],System.Int32,System.Int32)");


System.Text.StringBuilder.prototype.Append$2 = function (value) {

}; // JSIL.UntranslatableFunction("System.Text.StringBuilder System.Text.StringBuilder::Append(System.String)");

System.Text.StringBuilder.prototype.AppendHelper = function(value) {

} // JSIL.UntranslatableFunction("System.Void System.Text.StringBuilder::AppendHelper(System.String)");

System.Text.StringBuilder.prototype.Append$3 = function(value, startIndex, count) {

} //JSIL.UntranslatableFunction("System.Text.StringBuilder System.Text.StringBuilder::Append(System.String,System.Int32,System.Int32)");

System.Text.StringBuilder.prototype.Insert$0 = function (index, value, count) {

}; // JSIL.UntranslatableFunction("System.Text.StringBuilder System.Text.StringBuilder::Insert(System.Int32,System.String,System.Int32)");

System.Text.StringBuilder.prototype.Append$17 = function(value) {

} //JSIL.UntranslatableFunction("System.Text.StringBuilder System.Text.StringBuilder::Append(System.Char[])");

System.Text.StringBuilder.prototype.Insert$1 = function (index, value) {

}; // JSIL.UntranslatableFunction("System.Text.StringBuilder System.Text.StringBuilder::Insert(System.Int32,System.String)");

System.Text.StringBuilder.prototype.ReplaceAllInChunk = function (indices, index, builder, index, value) {

} // JSIL.UntranslatableFunction("System.Void System.Text.StringBuilder::ReplaceAllInChunk(System.Int32[],System.Int32,System.Text.StringBuilder,System.Int32,System.String)");

System.Text.StringBuilder.ThreadSafeCopy = function (input, sourceIndex, output, destIndex, count ) {

}//JSIL.UntranslatableFunction("System.Void System.Text.StringBuilder::ThreadSafeCopy(System.Char[],System.Int32,System.Char[],System.Int32,System.Int32)");

System.Text.StringBuilder.prototype.InternalCopy = function () {

} // JSIL.UntranslatableFunction("System.Void System.Text.StringBuilder::InternalCopy(System.IntPtr,System.Int32)");
System.Text.StringBuilder.prototype.MakeRoom = function() {

} // JSIL.UntranslatableFunction("System.Void System.Text.StringBuilder::MakeRoom(System.Int32,System.Int32,System.Text.StringBuilder&,System.Int32&,System.Boolean)");

System.Text.StringBuilder.prototype.ToString = function () {
    return "";
}

JSIL.OverloadedMethod(System.Text.StringBuilder.prototype, "_ctor", [
		["_ctor$0", []],
		["_ctor$1", [System.Int32]],
		["_ctor$2", [System.String]],
		["_ctor$3", [System.String, System.Int32]],
		["_ctor$4", [System.String, System.Int32, System.Int32, System.Int32]],
		["_ctor$5", [System.Int32, System.Int32]],
		["_ctor$6", [System.Text.StringBuilder]],
		["_ctor$7", [System.Int32, System.Int32, System.Text.StringBuilder]]
	]);
JSIL.OverloadedMethod(System.Text.StringBuilder.prototype, "Append", [
		["Append$0", [System.Char, System.Int32]],
		["Append$1", [System.Array.Of(System.Char), System.Int32, System.Int32]],
		["Append$2", [System.String]],
		["Append$3", [System.String, System.Int32, System.Int32]],
		["Append$4", [System.Boolean]],
		["Append$5", [System.SByte]],
		["Append$6", [System.Byte]],
		["Append$7", [System.Char]],
		["Append$8", [System.Int16]],
		["Append$9", [System.Int32]],
		["Append$10", [System.Int64]],
		["Append$11", [System.Single]],
		["Append$12", [System.Double]],
		["Append$13", [System.UInt16]],
		["Append$14", [System.UInt32]],
		["Append$15", [System.UInt64]],
		["Append$16", [System.Object]],
		["Append$17", [System.Array.Of(System.Char)]]
	]);
JSIL.OverloadedMethod(System.Text.StringBuilder.prototype, "AppendLine", [
		["AppendLine$0", []],
		["AppendLine$1", [System.String]]
	]);
JSIL.OverloadedMethod(System.Text.StringBuilder.prototype, "Insert", [
		["Insert$0", [System.Int32, System.String, System.Int32]],
		["Insert$1", [System.Int32, System.String]],
		["Insert$2", [System.Int32, System.Char]],
		["Insert$3", [System.Int32, System.Array.Of(System.Char)]],
		["Insert$4", [System.Int32, System.Array.Of(System.Char), System.Int32, System.Int32]]
	]);
JSIL.OverloadedMethod(System.Text.StringBuilder.prototype, "Remove", [
		["Remove$0", [System.Int32, System.Int32]],
		["Remove$1", [System.Int32, System.Int32, JSIL.Reference.Of(System.Text.StringBuilder), JSIL.Reference.Of(System.Int32)]]
	]);
JSIL.OverloadedMethod(System.Text.StringBuilder.prototype, "AppendFormat", [
		["AppendFormat$0", [System.String, System.Array.Of(System.Object)]],
		["AppendFormat$1", [System.IFormatProvider, System.String, System.Array.Of(System.Object)]]
	]);
JSIL.OverloadedMethod(System.Text.StringBuilder.prototype, "Replace", [
		["Replace$0", [System.String, System.String]],
		["Replace$1", [System.String, System.String, System.Int32, System.Int32]],
		["Replace$2", [System.Char, System.Char]],
		["Replace$3", [System.Char, System.Char, System.Int32, System.Int32]]
	]);

JSIL.SealTypes(
  $asm02, "System.Windows",
  "DependencyProperty"
);
