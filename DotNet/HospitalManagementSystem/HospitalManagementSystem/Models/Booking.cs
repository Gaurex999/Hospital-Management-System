using System;
using System.Collections.Generic;

namespace HospitalManagementSystem.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public int? DoctorId { get; set; }

    public int? PatientId { get; set; }

    public string? BookingStatus { get; set; }

    public int? SlotId { get; set; }

    public DateOnly? BookingDate { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Patient? Patient { get; set; }

    public virtual ICollection<Payment>? Payments { get; set; } = new List<Payment>();

    public virtual Slot? Slot { get; set; }
}
