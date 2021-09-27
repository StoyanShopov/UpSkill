namespace UpSkill.Data.Seeding
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Models;

    using static UpSkill.Common.GlobalConstants.PositionsNamesConstants;

    internal class PositionsSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var positionsNames = new List<string>()
            {
                GraphicDesignerPositionName,
                SoftwareDeveloperPositionName,
                SeniorSoftwareDeveloperPositionName,
                AdministratorPositionName,
                OwnerPositionName
            };

            var positions = new List<Position>();

            foreach (string positionName in positionsNames)
            {
                var newPosition = new Position
                {
                    Name = positionName
                };

                positions.Add(newPosition);
            }

            foreach (Position position in positions)
            {
                var dbPosition = await dbContext.Positions.FirstOrDefaultAsync(x => x.Name == position.Name);

                if (dbPosition == null)
                {
                    await dbContext.Positions.AddAsync(position);
                }
            }
        }
    }
}
