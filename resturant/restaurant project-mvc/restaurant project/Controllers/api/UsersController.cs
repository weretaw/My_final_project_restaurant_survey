using restaurant_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace restaurant_project.Controllers.api
{
    [RoutePrefix("Users")]
    public class UsersController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();
       
        [HttpGet]
        public IEnumerable<Users> GetUsers()
        {
            return m_db.usersT;
        }
        [ScopeAuthorize("read:resource_servers")]
        [Route("")]
        [HttpGet]
        public IHttpActionResult GetUser(long id)
        {
            Users User = m_db.usersT.Find(id);
            if (User == null)
            {
                return NotFound();
            }
            return Ok(User);
        }

        [HttpGet]
        public IHttpActionResult GetAdmin(string email)
        {
            var user = GetUsers();
            foreach (var item in user)
            {
                if (item.Email == email)
                { if (item.Role == "Admin") { return Ok(true); } }
            }
            return Ok(false);
            }


        bool validationIsOk(string UserProp)
        {
            return !string.IsNullOrEmpty(UserProp);
        }

        [HttpPost]
        public IHttpActionResult CreateUser(Users user)
        {
            if (!validationIsOk(user.Email)) { return BadRequest(); }
            if (m_db.usersT.Any(o => o.Email == user.Email))
            {
                return Ok(User);
            }
            else {
                m_db.usersT.Add(user);
                m_db.SaveChanges();
                return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
            }
           
        }


        [HttpPut]
        public IHttpActionResult UpdateReview(int id, Users User)
        {
            if (!validationIsOk(User.Email)) { return BadRequest(); }
            Users exsistingUser = m_db.usersT.Find(id);
            if (exsistingUser == null) { return NotFound(); }
            exsistingUser.Email = User.Email;
            exsistingUser.Role = User.Role;
            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }


        [HttpDelete]
        public IHttpActionResult DeleteUser(long id)
        {
            Users User = m_db.usersT.Find(id);
            if (User == null)
            {
                return NotFound();
            }
            m_db.usersT.Remove(User);
            m_db.SaveChanges();
            return Ok(User);
        }
    }
}
