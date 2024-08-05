using System;
using System.Collections.Generic;

namespace HospitalManagementSystem.Models;

public partial class Report
{
    public int ReportId { get; set; }

    public int? PatientId { get; set; }

    public string? Url { get; set; }

    public virtual Patient? Patient { get; set; }
}
