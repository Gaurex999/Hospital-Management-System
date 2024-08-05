using System;
using System.Collections.Generic;

namespace HospitalManagementSystem.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? BookingId { get; set; }

    public int? PatientId { get; set; }

    public int? Amount { get; set; }

    public virtual Booking? Booking { get; set; }

    public virtual Patient? Patient { get; set; }
}
