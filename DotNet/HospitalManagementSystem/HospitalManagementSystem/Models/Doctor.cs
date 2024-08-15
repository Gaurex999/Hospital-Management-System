using System;
using System.Collections.Generic;

namespace HospitalManagementSystem.Models;

public partial class Doctor
{
    public int DoctorId { get; set; }

    public int? UserId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Address { get; set; }

    public string? Qualification { get; set; }

    public double? ContactNo { get; set; }

    public string? EmailId { get; set; }

    public double? AadharNo { get; set; }

    public int? DepartmentId { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual Department? Department { get; set; }

    public virtual ICollection<Prescription>? Prescriptions { get; set; } = new List<Prescription>();

    public virtual ICollection<Slot>? Slots { get; set; } = new List<Slot>();

    public virtual User? User { get; set; }
}
