import type { Meta, StoryObj } from "@storybook/react";
import MessageChatGPTCard from "./MessageChatGPTCard";

const meta = {
  title: "Community Tasks/Message ChatGPT Card",
  component: MessageChatGPTCard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A recreation of the provided visual brief — a gradient hero card inviting the user to message ChatGPT. This implementation lives entirely in docs and is built with existing Vibe primitives."
      }
    }
  }
} satisfies Meta<typeof MessageChatGPTCard>;

export default meta;
type Story = StoryObj<typeof MessageChatGPTCard>;

export const MessageChatGPT: Story = {
  render: () => <MessageChatGPTCard />
};
