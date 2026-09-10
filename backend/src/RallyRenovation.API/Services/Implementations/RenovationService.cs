
using Microsoft.EntityFrameworkCore;
using RallyRenovation.API.Data;
using RallyRenovation.API.DTO;
using RallyRenovation.API.Models;
using RallyRenovation.API.Utilities;

namespace RallyRenovation.API.Services.Implementations;

public class RenovationService : IRenovationService
{
    private readonly AppDbContext _context;
    public RenovationService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<Result<List<Renovation>>> GetPublicFilteredRenovations(int page, int pageSize)
    {
        if (page < 1 || pageSize < 1)
            return Result<List<Renovation>>.Fail("Error: GetFilteredRenovationByUser: filters passed in were off");

        var renovations = _context.Renovations
            .AsNoTracking();

        var result = await renovations.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return Result<List<Renovation>>.Ok(result);
    }

    public async Task<Result<List<Renovation>>> GetFilteredRenovationsByUser(string userId, int page, int pageSize)
    {
        if (page < 1 || pageSize < 1)
            return Result<List<Renovation>>.Fail("Error: GetFilteredRenovationByUser: filters passed in were off");

        var renovations = _context.Renovations
            .AsNoTracking()
            .Where(i => i.UserId == userId);

        var result = await renovations.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return Result<List<Renovation>>.Ok(result);
    }

    public async Task<Result<Renovation>> GetRenovation(int id)
    {
        var renovation = await _context.Renovations
            .AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == id);

        if (renovation == null)
            return Result<Renovation>.Fail($"Error: GetRenovation: renovation with id {id} not found");

        return Result<Renovation>.Ok(renovation);
    }

    public async Task<Result> AddRenovation(AddRenovationDto dto)
    {
        if (dto == null || dto.UserId == null)
            return Result.Fail("Error: AddRenovation, dto or userId was missing.");

        Renovation renovation = new Renovation
        {
            UserId = dto.UserId,
            Title = dto.Title,
            Description = dto.Description,
            IsPrivate = dto.IsPrivate,
            CatagoryList = dto.CatagoryList,
            Cost = dto.Cost,
            TotalDays = dto.TotalDays,
            Company = dto.Company,
            BeforeImageList = dto.BeforeImageList,
            AfterImageList = dto.AfterImageList,
            TimeStamp = dto.TimeStamp
        };
        await _context.Renovations.AddAsync(renovation);
        await _context.SaveChangesAsync();

        return Result.Ok();
    }

    public async Task<Result> UpdateRenovation(int id, AddRenovationDto dto)
    {
        var result = await GetRenovation(id);
        if (!result.IsSuccess || result.Value == null)
            return Result.Fail("Error: UpdateRenovation. Couldnt get renovation");

        result.Value.Title = dto.Title;
        result.Value.Description = dto.Description;
        result.Value.IsPrivate = dto.IsPrivate;
        result.Value.CatagoryList = dto.CatagoryList;
        result.Value.Cost = dto.Cost;
        result.Value.TotalDays = dto.TotalDays;
        result.Value.Company = dto.Company;
        result.Value.BeforeImageList = dto.BeforeImageList;
        result.Value.AfterImageList = dto.AfterImageList;

        await _context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<Result> DeleteRenovation(int id)
    {
        var result = await GetRenovation(id);
        if (!result.IsSuccess || result.Value == null)
            return Result.Fail("Error: UpdateRenovation. Couldnt get renovation");

        _context.Remove(result.Value);
        await _context.SaveChangesAsync();

        return Result.Ok();
    }

}