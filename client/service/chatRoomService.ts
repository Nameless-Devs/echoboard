import { Client, IMessage, Stomp } from "@stomp/stompjs";

function subscribeToUserChatRooms(
  newClient: Client,
  listChatIds: number[],
  onMessageReceived: (message: IMessage) => void
) {
    for (let index = 0; index < listChatIds.length; index++) {
        console.log(index);
        newClient.subscribe("/topic/chatrooms/" + listChatIds[index], (message) => {
            onMessageReceived(message);
            console.log(message);
        });
        
    }
    
  return newClient;
}

export default subscribeToUserChatRooms
