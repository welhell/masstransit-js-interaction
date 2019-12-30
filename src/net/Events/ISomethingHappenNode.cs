using System;

namespace Net.Events
{
    public interface ISomethingHappenNode
    {
        Guid Id { get; }
        Guid CommandId { get; }
        string SomeProperty { get; }
    }
}