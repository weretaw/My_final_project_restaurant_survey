namespace restaurant_project.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newrow1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Reviews", "UserID", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Reviews", "UserID");
        }
    }
}
