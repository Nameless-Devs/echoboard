//package se.salt.echoboard.controller;
//
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
//import org.springframework.stereotype.Controller;
//import se.salt.echoboard.model.ChatRoom;
//
//@Controller
//public class ChatController {
//
//    @MessageMapping("/chat.sendMessage")
//    @SendTo("/topic/public")
//    public ChatRoom sendMessage(@Payload ChatRoom chatRoom) {
//        return chatRoom;
//    }
//
//    @MessageMapping("/chat.sendMessage")
//    @SendTo("/topic/public")
//    public ChatRoom addUser(@Payload ChatRoom chatRoom, SimpMessageHeaderAccessor headerAccessor){
//        headerAccessor.getSessionAttributes().put("username", chatRoom.getSender());
//        return chatRoom;
//    }
//
//}
