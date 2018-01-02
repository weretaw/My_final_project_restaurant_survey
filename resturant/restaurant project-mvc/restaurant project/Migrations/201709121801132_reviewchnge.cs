namespace restaurant_project.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class reviewchnge : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Reviews", "RestaurantName", c => c.String());
            AddColumn("dbo.Reviews", "Category", c => c.String());
            AddColumn("dbo.Reviews", "Area", c => c.String());
            DropColumn("dbo.Reviews", "UserID");
            DropColumn("dbo.Reviews", "RestaurantID");
            DropColumn("dbo.Reviews", "DateOfReview");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Reviews", "DateOfReview", c => c.Int(nullable: false));
            AddColumn("dbo.Reviews", "RestaurantID", c => c.Int(nullable: false));
            AddColumn("dbo.Reviews", "UserID", c => c.Int(nullable: false));
            DropColumn("dbo.Reviews", "Area");
            DropColumn("dbo.Reviews", "Category");
            DropColumn("dbo.Reviews", "RestaurantName");
        }
    }
}
