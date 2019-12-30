using System;

namespace Net.Commands
{
    public interface IDoSomethingNet
    {
        Guid Id { get; }
        string SomeProperty { get; }
    }
}