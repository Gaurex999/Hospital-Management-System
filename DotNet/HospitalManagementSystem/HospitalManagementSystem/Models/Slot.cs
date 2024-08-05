using System;
using System.Collections.Generic;

namespace HospitalManagementSystem.Models;

public partial class Slot
{
    public int SlotId { get; set; }

    public int? DoctorId { get; set; }

    public string? SlotName { get; set; }

    public DateOnly? SlotDate { get; set; }

    public string? StartTime { get; set; }

    public string? EndTime { get; set; }

    public virtual ICollection<Booking>? Bookings { get; set; } = new List<Booking>();

    public virtual Doctor? Doctor { get; set; }
}
