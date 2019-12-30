using System;
using System.Threading.Tasks;
using MassTransit;
using Net.Consumers;
using Net.Commands;
namespace Net
{
    class Program
    {
        static Uri rabbitMqUri = new Uri("rabbitmq://localhost/");
        static Uri sendEndpointUri = new Uri("rabbitmq://localhost/node.client");
        static string receiveEndpoint = "net.client";
        static void Main(string[] args)
        {
            var busControl = CreateBusControl();
            busControl.Start();
            var sender = busControl.GetSendEndpoint(sendEndpointUri).Result;
            while (true)
            {
                var value = Console.ReadLine();
                if (value.Equals("exit", StringComparison.InvariantCultureIgnoreCase))
                {
                    break;
                }
                SendCommandAsync(sender).Wait();


            }
            busControl.Stop();
        }

        private static IBusControl CreateBusControl()
        {

            return Bus.Factory.CreateUsingRabbitMq(rabbit =>
            {
                rabbit.Host(rabbitMqUri, settings =>
                {
                    settings.Password("guest");
                    settings.Username("guest");
                });
                rabbit.ReceiveEndpoint(receiveEndpoint, e =>
               {
                   e.Consumer<DoSomethingNetConsumer>();
                   e.Consumer<SomethingHappenNetConsumer>();
               });
            });
        }

        private async static Task SendCommandAsync(ISendEndpoint sender)
        {
            var id = Guid.NewGuid();
            Console.WriteLine($"Sending message with Id :{id}");

            await sender.Send<IDoSomethingNode>(new
            {
                Id = id,
                SomeProperty = "From Net"
            });
        }
    }
}
