namespace restaurant_project.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UsersEmail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Reviews", "UsersEmail", c => c.String());
            DropColumn("dbo.Reviews", "UsersId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Reviews", "UsersId", c => c.Int(nullable: false));
            DropColumn("dbo.Reviews", "UsersEmail");
        }
    }
}
