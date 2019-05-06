
// JS - ./js/index.js
import './js/'
// SCSS
import './scss/main.scss'
// CSS (example)
import './css/main.css'
window.Vue = require('vue')




Vue.component('com', {
  data: () => {
    return {
      comments: [
        {
          id: 1,
          title: 'Land Warrior 17',
          img: './assets/img/jasonx.png',
          content: ' I ve been there, that was nice meeting on battleground!'
        },
        {
          id: 2,
          title: 'Land Warrior 17',
          img: './assets/img/jasonx1.png',
          content: ' I ve been there, that was nice meeting on battleground! '
        },
        {
          id: 3,
          title: 'WWII',
          img: './assets/img/jasonx2.png',
          content: ' Thats awesome!'
        }
      ]
    } 
  },
  methods:{
    addComment() {
			if ($('#add-comment').val() == "" ) {
				return;
			}
      var itemAdd = {
        title: 'WWII',
        img: './assets/img/jasonx2.png',
        content: $('#add-comment').val()
      }
      this.comments.unshift(itemAdd);
      $('#add-comment').val('');
    },

    removeComment(comment) {
      var itemDell = this.comments.indexOf(comment);
      this.comments.splice(itemDell, 1); 
    },

    editComment(comment){
      $('#edit-comment').val(comment.content)
    },
    applyEditComment(){     
      console.log( $('#edit-comment').val()) 
    },

  },
  template: `
    <div class="card">
      <div class="card-images">
        <img src="./assets/img/NoPath.png" alt="landscape">
      </div>
      <div class="card-info">
        <h3>Beautiful landscape</h3>
        <a href="#"> <img src="./assets/img/cash.png" alt="donate-icon"> <span> Donate Author</span></a>
      </div>
      <div class="card-form">
        <div class="card-form-active">
            <input type="text" placeholder="Write a new comment" id="add-comment">
            <button @click="addComment"> <img src="./assets/img/paper-plane.png" alt="paper-plane-icon"> Send</button>
        </div>
        <div class="card-form-edit">
            <input type="text" placeholder="Write a new comment" id="edit-comment">
            <button @click="applyEditComment"> <img src="./assets/img/paper-plane.png" alt="paper-plane-icon"> Send</button>
        </div>
      </div>
      <div class="card-comments" v-for="comment in comments">
        <div>
          <button @click="removeComment(comment)">remove</button>
          <button @click="editComment(comment)">edit</button>
        </div>
        <img  v-bind:src="comment.img" alt="avatar">
        <div class="card-comments-text">
          <span>{{comment.title}}</span>
          <p>{{comment.content}}</p>
        </div>
      </div>
    </div>
`
})

new Vue({ el: '#comments' })

