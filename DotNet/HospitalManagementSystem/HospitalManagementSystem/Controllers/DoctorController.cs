using HospitalManagementSystem.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementSystem.Controllers
{
    [Route("api/[controller]/[Action]")]
    [EnableCors]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        [HttpGet("GetAllDoctors")]
        public IActionResult GetAllDoctors()
        {
            using (var db = new HospitalSystemContext())
            {
                // Fetch all doctors along with their associated user and role information
                var doctors = db.Doctors
                    .Include(d => d.User)  // Include related User
                    .ThenInclude(u => u.Role) // Include related Role of User
                    .Select(d => new
                    {
                        d.DoctorId,
                        d.FirstName,
                        d.LastName,
                        d.Address,
                        d.Qualification,
                        d.ContactNo,
                        d.EmailId,
                        d.AadharNo,
                        d.DepartmentId,
                        User = new
                        {
                            d.User.UserId,
                            d.User.UserName,
                            d.User.Active,
                            Role = new
                            {
                                d.User.Role.RoleId,
                                d.User.Role.RoleName
                            }
                        }
                    })
                    .ToList();

                return Ok(doctors);
            }
        }

        [HttpPost("DocInsert")]
        public IActionResult InsertDoctor(Doctor doctor)
        {
            if (doctor == null)
            {
                return BadRequest("Patient data is required.");
            }

            if (doctor.User != null)
            {
                doctor.User.Password = BCrypt.Net.BCrypt.HashPassword(doctor.User.Password);
            }

            using (var db = new HospitalSystemContext())
            {
                db.Doctors.Add(doctor);
                db.SaveChanges();
            }

            return Ok(doctor);
        }



        [HttpPost]
        public IActionResult UpdateVerifyLogin([FromBody] User log)
        {
            if (log == null)
            {
                return BadRequest("Invalid login data.");
            }

            using (var db = new HospitalSystemContext())
            {
                var logdb = db.Users
                              .Include(u => u.Role)
                              .FirstOrDefault(u => u.UserName == log.UserName);

                if (logdb != null)
                {
                    if (BCrypt.Net.BCrypt.Verify(log.Password, logdb.Password))
                    {
                        // Return the user with role and other necessary details
                        return Ok(new
                        {
                            logdb.UserId,
                            logdb.UserName,
                            logdb.RoleId,
                            logdb.Role.RoleName
                        });
                    }
                    else
                    {
                        return Unauthorized("Invalid password.");
                    }
                }
                else
                {
                    return NotFound("User not found.");
                }
            }
        }


    }
}

