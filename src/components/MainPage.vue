<template>
    <main class="main">
        <div class="main-container">
            <div class="main-info">
                <span class="main-info_label">For Everyone</span>
                <h1 class="main-info_header">Planify: простой и удобный инструмент управления проектами</h1>
                <span class="main-info_subtitle">Повысьте производительность вашей команды c Planify</span>
                <button class="main-info_button" @click="openStart">Начать использовать</button>
            </div>

            <div class="key-features">
                <h2 class="key-features_header">Ключевые возможности</h2>
                <div class="key-features_list">
                    <div class="key-features_item">
                        <p class="key-features_text">Распределение задач между участниками команды</p>
                        <div class="key-features_picture"></div>
                    </div>
                    <div class="key-features_item">
                        <p class="key-features_text">Отслеживание состояния проекта</p>
                        <div class="key-features_picture"></div>
                    </div>
                    <div class="key-features_item">
                        <p class="key-features_text">Интеграция с календарем для планирования задач</p>
                        <div class="key-features_picture"></div>
                    </div>
                </div>
            </div>
        </div>


    </main>

</template>

<script>
import router from '@/router/index.js';
export default {
   methods: {
        openStart(){
            router.push("/signin");
        }
   } 
}

</script>

<style>
.main-container {
    margin: 0 150px 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.main-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 180px 0;
}

.main-info_label {
    font-weight: 900;
    font-size: 20px;
    line-height: 300%;
    color: #87b7d9;
}

.main-info_header {
    margin-top: -10px;

    max-width: 900px;
    font-weight: 700;
    font-size: 46px;
    line-height: 130%;
    letter-spacing: -0.03em;
    text-align: center;
    color: #000;
}

.main-info_subtitle {
    margin-top: 12px;

    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #898989;
}

.main-info_button {
    margin-top: 50px;
    border-radius: 24px;
    padding: 10px 0px;
    width: 260px;
    height: 48px;
    text-align: center;
    text-decoration: none;
    color: rgb(67, 67, 67) !important;
    background-color: rgb(168, 205, 234) !important;
    border-color: rgb(168, 205, 234) !important;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.01em;

}

.key-features {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
}

.key-features_header {
    font-weight: 700;
    font-size: 36px;
    line-height: 125%;
    letter-spacing: -0.03em;
    color: #000;
}

.key-features_list {
    margin-top: 45px;
    display: flex;
    flex-wrap: wrap;
    gap: 70px;
}

.key-features_item {
    width: 330px;
}

.key-features_text {
    font-weight: 400;
    font-size: 24px;
    line-height: 137%;
    color: #000;
}

.key-features_picture {
    margin-top: 35px;

    width: 100%;
    height: 170px;
    border-radius: 30px;

    background-color: #c5c5c5;
}
</style>