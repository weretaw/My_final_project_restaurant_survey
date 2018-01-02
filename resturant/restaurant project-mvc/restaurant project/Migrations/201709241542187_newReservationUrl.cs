namespace restaurant_project.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newReservationUrl : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Restaurants", "ReservationUrl", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Restaurants", "ReservationUrl");
        }
    }
}
