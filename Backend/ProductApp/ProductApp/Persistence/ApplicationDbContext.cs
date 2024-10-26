﻿using Microsoft.EntityFrameworkCore;
using ProductApp.Models;

namespace ProductApp.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Product> Products { get; set; }

    }
}
