using restaurant_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace restaurant_project.Controllers.api
{
    [RoutePrefix("ContactUs")]
    public class ContactUsController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();
        [HttpGet]
        public IEnumerable<ContactUs> GetContactUs()
        {
            return m_db.ContactUs;
        }        [ScopeAuthorize("read:resource_servers")]
        [Route("")]        [HttpGet]
        public IHttpActionResult GetContactUs(long id)
        {
            ContactUs Contact = m_db.ContactUs.Find(id);
            if (Contact == null)
            {
                return NotFound();
            }
            return Ok(Contact);
        }        bool validationIsOk(string ContactProp)
        {
            return !string.IsNullOrEmpty(ContactProp);
        }
        [HttpPost]
        public IHttpActionResult CreateContact(ContactUs Contact)
        {
            if (!validationIsOk(Contact.Massage)) { return BadRequest(); }
            m_db.ContactUs.Add(Contact);
            m_db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = Contact.Id }, Contact);
        }        [HttpPut]
        public IHttpActionResult UpdateContactUs(int id, ContactUs Contact)
        {
            if (!validationIsOk(Contact.Subject)) { return BadRequest(); }
            ContactUs exsistingContact = m_db.ContactUs.Find(id);
            if (exsistingContact == null) { return NotFound(); }
            exsistingContact.Massage = Contact.Subject; exsistingContact.Subject = Contact.Subject;
            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }


        [HttpDelete]
        public IHttpActionResult DeleteContactUs(long id)
        {
            ContactUs Contact = m_db.ContactUs.Find(id);
            if (Contact == null)
            {
                return NotFound();
            }
            m_db.ContactUs.Remove(Contact);
            m_db.SaveChanges();
            return Ok(Contact);
        }
    }
}

