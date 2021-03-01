using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Collaboration.Hubs
{
    public class CollaborationHub : Hub
    {
        public async Task SendComponent(object component)
        {
            await Clients.Others.SendAsync("ReceiveComponent", component);
        }

        public async Task SendInvoke(string outcomeId)
        {
            await Clients.Others.SendAsync("ReceiveInvoke", outcomeId);
        }
    }
}