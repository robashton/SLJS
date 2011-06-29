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
    equal(mainText.Visibility, System.Windows.Visibility.Visible, "And lo indeed, the visibility of a text label was magically changed");
});

contextTest("HelloWorld", "A change to a linked-style property results in an update in the CSS", function (context) {
    var mainText = context.findControlById('txtHelloWorld');
    var element = mainText.$element;
    mainText.Visibility = System.Windows.Visibility.Visible;
    equal(element.css('display'), 'block', "And lo indeed, the visibility of a text label was magically changed");
});

// XAML expects Margin to be listed as Left, Top, Right, Bottom. HTML is Top, Right, Bottom, Left.
// Oh, and XAML is double, apparently, I found some man on the internet saying so
// I'm ignoring that because I think he's wrong
contextTest("HelloWorld", "The margin property of a .NET control can be converted into a CSS margin", function (context) {
    var button = context.findControlById('button1');
    var element = button.$element;

    var xamlMargin = "80,20,40,60";
    var expectedHtmlMargin = "20px40px60px80px";

    button.Margin = xamlMargin;
    var actualHtmlMargin = element.css("margin-top") +element.css("margin-right") +  element.css("margin-bottom") + element.css("margin-left");
    
    equal(actualHtmlMargin, expectedHtmlMargin, "Hurrah, the doofus managed to write some code to play with the XAML margins");
});

contextTest("Calculator", "If I update the Text property of a TextBox, I expect to see the result in HTML", function (context) {
    var button = context.findControlById('txtScreen');
    var element = button.$element;

    button.Text = 'Zomg';
    var newValue = element.val();

    equal(newValue, 'Zomg', "The change was made and the view was updated");
});