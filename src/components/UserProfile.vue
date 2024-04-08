<template>
    <div class="page-holder">
          <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
                <div class="page-header mb-4">
                  <h1 class="page-heading">Профиль</h1>
                </div>
            <section>
              <div class="row">
                <div class="col-lg-4">
                  <div class="card card-profile mb-4">
                    <div class="card-header" style="background-color: lightpink;"> </div>
                    <div class="card-body text-center"><img class="card-profile-img" src="https://i.pinimg.com/originals/e3/41/40/e34140dc81a93041f8ae93e6b87b3c6c.jpg" alt="Jassa Rich">
                      <h3 class="mb-3">Иван Иванов</h3>
                      <p class="mb-4">Full Stack Developer</p>
                      <!-- <button class="btn btn-outline-dark btn-sm"><span class="fab fa-twitter"></span> Follow</button> -->
                      
                    </div>
                  </div>
                  
                  <form class="card mb-4">
                    <div class="card-header">
                      <h4 class="card-heading">Редактировать</h4>
                    </div>
                    <div class="card-body">
                      <div class="row mb-3">
                        <div class="col-auto d-flex align-items-center"><img class="avatar avatar-lg p-1" src="https://i.pinimg.com/originals/e3/41/40/e34140dc81a93041f8ae93e6b87b3c6c.jpg" alt="Avatar"></div>
                        <div class="col">
                          <label class="form-label">Имя</label>
                          <input class="form-control" placeholder="Your name">
                        </div>
                      </div>
                      <div class="mb-3"> 
                        <label class="form-label">О себе</label>
                        <textarea class="form-control" rows="8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</textarea>
                      </div>
                      <div class="mb-3"> 
                        <label class="form-label">Email</label>
                        <input class="form-control" placeholder="you@domain.com">
                      </div>
                      <label class="form-label">Почта</label>
                      <input class="form-control" type="password" value="password">
                    </div>
                    <div class="card-footer text-end">
                      <button class="btn btn-primary">Сохранить</button>
                    </div>
                  </form>
                </div>
                <div class="col-lg-8">
                  
                  <form class="card mb-4">
                    <div class="card-header">
                      <h4 class="card-heading">Организации</h4>
                    </div>
                    <div class="card-body">
                      <div class="col">
                        <div class="mb-4">
                          <div class="col-md-5">
                            <label class="form-label-org">Организация 1</label>
                            
                            <button class="btn btn-primary" type="primary">></button>
                          </div>
                        </div>
                        <div class="mb-4">
                          <div class="col-sm-6 col-md-3">
                            <label class="form-label-org">Организация 2</label>
                            
                            <button class="btn btn-primary" type="primary">></button>
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
export default {
  
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
.contentDiv
{
  padding-top: 4rem;
}
.card-profile .card-header {
  height: 9rem;
  background-position: center center;
  background-size: cover;
}
.form-label-org{
  border: 1px solid #b2b6ba;
  border-radius: 7px;
  size: 150px;
  margin: 5px;
  padding-left: 15px;
  padding-right: 15px;
}
.btn {
  background-color: lightpink !important;
  border-color: lightpink !important;
}
</style>