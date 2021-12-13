// 1 
function createElemWithText(name = "p", text = "", className){
    var requiredElement = document.createElement(name);   // Create a  element
    requiredElement.textContent = text;                   // set text
    if(className){                                       // set class
    requiredElement.className = className;
    }
    return requiredElement;
}

// 2
function createSelectOptions(users){
    const options = [];
    if(users){
    for (let i = 0; i < users.length; i++) {
        let option = document.createElement("option");            // create option
        option.setAttribute("value", users[i].id);                // value
        let optionText = document.createTextNode(users[i].name);  // text
        option.appendChild(optionText);
        options.push(option);
    }
      return options;
    }
    return undefined;                                           // undefined Scenario
}

// 3
function toggleCommentSection(postId){
  var sections = document.getElementsByTagName('section');
  var section = null ;
  if(postId){
  for(var i = 0; i < sections.length; ++i){
      if(sections[i].getAttribute('data-post-id')  == postId){
          section = sections[i];
          section.classList.toggle("hide");
      }
  }
 
  return section;
}
return undefined; 
}

//4
function toggleCommentButton(postId){

    var buttons = document.getElementsByTagName('button');
    var button = null ;
    if(postId){
    for(let i = 0; i < buttons.length; ++i){
        if(buttons[i].getAttribute('data-post-id')  == postId){
            button = buttons[i];
            if(button.innerText == 'Show Comments'){
            button.innerText = 'Hide Comments';
            }else{
            button.innerText = 'Show Comments';
            }
        }
    }
   
    return button;
  }
  return undefined; 

}

//5
function deleteChildElements(parentElement){
  var  child ;

  if(parentElement != undefined && parentElement instanceof HTMLElement){
    child = parentElement.lastElementChild
  while(parentElement.lastElementChild){
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
  }

  return parentElement;
}

  return undefined; 
}

//6
function addButtonListeners(){
   
  var main = document.getElementsByTagName("main");
  var buttonInsideMainList = main[0].getElementsByTagName("button");
  if(buttonInsideMainList){
          for(let i = 0; i < buttonInsideMainList.length; i++){
           let postId = buttonInsideMainList[i].dataset.postId;
           buttonInsideMainList[i].addEventListener("click", function(event) {
                toggleComments(event,postId);
              },false);
        }
}
return buttonInsideMainList;
}

// 7
function removeButtonListeners(){
  var main = document.getElementsByTagName("main");
  var buttonInsideMainList = main[0].getElementsByTagName("button");
    if(buttonInsideMainList){
          for(let i = 0; i < buttonInsideMainList.length; i++){
           let postId = buttonInsideMainList[i].dataset.postId;
            buttonInsideMainList[i].removeEventListener("click", function(event) {
                toggleComments(event,postId);
              },false);
        }
}
return buttonInsideMainList;

}

// 8 
function createComments(comments){
  if(comments){
  var fragment = document.createDocumentFragment();
  for(let i = 0; i < comments.length; i++){
   let article =  document.createElement("article");
   let heading = createElemWithText('h3',comments[i].name);
   let body = createElemWithText('p', comments[i].body);
   let from = createElemWithText('p', `From: ${comments[i].email}`);
   article.appendChild(heading);
   article.appendChild(body);
   article.appendChild(from);
   fragment.appendChild(article);
 }

  return fragment;
}
return undefined;
  
}


// 9
function populateSelectMenu(users){

if(users){
 var userMenu = document.getElementById("selectMenu");
 var options  = createSelectOptions(users);
 for (let i = 0; i < options.length ; i++){
   userMenu.appendChild(options[i]);
 }
 return userMenu;
}
return undefined;
}

//10
async function getUsers(){
  var users;
  try{
    const request = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await request.json();
    return users;

  }catch(err){
  console.log(err);
  }

}

