namespace restaurant_project.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newcanges : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Reviews", "UsersId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Reviews", "UsersId");
        }
    }
}
