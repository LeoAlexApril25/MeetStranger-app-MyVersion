import React from "react";
import { StyleSheet } from "react-native";
import { ChatBubble as DSChatBubble} from "../design-system";
import { ChatMessage as ChatMessageType } from "../constants/types";

interface ChatBubbleProps {
    message: ChatMessageType;
}

export function ChatMessage({ message }: ChatBubbleProps){
     const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
     }
     return (
        <DSChatBubble
             message={message.text}
             position={message.isUser ? 'right' : 'left'}
             timestamp={formatTime(message.timestamp)}
             username={message.UserName}
             showUsername={!message.isUser}
        />
     )
}