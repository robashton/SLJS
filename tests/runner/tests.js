contextTest("HelloWorld", "An application can be initialized", function (context) {
    ok(true, "If we made it this far without an exception, then it's all gravy");
});

contextTest("HelloWorld", "A Button can be loaded onto the page", function (context) {
    var mainButton = context.findControlById('button1');
    ok(mainButton, "I found a button");
});


contextTest("HelloWorld", "A TextBlock can be loaded onto the page", function (context) {
    var mainText = context.findControlById('txtHelloWorld');
    ok(mainText, "I found the text label");
});

contextTest("HelloWorld", "A button click can be routed into the original .NET code", function (context) {
    var mainText = context.findControlById('txtHelloWorld');
    var main = context.findControlById('button1');
    main.$element.click();
    ok(mainText.Visibility === System.Windows.Visibility.Visible, "And lo indeed, the visibility of a text label was magically changed");
});

contextTest("HelloWorld", "A change to a linked-style property results in an update in the CSS", function (context) {
    var mainText = context.findControlById('txtHelloWorld');
    var element = mainText.$element;
    mainText.Visibility = System.Windows.Visibility.Visible;
    ok(element.css('display') === 'block', "And lo indeed, the visibility of a text label was magically changed");
});