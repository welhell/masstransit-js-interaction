using System;

namespace Net.Events
{
    public interface ISomethingHappenNet
    {
        Guid Id { get; }

        Guid CommandId { get; }
        string SomeProperty { get; }
    }
}