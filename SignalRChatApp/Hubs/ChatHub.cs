using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChatApp.Hubs
{
    public class ChatHub : Hub
    {
        public  async Task SendMessage(string user,string message)
        {
            await Clients.All.SendAsync("ReceiveMessage",user,message);
        }

        public  async Task SendToUser(string user,string receiverConnectionId,string message)
        {
            await Clients.Client(receiverConnectionId).SendAsync("ReceiveMessage", user,message);
        }

        public string GetConnection() => Context.ConnectionId;
    }
}
