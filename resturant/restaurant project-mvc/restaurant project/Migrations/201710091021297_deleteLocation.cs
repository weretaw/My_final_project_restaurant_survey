namespace restaurant_project.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleteLocation : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Restaurants", "Location");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Restaurants", "Location", c => c.String());
        }
    }
}
