using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace restaurant_project.Models
{
    public class Reviews
    {
        public int Id { get; set; }
        public string UsersEmail { get; set; }
        public string RestaurantName { get; set; }
        public string Category { get; set; }
        public string Area { get; set; }
        public string Review { get; set; }
        public int Rate { get; set; }
    }
}