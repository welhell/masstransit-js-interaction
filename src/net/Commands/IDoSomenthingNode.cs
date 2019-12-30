using System;

namespace Net.Commands
{
    public interface IDoSomethingNode
    {
        Guid Id { get; }
        string SomeProperty { get; }
    }
}