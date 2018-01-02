using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace restaurant_project.Models
{
    public class Restaurants
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Area { get; set; }
        public string Category { get; set; }
        public int Rating { get; set; }
        public int NumberOfRatings { get; set; }
        public string ReservationUrl { get; set; }
    }
}