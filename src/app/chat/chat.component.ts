import { Component, ElementRef, ViewChild, AfterViewChecked, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChatService, ChatMessage } from '../chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked, OnChanges {
  provider = '';
  model = '';
  apiKey = '';
  userInput = '';
  messages: any = [];
  isLoading = false;
  showSettings = false;
  hideApiKey = true;
  @Input() openedChat:any = ''

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor(
    private chatService: ChatService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['openedChat'] && changes['openedChat'].currentValue) {
      this.updateMessages();
    }
  }

  private updateMessages() {
    this.chatService.getMessageOfChat(this.openedChat)
      .pipe(take(1))
      .subscribe({
        next: (messages) => {
          if(messages?.length)
            this.messages = messages[0].message
          else this.messages = []
        },
        error: (err) => this.snackBar.open('Failed to load messages', 'Close', { duration: 3000 })
      });
  }


  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  send(event?: any) {
    if (event && !event.shiftKey) {
      event.preventDefault();
    }
    
    if (!this.userInput.trim() || this.isLoading) return;

    const userMessage = {
      role: 'user',
      content: this.userInput,
      timestamp: new Date()
    };
    this.messages = [...this.messages, userMessage];
    this.isLoading = true;
    this.userInput = '';

    this.chatService.sendMessage(this.provider, this.model, this.apiKey, this.messages, this.openedChat)
      .subscribe({
        next: (res) => {
          const content = res?.choices?.[0]?.message?.content || 
                          res?.output || 
                          'No response from the AI';
          this.messages = [
            ...this.messages, 
            {
              role: 'assistant',
              content: content,
              timestamp: new Date()
            }
          ];
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open(`Error: ${err.error?.message || err.message}`, 'Dismiss', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.isLoading = false;
        }
      });
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = 
        this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { 
      console.error(err);
    }
  }
}