//11
async function getUserPosts(userId){
  var posts;
  if(userId){
  try{
    const request = await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId);
    posts = await request.json();
    return posts;

  }catch(err){
  console.log(err);
  }
}else{
  return undefined;
}

}

//12
async function getUser(userId){
  var user;
  if(userId){
    try{
      const request = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
      user = await request.json();
      return user;
}catch(err){
     console.log(err);
    }

  }else{
    return undefined;
  }
}

//13
async function getPostComments(postId){
  var comments;
  if(postId){
    try{
      const request = await fetch("https://jsonplaceholder.typicode.com/posts/" + postId + "/comments");
      comments = await request.json();
      return comments;

    }catch(err){
      console.log(err);
    }

  }else{
      return undefined;
  }

}

// 14 
async function displayComments(postId){
  if(postId){
  var section =  document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add('comments', 'hide');
  var comments = await getPostComments(postId);
  var fragment = createComments(comments);
  section.appendChild(fragment);
  return section
  }else{
    return undefined;
  }
}

// 15
async function createPosts(posts){
 var fragment = document.createDocumentFragment();
 if(posts){
 for(let i = 0; i < posts.length; i++){
   let article = document.createElement("article");
   let postTitle = createElemWithText("h2", posts[i].title);
   let postBody = createElemWithText("p", posts[i].body);
   let postId = createElemWithText("p", `Post ID: ${posts[i].id}`);
   let author = await getUser(posts[i].userId);
   let authorAndCompany = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
   let companyCatchPhrase = createElemWithText("p", author.company.catchPhrase);
   let showCommentButton = createElemWithText("button", "Show Comments");
   showCommentButton.dataset.postId = posts[i].id;
   article.appendChild(postTitle);
   article.appendChild(postBody);
   article.appendChild(postId);
   article.appendChild(authorAndCompany);
   article.appendChild(companyCatchPhrase);
   article.appendChild(showCommentButton);
   let section = await displayComments(posts[i].id);
   article.appendChild(section);
   fragment.appendChild(article);
 }

 return fragment;
}else{
  return undefined;
}
}

// 16
async function displayPosts(posts){
  var main = document.getElementsByTagName("main");
  var postDisplay;
  if(posts){
    postDisplay = await createPosts(posts);
   }else{
    postDisplay = createElemWithText("p", "Select an Employee to display their posts.","default-text");
  }
  main[0].appendChild(postDisplay);
  return postDisplay;

}



// 17
function toggleComments(event, postId){
  
  var result = [];
  if(event && postId){
  event.target.listener = true;
  var section = toggleCommentSection(postId);
  var button  = toggleCommentButton(postId);
  result.push(section);
  result.push(button);
  return result;
  }
  return undefined;
}

//18
async function refreshPosts(posts){
 
  var result = [];
  if(posts){
  let removeButtons = []
   removeButtons = removeButtonListeners();
  let main = document.getElementsByTagName("main");
  let updatedMain = deleteChildElements(main[0]);
  let fragment = await displayPosts(posts);
  let addButtons = addButtonListeners();
  //result.push(removeButtons,main,fragment,addButtons);
  
 result.push(removeButtons, updatedMain,fragment, addButtons);
  
  return result;
  }else{
    return undefined;
  }
}

//19
async function  selectMenuChangeEventHandler(event){
  var result = [];
  var userID ;
  var posts = [];
  var refreshPostArray = [];
  
 
  userID = event?.target?.value || 1;
  posts = await  getUserPosts(userID);
  refreshPostArray = refreshPosts(posts);

  result.push(userID, posts, refreshPostArray);

  return result;
}



//20
async function initPage(){
 var result = [];
 var users = await getUsers();
 var select = populateSelectMenu(users);
 result.push(users, select);
 return result;
}


//21

function initApp(){
  initPage();
  var userMenu = document.getElementById("selectMenu");
  userMenu.addEventListener("change", function(event) {
    selectMenuChangeEventHandler(event);
  });

}

document.addEventListener("DOMContentLoaded", initApp);
