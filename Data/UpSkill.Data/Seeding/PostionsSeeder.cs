using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using UpSkill.Common;
using UpSkill.Data.Models;

namespace UpSkill.Data.Seeding
{
    internal class PostionsSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var positions = new List<Position>
            {
                new Position
                {
                    Name = GlobalConstants.GraphicDesignerPositionName
                },

                new Position
                {
                    Name = GlobalConstants.SoftwareDeveloperPositionName
                },

                new Position
                {
                    Name = GlobalConstants.SeniorSoftwareDeveloperPositionName
                },

                new Position
                {
                    Name = GlobalConstants.AdministratorPositionName
                },

                new Position
                {
                    Name = GlobalConstants.OwnerPositionName
                },
            };

            foreach (Position position in positions)
            {
                var dbPosition = await dbContext.Position.FirstOrDefaultAsync(x => x.Name == position.Name);

                if (dbPosition == null)
                {
                    await dbContext.Position.AddAsync(position);
                }               
            }
        }
    }
}
