<template>
    <div class="page-holder">
          <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
              <div class="page-header mb-2">
                <h1 class="page-heading">Об организации</h1>
              </div>
              <section>
                <div class="row">
                    <div class="col-lg-4">
                    <div class="card mb-4">
                      <div class="card-header">
                        <h4 class="card-heading">{{ posts.name }}</h4>
                      </div>
                        <p class="mb-3">Ответственный за организацию: Синюгина Варвара Владимировна</p>
                        <p class="mb-3">Описание: Хороша</p>
                        
                        
                    </div> 
                    </div>
                    <div class="col-lg-4">
                    <form class="card mb-4">
                        <div class="card-header">
                        <h4 class="card-heading">Список сотрудников</h4>
                        </div>
                        <div class="card-body">
                        <div class="col">
                            <div class="mb-4">
                            <div class="col-md-13">
                                <label class="form-label-org">Сотрудник 1</label>
                                
                                <button class="btn btn-primary" type="primary">></button>
                            </div>
                            </div>
                            <div class="mb-4">
                            <div class="col-md-13">
                                <label class="form-label-org">Сотрудник 2</label>
                                <button class="btn btn-primary" type="primary">></button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </form>
                    </div>
                    <div class="col-lg-4">
                    <form class="card mb-4">
                        <div class="card-header">
                        <h4 class="card-heading">Действующие прокеты</h4>
                        </div>
                        <div class="card-body">
                        <div class="col">
                            <div class="mb-4">
                            <div class="col-md-5">
                                <label class="form-label-org">Проект 1</label>
                            </div>
                            </div>
                            <div class="mb-4">
                            <div class="col-md-5">
                                <label class="form-label-org">Проект 2</label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                
              </section>
        </div>
    </div>
</template>

<script>

import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

export default {
  name: "PageOrg",
  
  data() {
    return {
      posts: []
    }
  },
  
  mounted() {
    axios
      .get('/api/organization/mainInfo', {
        headers: {
          'authorization': `Bearer ${localStorage.access_token}`
        },
        organizationId: localStorage.org_id
      })
      .then((response) => {
        this.posts = response.data
        console.log(this.posts)
      })
  }
}
</script>

<style>
.card-header:first-child {
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
}
.card-header {
  position: relative;
  padding: 2rem 2rem;
  border-bottom: none;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  z-index: 2;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}
.bg-gray-100 {
  background-color: #f8f9fa !important;
}
body{
  font-family: 'Poppins';
}
.text-primary {
  color: lightpink ;
}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
 
  line-height: 1.2;
}
.text-muted {
  color: #6c757d !important;
}
.lead {
  font-size: 1.125rem;
  font-weight: 300;
}
.text-sm {
  font-size: .7875rem !important;
}
h3, .h3 {
  font-size: 1.575rem;
}
.page-holder {
  display: flex;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 72px);
  margin-bottom: 1%;
  flex-wrap: wrap;
}
a {
  color: #4650dd;
  text-decoration: underline;
  cursor: pointer;
}
.card-profile-img {
  position: relative;
  max-width: 8rem;
  margin-top: -6rem;
  margin-bottom: 1rem;
  border: 3px solid #fff;
  border-radius: 100%;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 2;
}
img, svg {
  vertical-align: middle;
}
.avatar.avatar-lg {
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
}
.avatar {
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
  text-align: center;
  border: #dee2e6;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  line-height: 3rem;
}
.form-control
{
  color: #343a40;
}
.page-heading {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
}

.card-profile .card-header {
  height: 9rem;
  background-position: center center;
  background-size: cover;
}
.form-label-org{
  border: 1px solid #b2b6ba;
  border-radius: 7px;
  font-size: 17px;
  size: 150px;
  margin: 15px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.btn {
  background-color: lightpink !important;
  border-color: lightpink !important;
}
.btn.btn-primary{
  margin-top: 14px;
  margin-bottom: 14px;
  margin-left: 7px;

}
.mb-3{
  margin: 15px;
}
</style>