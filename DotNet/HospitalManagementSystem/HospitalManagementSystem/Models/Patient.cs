using System;
using System.Collections.Generic;

namespace HospitalManagementSystem.Models;

public partial class Patient
{
    public int PatientId { get; set; }

    public int? UserId { get; set; }

    public string? PatientName { get; set; }

    public string? DateOfBirth { get; set; }

    public string? BloodGroup { get; set; }

    public string? PatientAddress { get; set; }

    public string? PatientAadharNo { get; set; }

    public string? PatientEmailId { get; set; }

    public double? PatientContactNo { get; set; }

    public virtual ICollection<Booking>? Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<Payment>? Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Prescription>? Prescriptions { get; set; } = new List<Prescription>();

    public virtual ICollection<Report>? Reports { get; set; } = new List<Report>();

    public virtual User? User { get; set; }
}
