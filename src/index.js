
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
      addCommentBtn: false,
      addCommentVal: ''
    } 
  },
  watch: {
    addCommentVal(val) {
      this.addCommentBtn = (val) ? true : false;
    }
  },
  methods:{ 
    addComment() {
			if ( this.addCommentVal == "" ) {
				return;
			}
      var itemAdd = {
        id: uuidv1(),
        title: 'WWII',
        img: './assets/img/jasonx2.png',
        content: this.addCommentVal
      }
      this.comments.unshift(itemAdd);
      this.addCommentVal = ''
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
      this.isRemove = true
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
            <input type="text" placeholder="Write a new comment"  v-model="addCommentVal">
            <button @click="addComment" v-if="addCommentBtn" id="comment-apply"> <img src="./assets/img/paper-plane.png" alt="paper-plane-icon"> Send</button>
        </div>
        <div class="card-form-edit" v-if="isActive">
            <input type="text" placeholder="Write a new comment" id="edit-comment">
            <button @click="editFromApplly"> <img src="./assets/img/paper-plane.png" alt="paper-plane-icon"> Send</button>
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
  },
  data: () => {
    return {
      isActiveSeting: false,
      isRemove: true,
    }
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
    },
    showWarning() {
      this.isRemove = false
    },
    noRemoveComment() {
      this.isRemove = true
    }


  },
  template: `
  <div>
    <div class="card-comments" v-if="isRemove" @click="isActiveSeting = !isActiveSeting" :class="{ active: isActiveSeting}">
      <div  class="setings" v-if="isActiveSeting">
          <button @click="showWarning"> <img src="./assets/img/remove.png" alt="remove-icon"> Remove</button>
          <button @click="editComment"> <img src="./assets/img/edit.png" alt="edit-icon"> Edit</button>
      </div>
      <img  v-bind:src="img" alt="avatar">
      <div class="card-comments-text">
          <span>{{title}}</span>
          <p>{{content}}</p>
      </div>
    </div>
    <div class="card-form-delete" v-else>
      <p>Delete comment?</p>
      <button @click="noRemoveComment">No</button>
      <button id="card-form-delete-apply" @click="removeComment">Yes</button>
    </div>
  </div>
`
})

new Vue({ el: '#comments' })
var bus = new Vue();