import { Component } from '@angular/core';
import { ChatService, ChatMessage } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  provider = 'perplexity'; // default
  model = 'sonar';         // default
  apiKey = '';             // user-provided API key

  userInput = '';
  messages: ChatMessage[] = [];

  isLoading = false;

  constructor(private chatService: ChatService) {}

  send() {
    if (!this.userInput.trim()) return;

    // Add user message to chat
    this.messages.push({ role: 'user', content: this.userInput });

    const payload: ChatMessage[] = [...this.messages];

    this.isLoading = true;

    this.chatService.sendMessage(this.provider, this.model, this.apiKey, payload)
      .subscribe({
        next: (res) => {
          const assistantReply = res?.choices?.[0]?.message?.content
            || res?.output || 'No response';
          this.messages.push({ role: 'assistant', content: assistantReply });
          this.isLoading = false;
          this.userInput = '';
        },
        error: (err) => {
          console.error(err);
          this.messages.push({ role: 'assistant', content: 'Error: ' + err.message });
          this.isLoading = false;
        }
      });
  }
}
