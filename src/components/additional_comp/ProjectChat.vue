<template>
    <div class="chat-container">
      <div class="messages-container" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <span class="sender">{{ message.author.surname }} {{ message.author.name }}</span>
          <span class="text">{{ message.text }}</span>
        </div>
      </div>
      <div class="input-container">
        <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Введите сообщение...">
        <button @click="sendMessage">Отправить</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        messages: [],
        newMessage: ''
      };
    },
    methods: {
      async sendMessage() {
        if (this.newMessage.trim() !== '') {
          try {
            // Отправка сообщения на сервер
            await axios.post('/api/project/addMessage', {
                text: this.newMessage.trim()
                }, {
                headers: {
                    'authorization': `Bearer ${localStorage.access_token}`,
                    'projectid': localStorage.proj_id
                }
            });
  
            // Получение обновленного списка сообщений
            await this.fetchMessages();
  
            // Прокрутка вниз, чтобы показать новое сообщение
            this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
  
            // Очистка поля ввода
            this.newMessage = '';
          } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
          }
        }
      },
      async fetchMessages() {
        try {
          // Получение списка сообщений с сервера
          const response = await axios.get('/api/project/getMessages', {
                headers: {
                'authorization': `Bearer ${localStorage.access_token}`,
                'projectid': localStorage.proj_id
                }
            });
          this.messages = response.data;
        } catch (error) {
          console.error('Ошибка загрузки сообщений:', error);
        }
      }
    },
    mounted() {
      // При загрузке компонента получаем список сообщений
      this.fetchMessages();
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 80%;
    border: 1px solid #ccc;
    border-radius: 2%;
    box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 15%);
    padding: 10px;
    background-color: #ecd9d93e;
  }
  
  .messages-container {
    flex-grow: 1;
    overflow-y: auto;
    
  }
  
  .message {
    margin-bottom: 10px;
    margin-left: 5px;
    padding: 8px;
    margin-bottom: 10px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 35%;
    font-size: small;
  }
  
  .sender {
    font-weight: bold;
    margin-right: 5px;
  }
  
  .input-container {
    display: flex;
  }
  
  .input-container input {
    flex-grow: 1;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
  }
  
  .input-container button {
    flex-shrink: 0;
  }
  </style>
  