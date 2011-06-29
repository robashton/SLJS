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

namespace Calculator
{
    public partial class MainPage : UserControl
    {
        private Func<int, int, int> pendingAction = null;
        private Func<int, int, int> potentialAction = null;
        private int? pendingValue = null;

        public MainPage()
        {
            InitializeComponent();
        }

        private void btn1_Click(object sender, RoutedEventArgs e)
        {
            Append(1);
        }

        private void btn2_Click(object sender, RoutedEventArgs e)
        {
            Append(2);
        }

        private void btn3_Click(object sender, RoutedEventArgs e)
        {
            Append(3);
        }

  
        private void btn4_Click(object sender, RoutedEventArgs e)
        {
            Append(4);
        }

        private void btn5_Click(object sender, RoutedEventArgs e)
        {
            Append(5);
        }

        private void btn6_Click(object sender, RoutedEventArgs e)
        {
            Append(6);
        }

        private void btn7_Click(object sender, RoutedEventArgs e)
        {
            Append(7);
        }

        private void btn8_Click(object sender, RoutedEventArgs e)
        {
            Append(8);
        }
        private void btn9_Click(object sender, RoutedEventArgs e)
        {
            Append(9);
        }
        private void btn0_Click(object sender, RoutedEventArgs e)
        {
            Append(0);
        }

        private void btnPlus_Click(object sender, RoutedEventArgs e)
        {
            Operate((x, y) => x + y);
        }

        private void btnMinus_Click(object sender, RoutedEventArgs e)
        {
            Operate((x, y) => x - y);
        }

        private void btnEquals_Click(object sender, RoutedEventArgs e)
        {
            Calculate();
        }

        private void btnDivide_Click(object sender, RoutedEventArgs e)
        {
            Operate((x, y) => (int) (x / (y == 0 ? 0.0001f : y)));
        }


        private void btnMultiply_Click(object sender, RoutedEventArgs e)
        {
            Operate((x, y) => x * y);
        }


        private void Calculate()
        {
            if (pendingValue == null || pendingAction == null) return;
            var rightHandSide = int.Parse(txtScreen.Text);
            var result = this.pendingAction.Invoke((int)pendingValue, rightHandSide);
            txtScreen.Text = result.ToString();
            this.pendingValue = null;
        }

        private void Append(int i)
        {
            if (potentialAction != null)
            {
                pendingValue = int.Parse(txtScreen.Text);
                txtScreen.Text = string.Empty;
                this.pendingAction = potentialAction;
                this.potentialAction = null;
            }
            txtScreen.Text += i.ToString();

        }

        private void Operate(Func<int, int, int> action)
        {
            Calculate();
            this.potentialAction = action;
        }

    }
}
