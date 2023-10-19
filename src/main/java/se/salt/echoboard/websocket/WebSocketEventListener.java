//package se.salt.echoboard.websocket;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.messaging.SessionDisconnectEvent;
//import se.salt.echoboard.model.ChatRoom;
//import se.salt.echoboard.model.Message;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class WebSocketEventListener {
//
//    private final SimpMessageSendingOperations messageSendingOperations;
//
//    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//        String userName = (String) headerAccessor.getSessionAttributes().get("username");
//
//        if (userName != null) {
//            log.info("user disconnected {}", userName);
//            var chatMessage = ChatRoom.builder().type(Message.LEAVER)
//                    .sender(userName)
//                    .build();
//            messageSendingOperations.convertAndSend("/topic/public", chatMessage);
//        }
//    }
//}
