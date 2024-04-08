<template>
    <div>
        <div class="page-header">
            <h1 class="page-heading">Профиль администратора</h1>
        </div>
        <div id="org-page" class="mx-auto border  rounded">
            <div id="btns">
                <b-button class="btn"  type="add">Добавить</b-button>
                <b-button class="btn"  type="add">Редактировать</b-button>
                <b-button class="btn"  type="add">Удалить</b-button>
            </div>
            <div>
            <table id="table-org">
                    <thead>
                        <tr>
                        <th v-for="col in columns">{{col}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in rows">
                        <td v-for="col in columns">{{row[col]}}</td>
                        </tr>
                    </tbody>
                </table> 
            </div> 
        </div>
        
    </div>
    
    
</template>

<script>
    export default{
        name:"ProfileAdmin",
        data() {
            return {
                rows: [
                { организация: "Google", фамилия: "Петров", имя: "Петр", отчество: "Петрович"},
                { организация: "Yandex", фамилия: "Иванов", имя: "Иван", отчество: "Иванович" },
                { организация: "Samsung", фамилия: "Андреев", имя: "Андрей", отчество: "Андреевич"},
                { организация: "Apple", фамилия: "Пупкин", имя: "Василий", отчество: "Анатольевич"},
                { организация: "Huawei", фамилия: "Трубкин", имя: "Артур", отчество: "Русланович"},
                { организация: "Instagram", фамилия: "Забунин", имя: "Анатолий", отчество: "Владимирович" }
                ]
            }
            
        },
        computed: {
            "columns": function columns() {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0])
            }
        }
        
    };
    
</script>

<style>
    #org-page{
    width: 90%;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    }
    #btns{
    margin-left: 2%; 
    margin-top: 1%;    
    }
    .page-header{
    margin-left: 5% ;
    margin-bottom: 20px;
    }
                  
    table {
    font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
    width: 1250px;
    border-collapse: collapse;
    border: 2px solid #c7c7c7;
    margin: 2% 2% 3% 3%;
    }

    table th {
    text-transform: uppercase;
    text-align: left;
    background: white;
    padding: 8px;
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
    
</style>