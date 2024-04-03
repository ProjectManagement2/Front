<template>
    <div>
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
    
    
</template>

<script>
    export default{
        name:"ProfileAdmin",
        data() {
            return {
                rows: [
                { id: 1, organization: "Google", director: "Chandler Bing"},
                { id: 2, organization: "Yandex", director: "Ross Geller" },
                { id: 3, organization: "Samsung", director: "Rachel Green"},
                { id: 4, organization: "Apple", director: "Monica Geller"},
                { id: 5, organization: "Huawei", director: "Joey Tribbiani"},
                { id: 6, organization: "Instagram", director: "Phoebe Buffay" }
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
    #btns{
        margin-left: 10%; 
        margin-top: 5%;
        
    }
    .btn{
        color: yellow;
    }
    table {
    font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
    width: 1550px;
    border-collapse: collapse;
    border: 3px solid #6e5562;
    margin: 2% 100px 0 10%;
    }

    table th {
    text-transform: uppercase;
    text-align: left;
    background: #6e5562;
    color: #FFF;
    padding: 8px;
    min-width: 30px;
    font-size: 20px;
    }

    table td {
    text-align: left;
    padding: 8px;
    border-right: 2px solid #6e5562;
    font-size: 20px;
    }
    table td:last-child {
    border-right: none;
    }
    table tbody tr:nth-child(2n) td {
    background: #b1b1b3;
    }
</style>