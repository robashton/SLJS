/* Generated by JSIL v0.2 build 28582. See http://jsil.org/ for more information. */ 
var $asm01 = JSIL.DeclareAssembly("HelloWorld, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null");
JSIL.DeclareNamespace("HelloWorld");
JSIL.MakeClass("System.Windows.Application", "HelloWorld.App", true);
JSIL.MakeClass("System.Object", "HelloWorld.App/$l$gc__DisplayClass2", false);


JSIL.MakeClass("System.Windows.Controls.UserControl", "HelloWorld.MainPage", true);

HelloWorld.App.prototype._ctor = function () {
	System.Windows.Application.prototype._ctor.call(this);
	System.Windows.Application.prototype.add_Startup.call(this, JSIL.Delegate.New("System.Windows.StartupEventHandler", this, HelloWorld.App.prototype.Application_Startup));
	System.Windows.Application.prototype.add_Exit.call(this, JSIL.Delegate.New("System.EventHandler", this, HelloWorld.App.prototype.Application_Exit));
	System.Windows.Application.prototype.add_UnhandledException.call(this, JSIL.Delegate.New("System.EventHandler`1[System.Windows.ApplicationUnhandledExceptionEventArgs]", this, HelloWorld.App.prototype.Application_UnhandledException));
	this.InitializeComponent();
};
HelloWorld.App.prototype.Application_Startup = function (sender, e) {
	System.Windows.Application.prototype.set_RootVisual.call(this, new HelloWorld.MainPage());
};
HelloWorld.App.prototype.Application_Exit = function (sender, e) {
};
HelloWorld.App.prototype.Application_UnhandledException = function (sender, e) {
	var $l$gc__DisplayClass = new $asm01.HelloWorld.App.$l$gc__DisplayClass2();
	$l$gc__DisplayClass.e = e;
	$l$gc__DisplayClass.$this = this;
	if (!System.Diagnostics.Debugger.IsAttached) {
		$l$gc__DisplayClass.e.Handled = true;
		System.Windows.Deployment.Current.Dispatcher.BeginInvoke$0(function () {
				$l$gc__DisplayClass.$this.ReportErrorToDOM($l$gc__DisplayClass.e);
			});
	}
};
HelloWorld.App.prototype.ReportErrorToDOM = function (e) {
	try {
		var errorMsg = ((e.ExceptionObject.Message + e.ExceptionObject.StackTrace));
		errorMsg = (errorMsg.Replace$0('"', "'")).Replace$1("\r\n", "\\n");
		System.Windows.Browser.HtmlPage.Window.Eval(('throw new Error("Unhandled Error in Silverlight Application ' + errorMsg + '");'));
	} catch ($exception) {
	}
};
HelloWorld.App.prototype.InitializeComponent = function () {
	if (!this._contentLoaded) {
		this._contentLoaded = true;
		System.Windows.Application.LoadComponent(this, new System.Uri("/HelloWorld;component/App.xaml", System.UriKind.Relative));
	}
};
HelloWorld.App.prototype._contentLoaded = false;

$asm01.HelloWorld.App.$l$gc__DisplayClass2.prototype._ctor = function () {
	System.Object.prototype._ctor.call(this);
};
$asm01.HelloWorld.App.$l$gc__DisplayClass2.prototype.$this = null;
$asm01.HelloWorld.App.$l$gc__DisplayClass2.prototype.e = null;

HelloWorld.MainPage.prototype._ctor = function () {
	System.Windows.Controls.UserControl.prototype._ctor.call(this);
	this.InitializeComponent();
};
HelloWorld.MainPage.prototype.button1_Click = function (sender, e) {
	this.txtHelloWorld.Visibility = System.Windows.Visibility.Visible;
};
HelloWorld.MainPage.prototype.InitializeComponent = function () {
	if (!this._contentLoaded) {
		this._contentLoaded = true;
		System.Windows.Application.LoadComponent(this, new System.Uri("/HelloWorld;component/MainPage.xaml", System.UriKind.Relative));
		this.LayoutRoot = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "LayoutRoot"), System.Windows.Controls.Grid);
		this.button1 = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "button1"), System.Windows.Controls.Button);
		this.txtHelloWorld = JSIL.Cast(System.Windows.FrameworkElement.prototype.FindName.call(this, "txtHelloWorld"), System.Windows.Controls.TextBlock);
	}
};
HelloWorld.MainPage.prototype.LayoutRoot = null;
HelloWorld.MainPage.prototype.button1 = null;
HelloWorld.MainPage.prototype.txtHelloWorld = null;
HelloWorld.MainPage.prototype._contentLoaded = false;

