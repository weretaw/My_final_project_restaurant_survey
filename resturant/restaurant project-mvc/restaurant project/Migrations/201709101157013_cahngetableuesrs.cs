namespace restaurant_project.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class cahngetableuesrs : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Users", "UserName");
            DropColumn("dbo.Users", "Password");
            DropColumn("dbo.Users", "EmailConfirmation");
            DropColumn("dbo.Users", "Role");
            DropColumn("dbo.Users", "RegistrationDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Users", "RegistrationDate", c => c.Int(nullable: false));
            AddColumn("dbo.Users", "Role", c => c.String());
            AddColumn("dbo.Users", "EmailConfirmation", c => c.String());
            AddColumn("dbo.Users", "Password", c => c.Int(nullable: false));
            AddColumn("dbo.Users", "UserName", c => c.String());
        }
    }
}
