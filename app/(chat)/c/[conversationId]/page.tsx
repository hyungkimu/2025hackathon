import { Chat } from "@/components/chat/Chat";
import { getMessagesByConversation } from "@/data/conversation";

type Props = {
  params: {
    conversationId: string;
  };
};

export default async function ConversationPage({
  params: { conversationId },
}: Props) {
  const messages = await getMessagesByConversation(conversationId);
  return <Chat initialMessages={messages} />;
}
