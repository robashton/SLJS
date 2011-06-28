JSIL.DeclareAssembly("System");

JSIL.MakeClass(Object, "System.Uri", true);
Class.setup(System.Uri, {
    _ctor: function (uri, kind) {
        this.string = uri;
        this.kind = kind;
    },
    toString: function () {
        return this.string;
    }
});

System.UriKind = {
    Relative: 0
};