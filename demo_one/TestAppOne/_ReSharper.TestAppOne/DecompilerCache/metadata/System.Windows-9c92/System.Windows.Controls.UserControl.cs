// Type: System.Windows.Controls.UserControl
// Assembly: System.Windows, Version=2.0.5.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e
// Assembly location: c:\Program Files\Reference Assemblies\Microsoft\Framework\Silverlight\v4.0\System.Windows.dll

using System.Windows;

namespace System.Windows.Controls
{
    public class UserControl : Control
    {
        public static readonly DependencyProperty ContentProperty;
        public UserControl();
        public UIElement Content { get; set; }
    }
}
