using System;
using System.Collections.Generic;

namespace HospitalManagementSystem.Models;

public partial class Prescription
{
    public int PrescriptionId { get; set; }

    public int? DoctorId { get; set; }

    public int? PatientId { get; set; }

    public string? Description { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Patient? Patient { get; set; }
}
