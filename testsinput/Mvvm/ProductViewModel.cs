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

namespace Mvvm
{
    public class ProductViewModel : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;
        private string title;
        private string description;
        private string price;

        public string Title
        {
            get { return title; }
            set
            {
                this.title = value;
                RaisePropertyChanged("Title");
            }
        }

        public string Description
        {
            get { return description; }
            set
            {
                this.description = value;
                RaisePropertyChanged("Description");
            }
        }

        public string Price
        {
            get { return price; }
            set
            {
                this.price = value;
                RaisePropertyChanged("Price");
            }
        }


        private void RaisePropertyChanged(string propertyName)
        {
            var ev = this.PropertyChanged;
            if (ev != null)
            {
                ev(this, new PropertyChangedEventArgs(propertyName));
            }
        }
    }
}
