initializeApplication = function () {
    $('.coded').show();

    $('.coded').each(function () {
        var item = $(this);
        setupElementAsControl(item);
    });
};

setupElementAsControl = function (item) {
    if (item.data('code')) return; // Already set up

    var codeClass = item.attr("code");
    var code = eval('JSIL.New( ' + codeClass + ', "_ctor");');

    // Set up the relationships
    code.element = item;
    item.data('code', code);

    // And initialize self if necessary
    if (code.InitializeComponent) { code.InitializeComponent(); }
};

$(document).ready(function () {
    $('.code').hide();
    LazyLoad.js([
        "JSIL.Core.js",
        "JSIL.Bootstrap.js",
        "mscorlib, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js",
        "System, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js",
        "System.Core, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js",
        "System.Net, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js",
        "System.Runtime.Serialization, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js",
        "System.ServiceModel.Web, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js",
        "System.Windows, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js",
        "System.Windows.Browser, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js",
        "System.Xml, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e.js",
        "TestAppOne, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null.js",
        "Patches.js"
        ],
        function () {
            initializeApplication();
        });
});
