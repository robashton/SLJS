using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Databinding
{
    public partial class MainPage : UserControl
    {
        private readonly Model model;

        public MainPage()
        {
            InitializeComponent();
            this.model = new Model()
                                   {
                                        StringProperty = "InitialValue"
                                   };
            this.DataContext = model;
        }
    }
}
