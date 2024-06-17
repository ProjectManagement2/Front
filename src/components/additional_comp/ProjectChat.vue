<template>
  <div class="chat">
    <div class="filter-container">
      <select class="slct-type" v-model="selectedType" @change="fetchMessages">
        <option value="">Все типы</option>
        <option value="Сообщение">Сообщение</option>
        <option value="Уведомление">Уведомление</option>
      </select>
      <select class="slct-stage" v-model="selectedStage" @change="fetchMessages">
        <option value="">Все стадии</option>
        <option v-for="stage in stages" :key="stage" :value="stage">{{ stage }}</option>
      </select>
      <b-button class="btn-delete-messages" @click="deleteAllMessages">Удалить все сообщения</b-button>
    </div>
    <div class="chat-container">
      <div class="messages-container" ref="messagesContainer">
        <div v-for="(message, index) in filteredMessages" :key="index" class="message">
          <span class="sender">{{ message.author.surname }} {{ message.author.name }}</span>
          <span class="text">{{ message.text }}</span>
          <span class="text-data">{{ formatDate(message.timestamp) }}</span>
        </div>
      </div>
      <div class="input-container">
        <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Введите сообщение...">
        <button @click="sendMessage">Отправить</button>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      selectedType: '',
      selectedStage: '',
      stages: ['Все сообщения', 'Этап 1', 'Этап 2', 'Этап 3'] // Пример этапов, их нужно загрузить из вашего источника данных
    };
  },
  computed: {
    filteredMessages() {
      return this.messages.filter(message => {
        return (!this.selectedType || message.type === this.selectedType) &&
          (!this.selectedStage || this.selectedStage === 'Все сообщения' || message.stage === this.selectedStage);
      });
    }
  },
  methods: {
    deleteAllMessages() {
      axios
        .delete("/api/project/deleteMessages", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
            projectid: localStorage.proj_id,
          },
        })
        .then(() => {
          window.location.reload();
          this.$toast.success("Все сообщения удалены", {
            position: "top-right",
            timeout: 7000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        })
        .catch((error) => {
          this.handleError(error);
        });
    },
    handleError(error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        this.$toast.error(error.response.data.message, {
          position: "top-right",
          timeout: 7000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
      } else {
        this.$toast.error("Неизвестная ошибка");
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        try {
          await axios.post('/api/project/addMessage', {
            text: this.newMessage.trim(),
            stage: this.selectedStage
          }, {
            headers: {
              'authorization': `Bearer ${localStorage.access_token}`,
              'projectid': localStorage.proj_id
            }
          });

          await this.fetchMessages();
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
          this.newMessage = '';
        } catch (error) {
          console.error('Ошибка отправки сообщения:', error);
        }
      }
    },
    async fetchMessages() {
      try {
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
    },
    formatDate(dateString) {
      const dateObject = new Date(dateString);
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`;
    }
  },
  mounted() {
    this.fetchMessages();
  }
};

</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.filter-container {
  margin-bottom: 10px;
  display: flex;
  justify-content: right;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 2%;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 15%);
  padding: 10px;
  background-color: rgba(168, 205, 234, 0.34);
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

.text-data {
  font-size: 10px;
  margin-top: 4px;
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

.slct-stage {
  margin-left: 10px;
}

.btn-delete-messages {
  color: rgb(67, 67, 67) !important;
  background-color: rgb(168, 205, 234) !important;
  border-color: rgb(168, 205, 234) !important;
  height: 32px;
  padding-top: 3px;
  margin-left: 10px;
}
</style>