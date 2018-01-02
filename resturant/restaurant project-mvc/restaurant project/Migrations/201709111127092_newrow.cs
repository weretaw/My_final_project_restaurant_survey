namespace restaurant_project.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newrow : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Restaurants", "Area", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Restaurants", "Area");
        }
    }
}
