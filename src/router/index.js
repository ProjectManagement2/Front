import Vue from 'vue';
import Router from 'vue-router';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import LoginAdmin from "@/components/LoginAdmin.vue";
import ProfileAdmin from "@/components/ProfileAdmin.vue";
import UserProfile from "@/components/UserProfile.vue";

Vue.use(Router);

export default new Router({
 mode: 'history',
 routes: [
   {
     path: '/signin',
     name: 'SignIn',
     component: SignIn,
   },
   {
     path: '/signup',
     name: 'SignUp',
     component: SignUp,
   },
   {
    path: "/adm/auth",
    name: "LoginAdmin",
    component: LoginAdmin
  },
  {
    path: "/adm/profile",
    name: "ProfileAdmin",
    component: ProfileAdmin
  },
  {
    path: "/user/profile",
    name: "UserProfile",
    component: UserProfile
  }
 ],
});