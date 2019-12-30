using System;
using System.Threading.Tasks;
using MassTransit;
using Net.Events;

namespace Net.Consumers
{
    public class SomethingHappenNetConsumer : IConsumer<ISomethingHappenNet>
    {

        public async Task Consume(ConsumeContext<ISomethingHappenNet> context)
        {
            await Console.Out.WriteLineAsync($"Id: {context.Message.Id}");
            await Console.Out.WriteLineAsync($"CommandId: {context.Message.CommandId}");
            await Console.Out.WriteLineAsync($"SomeProperty: {context.Message.SomeProperty}");
        }
    }
}