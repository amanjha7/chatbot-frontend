import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatsidebar',
  templateUrl: './chatsidebar.component.html',
  styleUrls: ['./chatsidebar.component.scss']
})
export class ChatsidebarComponent {
  @Input() allChats: any[] = [];
  @Input() openedChat: any;
  @Output() openedChatChange = new EventEmitter<any>();
  @Output() newChat = new EventEmitter<any>();

  constructor(private router: Router) {}

  isCreating = false;
  newChatTitle = '';

  openChat(chat: any) {
    this.openedChat = chat;
    this.openedChatChange.emit(chat?.chat_id);
  }

  formatDate(dateObj: any): string {
    try {
      const date = new Date(dateObj?.$date || dateObj);
      return date.toLocaleString();
    } catch {
      return '';
    }
  }

  startCreate() {
    this.isCreating = true;
    this.newChatTitle = '';
    // Delay focus until input is rendered
    setTimeout(() => {
      const input = document.getElementById('newChatInput') as HTMLInputElement;
      input?.focus();
    });
  }

  finishCreate() {
    const title = this.newChatTitle.trim();
    if (title) {
      this.newChat.emit(title);
    }
    this.isCreating = false;
    this.newChatTitle = '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
