﻿using System;
using System.Collections.Generic;

namespace TodoApi;

public partial class XSchemaTableStatistic
{
    public string? TableSchema { get; set; }

    public string? TableName { get; set; }

    public ulong TotalLatency { get; set; }

    public ulong RowsFetched { get; set; }

    public ulong FetchLatency { get; set; }

    public ulong RowsInserted { get; set; }

    public ulong InsertLatency { get; set; }

    public ulong RowsUpdated { get; set; }

    public ulong UpdateLatency { get; set; }

    public ulong RowsDeleted { get; set; }

    public ulong DeleteLatency { get; set; }

    public decimal? IoReadRequests { get; set; }

    public decimal? IoRead { get; set; }

    public decimal? IoReadLatency { get; set; }

    public decimal? IoWriteRequests { get; set; }

    public decimal? IoWrite { get; set; }

    public decimal? IoWriteLatency { get; set; }

    public decimal? IoMiscRequests { get; set; }

    public decimal? IoMiscLatency { get; set; }
}
