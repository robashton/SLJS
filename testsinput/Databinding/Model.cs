using System;
using System.ComponentModel;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Databinding
{
    public class Model : INotifyPropertyChanged
    {
        private string backingValue;

        public string StringProperty
        {
            get { return backingValue; }
            set { backingValue = value;
            OnPropertyChanged("StringProperty");
            }
        }

        private void OnPropertyChanged(string name)
        {
            var ev = this.PropertyChanged;
            if(ev != null) ev(this, new PropertyChangedEventArgs(name));
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
