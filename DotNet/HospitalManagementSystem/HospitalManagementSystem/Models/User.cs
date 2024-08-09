using System;
using System.Collections.Generic;

namespace HospitalManagementSystem.Models;

public partial class User
{
    public int UserId { get; set; }

    public int? RoleId { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public int Active {  get; set; }

    public virtual ICollection<Doctor>? Doctors { get; set; } = new List<Doctor>();

    public virtual ICollection<Patient>? Patients { get; set; } = new List<Patient>();

    public virtual Role? Role { get; set; }
}
