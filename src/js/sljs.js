initializeApplication = function () {
    var file = sljsconfig.entryPoint;
    $.getJSON(file, function (data) {
        var obj = JSON.parse(data);
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
    LazyLoad.js(sljsconfig.files,
        function () {
            initializeApplication();
        });
});
