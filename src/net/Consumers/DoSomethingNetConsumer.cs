using System;
using System.Threading.Tasks;
using MassTransit;
using Net.Commands;
using Net.Events;
namespace Net.Consumers
{
    public class DoSomethingNetConsumer : IConsumer<IDoSomethingNet>
    {

        public async Task Consume(ConsumeContext<IDoSomethingNet> context)
        {
            await Console.Out.WriteLineAsync($"Id: {context.Message.Id}");
            await Console.Out.WriteLineAsync($"SomeProperty: {context.Message.SomeProperty}");
            await this.PublishSomentingHappen(context);
        }


        private async Task PublishSomentingHappen(ConsumeContext<IDoSomethingNet> context)
        {

            await context.Publish<ISomethingHappenNode>(new
            {
                Id = Guid.NewGuid(),
                CommandId = context.Message.Id,
                SomeProperty = "From Net"
            });
        }
    }
}