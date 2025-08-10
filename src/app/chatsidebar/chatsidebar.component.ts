import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chatsidebar',
  templateUrl: './chatsidebar.component.html',
  styleUrls: ['./chatsidebar.component.scss']
})
export class ChatsidebarComponent {
  @Input() allChats: any[] = [];
  @Input() openedChat: any;
  @Output() openedChatChange = new EventEmitter<any>();

  openChat(chat: any) {
    this.openedChat = chat;
    this.openedChatChange.emit(chat?.chat_id);
  }

  formatDate(dateObj: any): string {
    try {
      const date = new Date(dateObj?.$date || dateObj);
      return date.toLocaleString(); // Matches JS's new Date().toString() style but localized
    } catch {
      return '';
    }
  }
}
