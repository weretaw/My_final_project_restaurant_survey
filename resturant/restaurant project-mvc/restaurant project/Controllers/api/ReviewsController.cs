using restaurant_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace restaurant_project.Controllers.api
{
    [RoutePrefix("Reviews")]
    public class ReviewsController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();
        
        [HttpGet]
        public IEnumerable<Reviews> GetReviews()
        {
            return m_db.Reviews;
        }        [ScopeAuthorize("read:resource_servers")]
        [Route("")]        [HttpGet]
        public IHttpActionResult GetReview(long id)
        {
            Reviews Review = m_db.Reviews.Find(id);
            if (Review == null)
            {
                return NotFound();
            }
            return Ok(Review);
        }

        bool validationIsOk(string ReviewProp)
        {
            return !string.IsNullOrEmpty(ReviewProp);
        }        int avgScore;
        int allReviewRate;

        public static int rating(int rate)
        {
            int sumReviews = 1;
            if(rate <= 10) { sumReviews = 1; }
            if(rate >= 25) { sumReviews = 2; }
            if(rate >= 50) { sumReviews = 3; }
            if(rate >= 75) { sumReviews = 4; }
            if(rate >= 100) { sumReviews = 5; }
            return sumReviews;
        }


        [HttpPost]
        public IHttpActionResult CreateReview(Reviews Review)
        {
            if (!validationIsOk(Review.Review)) { return BadRequest(); }
            m_db.Reviews.Add(Review);
            m_db.SaveChanges();

            IEnumerable<Reviews> AllReviews;
            AllReviews = GetReviews();
            foreach (var item in AllReviews)
            {
                if (item.RestaurantName == Review.RestaurantName) { allReviewRate += Review.Rate; }
            }
            avgScore = rating(allReviewRate);

            Restaurants dbEntry = m_db.Restaurants.FirstOrDefault(acc => acc.Name == Review.RestaurantName);
            dbEntry.NumberOfRatings++;
            dbEntry.Rating = avgScore;
            m_db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = Review.Id }, Review);
        }        [HttpPut]
        public IHttpActionResult UpdateReview(int id, Reviews Review)
        {
            if (!validationIsOk(Review.Review)) { return BadRequest(); }
            Reviews exsistingReview = m_db.Reviews.Find(id);
            if (exsistingReview == null) { return NotFound(); }
            exsistingReview.Rate = Review.Rate; exsistingReview.Review = Review.Review; 
            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }


        [HttpDelete]
        public IHttpActionResult DeleteUser(long id)
        {
            Reviews Review = m_db.Reviews.Find(id);
            if (Review == null)
            {
                return NotFound();
            }
            m_db.Reviews.Remove(Review);
            m_db.SaveChanges();
            return Ok(Review);
        }
    }
}
