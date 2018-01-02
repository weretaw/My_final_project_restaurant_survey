using restaurant_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace restaurant_project.Controllers.api
{
    [RoutePrefix("Restaurants")]
    public class RestaurantsController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();
        [HttpGet]
        public IEnumerable<Restaurants> GetRestaurants()
        {
            return m_db.Restaurants;
        }        [ScopeAuthorize("read:resource_servers")]
        [Route("")]        [HttpGet]
        public IHttpActionResult GetRestaurant(long id)
        {
            Restaurants Restaurant = m_db.Restaurants.Find(id);
            if (Restaurant == null)
            {
                return NotFound();
            }
            return Ok(Restaurant);
        }        [HttpGet]        public IEnumerable <Restaurants> GetRestaurantsByArea(string Area)
        {
            var resturants = from res in m_db.Restaurants
                             where res.Area == Area
                             select res;

            return resturants;
        }        [HttpGet]        public IEnumerable<Restaurants> GetRestaurantsByCategory(string Category)
        {
            var resturants = from res in m_db.Restaurants
                             where res.Category == Category
                             select res;

            return resturants;
        }

        [HttpGet]        public IEnumerable<Restaurants> GetReviewsByName(string RestaurantName)
        {
            var Restaurants = from rev in m_db.Restaurants
                              where rev.Name == RestaurantName
                          select rev;

            return Restaurants;
        }        bool validationIsOk(string RestaurantProp)
        {
            return !string.IsNullOrEmpty(RestaurantProp);
        }
        [HttpPost]
        public IHttpActionResult CreateRestaurant(Restaurants Restaurant)
        {
            if (!validationIsOk(Restaurant.Name) || !validationIsOk(Restaurant.Area) || !validationIsOk(Restaurant.Category)) { return BadRequest(); }
            m_db.Restaurants.Add(Restaurant);
            m_db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = Restaurant.ID }, Restaurant);
        }        [HttpPut]
        public IHttpActionResult UpdateRestaurant(int id, Restaurants Restaurant)
        {
            if (!validationIsOk(Restaurant.Name) || !validationIsOk(Restaurant.Area) || !validationIsOk(Restaurant.Category)) { return BadRequest(); }
            Restaurants exsistingRestaurant = m_db.Restaurants.Find(id);
            if (exsistingRestaurant == null) { return NotFound(); }
            exsistingRestaurant.Name = Restaurant.Name;
            exsistingRestaurant.Area = Restaurant.Area;
            exsistingRestaurant.NumberOfRatings = Restaurant.NumberOfRatings;
            exsistingRestaurant.Rating = Restaurant.Rating;
            exsistingRestaurant.Category = Restaurant.Category;
            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.Created);
        }


        [HttpDelete]
        public IHttpActionResult DeleteRestaurant(long id)
        {
            Restaurants Restaurant = m_db.Restaurants.Find(id);
            if (Restaurant == null)
            {
                return NotFound();
            }
            m_db.Restaurants.Remove(Restaurant);
            m_db.SaveChanges();
            return Ok(Restaurant);
        }
    }
}
