
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RallyRenovation.API.Models;

namespace RallyRenovation.API.Data;

public class AppDbContext: IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options): base(options) {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Follow>()
            .HasOne(i => i.FollowerUser)
            .WithMany(i => i.Followers)
            .HasForeignKey(i => i.FollowerUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Follow>()
            .HasOne(i => i.FollowingUser)
            .WithMany(i => i.Following)
            .HasForeignKey(i => i.FollowingUserId)
            .OnDelete(DeleteBehavior.Restrict);

    }

    public DbSet<Renovation> Renovations {get; set;}
    public DbSet<MessageThread> MessageThreads {get; set;}
    public DbSet<Message> Messages {get; set;}
    public DbSet<Comment> Comments {get; set;}
    public DbSet<Follow> Follows {get; set;}
    public DbSet<Like> Likes {get; set;}  

}