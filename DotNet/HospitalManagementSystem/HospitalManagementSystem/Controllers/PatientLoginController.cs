using HospitalManagementSystem.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementSystem.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors]
    [ApiController]
    public class PatientLoginController : ControllerBase
    {

        [HttpGet("getAllPatients")]
        public IActionResult getAllPatients()
        {
            using (var db = new HospitalSystemContext())
            {
                var users = db.Users.Select(u => new
                {
                    u.UserId,
                    u.UserName,
                    u.Active,
                    Role = new { u.Role.RoleName },
                    Patients = u.Patients.Select(p => new
                    {
                        p.PatientId,
                        p.PatientName,
                        p.DateOfBirth
                    }).ToList()
                }).ToList();

                return Ok(users);
            }
        }



        [HttpPost("validate")]
        public object validate( UidAndPwd obj)
        {
            using (var db = new HospitalSystemContext()) 
            {
                User PatientLogin = db.Users.Include(o => o.Role).Include(o => o.Patients).Where(o => o.UserName.Equals(obj.uname)).FirstOrDefault();
                if (PatientLogin == null) return new Error("Enter valid username");
                if (PatientLogin.Active == 0) return new Error("This account is currently suspended");
                if (PatientLogin != null && PatientLogin.Password.Equals(obj.pwd)) return PatientLogin;
                return new Error("Enter Valid Password");
            }
        }

        [HttpPost("Insert")]
        public IActionResult SavePatient(Patient patient)
        {
            if (patient == null)
            {
                return BadRequest("Patient data is required.");
            }

            // Assuming the patient.User.Password is part of the Patient model
            if (patient.User != null)
            {
                patient.User.Password = BCrypt.Net.BCrypt.HashPassword(patient.User.Password);
            }

            using (var db = new HospitalSystemContext())
            {
                db.Patients.Add(patient);
                db.SaveChanges();
            }

            return Ok(patient);
        }



    }
}
