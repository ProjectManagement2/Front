<template>
    <div>
        <div class="page-header">
            <h1 class="page-heading">Профиль администратора</h1>
        </div>
        <div id="org-page" class="mx-auto border  rounded">
            <div id="btns">
                <b-button class="btn-admin-profile" @click="showAddForm">Добавить</b-button>
                <b-button class="btn-admin-profile" @click="showEditForm">Редактировать</b-button>
                <b-button class="btn-admin-profile" @click="showDeleteForm">Удалить</b-button>
            </div>
            <div id="forms">
                <AddModal :is-visible="isAddFormVisible" @close="closeAddForm" />
                <EditModal :is-visible="isEditFormVisible" @close="closeEditForm" />
                <DeleteModal :is-visible="isDeleteFormVisible" @close="closeDeleteForm" />
            </div>
            <div>
                <table id="table-org">
                    <thead>
                        <tr>
                            <th>организация</th>
                            <th>фамилия</th>
                            <th>имя</th>
                            <th>отчество</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="post in posts" :key="post._id">
                            <td> {{ post.name }}</td>
                            <td> {{ post.leader.surname }}</td>
                            <td> {{ post.leader.name }}</td>
                            <td> {{ post.leader.otch }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>


</template>

<script>
import AddModal from './modal_forms/AddModal.vue';
import EditModal from './modal_forms/EditModal.vue';
import DeleteModal from './modal_forms/DeleteModal.vue';
import axios from 'axios'

export default {
    name: "ProfileAdmin",
    components: {
        AddModal,
        EditModal,
        DeleteModal
    },
    data() {
        return {
            isAddFormVisible: false,
            isEditFormVisible: false,
            isDeleteFormVisible: false,
            posts: []
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        showAddForm() {
            this.isAddFormVisible = true;
        },
        closeAddForm() {
            this.isAddFormVisible = false;
        },
        showEditForm() {
            this.isEditFormVisible = true;
        },
        closeEditForm() {
            this.isEditFormVisible = false;
        },
        showDeleteForm() {
            this.isDeleteFormVisible = true;
        },
        closeDeleteForm() {
            this.isDeleteFormVisible = false;
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
        }
    }

};

</script>

<style>
#org-page {
    width: 90%;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
}

#btns {
    margin-left: 2%;
    margin-top: 1%;
}

.page-header {
    margin-left: 5%;
    margin-bottom: 20px;
}

table {
    font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
    width: 90%;
    border-collapse: collapse;
    border: 2px solid #c7c7c7;
    margin: 2% 2% 3% 3%;
}

table th {
    text-transform: uppercase;
    text-align: left;
    background: white;
    padding: 8px;
    border: 2px solid #c7c7c7;
    min-width: 30px;
    font-size: 15px;
}

table td {
    text-align: left;
    padding: 8px;
    border: 2px solid #c7c7c7;
    font-size: 15px;

}

table td:last-child {
    border-right: none;
}

.btn-admin-profile{
    margin-top: 25px!important;
    margin-left: 15px!important;
    margin-bottom: 10px!important;
    color: rgb(67, 67, 67) !important;
    height: 40px;
    background-color: rgb(168, 205, 234) !important;
    border-color: rgb(168, 205, 234) !important;
    border-radius: 8px;
}
</style>