<template>
    <div v-if="localIsVisible" id="add" class="w-75 mx-auto border p-3 rounded">
      <b-form @submit.prevent="deleteOrg">
        <h3 class="name-form">Удаление организаций</h3>
        <div class="row">
          <div class="col">
            <div class="row form-group">
              <label>Выберете организацию, которую хотите удалить:</label>
              <select class="select-deleteorganization" v-model="form.OrgId" @change="selectOrg">
                <option v-for="post in posts" :key="post._id" :value="post._id">
                  {{ post.name }}
                </option>
            </select>
            </div>
          </div>
        </div>
        <b-button variant="primary" class="btn-close-org-delete" type="submit">Удалить</b-button>
        <b-button variant="primary" class="btn-close-org-delete" @click="closeForm">Закрыть</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        posts: [],
        form: {
          OrgId: ""
        }
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      deleteOrg() {
        if (this.form.OrgId) {
          axios
            .delete("/api/admin/deleteOrganization", {
              headers: {
                'authorization': `Bearer ${localStorage.access_token}`,
                'organizationId': this.form.OrgId
              }
            })
            .then(() => {
              window.location.reload();
              this.$toast.success("Организация удалена", {
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
                rtl: false
              });
            })
            .catch((error) => {
              this.handleError(error);
            });
        } else {
          this.$toast.error('Организация не выбрана', {
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
            rtl: false
          });
        }
      },
      selectOrg() {
        console.log('Выбрана организация с ID:', this.form.OrgId);
      },
      fetchData() {
        axios
          .get('/api/admin/getOrganizations', {
            headers: {
              'authorization': `Bearer ${localStorage.access_token}`
            }
          })
          .then((response) => {
            this.posts = response.data
          })
          .catch((error) => {
            this.handleError(error);
          });
      },
      handleError(error) {
        if (error.response && error.response.data && error.response.data.message) {
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
            rtl: false
          });
        } else {
          this.$toast.error('Неизвестная ошибка');
        }
      },
      closeForm() {
        this.$emit('close');
      }
      
    },
    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
        localIsVisible() {
            return this.isVisible;
        }
    }
  };
  </script>
  
<style>
  #add{
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 13px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  }
  .name-form{
    font-size: 18px;
    margin: 5px;
    margin-bottom: 15px;
  }
  .btn-close-org-delete{
    margin-top: 25px!important;
    margin-left: 15px!important;
    margin-bottom: 15px!important;
    color: rgb(67, 67, 67) !important;
    height: 40px;
    background-color: rgb(168, 205, 234) !important;
    border-color: rgb(168, 205, 234) !important;
    border-radius: 8px;
  } 
  .form-group, .mt-3{
      margin-left:5px;
      margin-top: 5px;
      margin-right: 5px;
  }
  .select-deleteorganization {
    margin-right: 20px;
    margin-bottom: 15px;
    border-color: rgb(199, 199, 199);
    border-radius: 5px;
    height: 30px;
    width: 250px;
  }
</style>