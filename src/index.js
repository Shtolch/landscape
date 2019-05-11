
// JS - ./js/index.js
import './js/'
// SCSS
import './scss/main.scss'
// CSS (example)
import './css/main.css'
window.Vue = require('vue')
const uuidv1 = require('uuid/v1');

Vue.component('landscape', {
  data: () => {
    return {
      comments: [
        {
          id: '59e850a0-70cb-11e9-80de-054fc6710502',
          title: 'Land Warrior 17',
          img: './assets/img/jasonx.png',
          content: ' I ve been there, that was nice meeting on battleground!'
        },
        {
          id: '064ad3f0-70cb-11e9-80de-054fc6710502',
          title: 'Land Warrior 17',
          img: './assets/img/jasonx1.png',
          content: ' I ve been there, that was nice meeting on battleground! '
        },
        {
          id: '1a0b7020-70cb-11e9-80de-054fc6710502',
          title: 'WWII',
          img: './assets/img/jasonx2.png',
          content: ' Thats awesome!'
        }
      ],
      isActive: false,
      isRemove: false,
    } 
  },
  methods:{ 
    addComment() {
			if ($('#add-comment').val() == "" ) {
				return;
			}
      var itemAdd = {
        id: uuidv1(),
        title: 'WWII',
        img: './assets/img/jasonx2.png',
        content: $('#add-comment').val()
      }
      this.comments.unshift(itemAdd);
      $('#add-comment').val('');
    },
    editFrom(comment) {     
      this.isActive = true
      $('#edit-comment').val(comment);

    
    },
    editFromApplly(){
      console.log( $('#edit-comment').val() )
      this.isActive = false
      
    },
    removeFrom(idComment) {
      this.isRemove = true;
      
      this.comments =  this.comments.filter(function(el) {
          return el.id !== idComment
      })
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
        <div class="card-form-edit" v-if="isActive">
            <input type="text" placeholder="Write a new comment" id="edit-comment">
            <button @click="editFromApplly"> <img src="./assets/img/paper-plane.png" alt="paper-plane-icon"> Send</button>
        </div>
        <div class="card-form-delete" v-if="isRemove">
            <p>Delete comment?</p>
            <button>No</button>
            <button id="card-form-delete-apply">Yes</button>
        </div>
      </div> 
      <comment
        @edit="editFrom"
        @remove="removeFrom"
        v-for="(comment, index) in comments"
        v-bind:key=comment.id
        v-bind:id=comment.id
        v-bind:img=comment.img
		    v-bind:content=comment.content
		    v-bind:title=comment.title
      />
    </div>
`
})



Vue.component('comment', {
    props: {
		img: String,
		title: String,
    content: String,
    id: String,
    isActiveSeting: Boolean,
    
	},
  methods:{
    openSetings(){
        $('.seting').css('display', 'block')
        
    },
    editComment() {
      this.$emit('edit', this.content);
    },
    removeComment() {
      this.$emit('remove', this.id);
    }


  },
  template: `
    <div class="card-comments" @click="isActiveSeting = !isActiveSeting" :class="{ active: isActiveSeting}">
      <div  class="setings"v-if="isActiveSeting">
          <button @click="removeComment"> <img src="./assets/img/remove.png" alt="remove-icon"> remove</button>
          <button @click="editComment"> <img src="./assets/img/edit.png" alt="edit-icon"> edit</button>
      </div>
      <img  v-bind:src="img" alt="avatar">
      <div class="card-comments-text">
          <span>{{title}}</span>
          <p>{{content}}</p>
      </div>
  </div>
`
})

new Vue({ el: '#comments' })
var bus = new Vue();