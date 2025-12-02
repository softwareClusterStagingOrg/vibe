import React from "react";
import { Avatar, Heading, Text } from "@vibe/core";
import { Email, Send, Sound, Video } from "@vibe/icons";
import styles from "./MessageChatGPTCard.module.scss";

const ACTION_ICON_SIZE = 20;

const quickActions = [
  { label: "Message", icon: Send },
  { label: "Call", icon: Sound },
  { label: "Video", icon: Video },
  { label: "Mail", icon: Email }
] as const;

const waveformHeights = [12, 24, 18, 32, 16, 28, 14, 30, 19, 26, 15, 22];

const MessageChatGPTCard = () => (
  <section className={styles.messageCard} aria-labelledby="message-chatgpt-heading">
    <div className={styles.glow} aria-hidden="true" />
    <div className={styles.leftPanel}>
      <Text type="text3" color="on-primary-color" weight="bold" className={styles.overline} ellipsis={false}>
        Message
      </Text>
      <Heading type="h1" className={styles.title} id="message-chatgpt-heading">
        ChatGPT
      </Heading>
      <Text type="text2" color="on-primary-color" className={styles.subtitle} ellipsis={false}>
        Keep Apple Intelligence and ChatGPT only a tap away. Launch a fresh idea, continue a thread, or share a thought
        right from your contact list.
      </Text>
      <div className={styles.actionsRow}>
        {quickActions.map(({ label, icon: IconComponent }) => (
          <button key={label} type="button" className={styles.actionButton} aria-label={label}>
            <IconComponent aria-hidden size={ACTION_ICON_SIZE} className={styles.actionIcon} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
    <div className={styles.deviceMock} aria-hidden="true">
      <div className={styles.posterCard}>
        <div className={styles.posterHeader}>
          <Avatar ariaLabel="ChatGPT avatar" text="GPT" customSize={56} withoutTooltip customBackgroundColor="var(--color-chili-blue)" />
          <div>
            <Heading type="h4" className={styles.posterTitle}>
              ChatGPT
            </Heading>
            <Text type="text3" color="secondary" ellipsis={false}>
              Always available
            </Text>
          </div>
        </div>
        <div className={styles.statusPill}>Trusted contact</div>
        <div className={styles.posterFooter}>
          <Text type="text4" color="secondary" ellipsis={false}>
            Last reply • 2m ago
          </Text>
          <div className={styles.signalDots}>
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className={styles.conversationCard}>
        <div className={styles.voiceBubble}>
          <Text type="text3" color="primary" ellipsis={false}>
            “Need help drafting tonight&apos;s agenda? I saved your last outline.”
          </Text>
        </div>
        <div className={styles.voicePreview}>
          {waveformHeights.map((height, index) => (
            <span key={`wave-${index}`} style={{ height: `${height}px`, animationDelay: `${index * 0.08}s` }} />
          ))}
        </div>
        <Text type="text4" color="secondary" align="right" ellipsis={false}>
          Listening live
        </Text>
      </div>
    </div>
  </section>
);

export default MessageChatGPTCard;
