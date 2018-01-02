namespace restaurant_project.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleterow1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Reviews", "UserId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Reviews", "UserId", c => c.Int(nullable: false));
        }
    }
}
