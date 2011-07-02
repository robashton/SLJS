JSIL.DeclareNamespace("System.Windows.Controls");

//////////////////////////////////////////////////////////////
////// System.Windows.Controls.Control////////////////////////
//////////////////////////////////////////////////////////////


JSIL.MakeClass(System.Windows.FrameworkElement, "System.Windows.Controls.Control", true);
Class.setup(System.Windows.Controls.Control, {
    _ctor: function () {

    }
});

//////////////////////////////////////////////////////////////
////// System.Windows.Controls.ContentControl/////////////////
//////////////////////////////////////////////////////////////

JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.ContentControl", true);
Class.setup(System.Windows.Controls.ContentControl, {
    _ctor: function () {

    },
    $ContentProperty: System.Windows.Controls.UIElement
});

//////////////////////////////////////////////////////////////
////// System.Windows.Controls.UserControl////////////////////
//////////////////////////////////////////////////////////////

JSIL.MakeClass(System.Windows.Controls.ContentControl, "System.Windows.Controls.UserControl", true);
Class.setup(System.Windows.Controls.UserControl, {
    _ctor: function () {

    }
});

//////////////////////////////////////////////////////////////
////// System.Windows.Controls.Grid///////////////////////////
//////////////////////////////////////////////////////////////

JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.Grid", true);
Class.setup(System.Windows.Controls.Grid, {
    _ctor: function () {

    },
    Items: function () {
        return this.Children.items;
    },
    $ChildrenProperty: System.Windows.Controls.UIElementCollection
});

//////////////////////////////////////////////////////////////
////// System.Windows.Controls.TextBlock//////////////////////
//////////////////////////////////////////////////////////////

JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.TextBlock", true);
Class.setup(System.Windows.Controls.TextBlock, {
    _ctor: function () {

    },
    hookDomEvents: function () {
        var control = this;
        this.AddEventListener("Text", function () {
            control.$element.val(control.Text);
        });
    },
    $TextProperty: System.String
});

//////////////////////////////////////////////////////////////
////// System.Windows.Controls.TextBox//////////////////////
//////////////////////////////////////////////////////////////

JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.TextBox", true);
Class.setup(System.Windows.Controls.TextBox, {
    _ctor: function () {
        this.Text = '';
    },
    hookDomEvents: function () {
        var control = this;
        this.AddEventListener("Text", function () {
            control.$element.val(control.Text);
        });
    },
    $TextProperty: System.String
});

//////////////////////////////////////////////////////////////
////// System.Windows.Controls.Button/////////////////////////
//////////////////////////////////////////////////////////////

JSIL.MakeClass(System.Windows.Controls.Control, "System.Windows.Controls.Button", true);
Class.setup(System.Windows.Controls.Button, {
    _ctor: function () {

    },
    $Events: [
        "Click"
    ],
    hookDomEvents: function () {
        var control = this;
        this.$element.click(function () {
            control.raiseEvent(control, "Click", {});
        });

        this.AddEventListener("Content", function () {
            control.$element.val(this.Content);
        });
    },
    $ContentProperty: System.String

});