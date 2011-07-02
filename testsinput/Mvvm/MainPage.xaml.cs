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

namespace Mvvm
{
    public partial class MainPage : UserControl
    {
        public MainPage()
        {
            InitializeComponent();
            SetupItems();
        }

        private void SetupItems()
        {
            var items = new[]
                            {
                                new ProductViewModel()
                                    {
                                         Title = "Fish",
                                         Description = "Found in the oceans",
                                         Price = "Too much"
                                    },
                                new ProductViewModel()
                                    {
                                         Title = "Lions",
                                         Description = "Only in Kenya",
                                         Price = "Cheaper than norway"
                                    },
                                new ProductViewModel()
                                    {
                                         Title = "Tigers",
                                         Description = "Also only in Kenya",
                                         Price = "Cheaper than norway (easy)"
                                    },
                                    new ProductViewModel()
                                    {
                                         Title = "Snakes",
                                         Description = "Anywhere but Ireland",
                                         Price = "Cheaper than their oil"
                                    },
                                    new ProductViewModel()
                                    {
                                         Title = "Spiders",
                                         Description = "Ooh, scary",
                                         Price = "I'll pay you to take them off me"
                                    },
                                    new ProductViewModel()
                                    {
                                         Title = "Dogs",
                                         Description = "Better than cats",
                                         Price = "You can't have mine"
                                    },

                            };
            listBox1.ItemsSource = items;
        }
    }
}
