using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace restaurant_project.Models
{
    public class ContactUs
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Massage { get; set; }        
    }
}