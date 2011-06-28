contextTest("HelloWorld", "An application can be initialized", function (context) {
    var mainButton = context.findControlById('button1');
    ok(mainButton, "Yes, the application was initialized and I found a button to prove it");
});