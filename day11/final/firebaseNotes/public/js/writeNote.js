let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      const noteText = document.querySelector('#greeting');
        noteText.innerHTML=buildGreeting(googleUser.displayName);
        
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  // 2. Format the data and write it to our database
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const school = document.querySelector('#school-input');
  const work = document.querySelector('#work-input');

  let dateTime = date+' '+time;
  let sets={
      school:school.value,
      work:work.value
  };
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    time: dateTime,
    lables: sets
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
  });
};


const buildGreeting = (Username) =>{
  let random=Math.floor(Math.random() * 4);
  switch(random){
    case 0:
      return  Username+" just slid into the server."
      break;
      case 1:
        return Username+" just landed."
      break;
      case 2:
        return "A wild "+Username+" appeared."
      break;
      case 3:
        return "Welcome, "+Username+", We hope you brought pizza."
      break;
    
  }
}

const printThings = (input) =>{
  // const input = document.querySelector('#school-input');
  console.log(input.value)
    if(input.value==="on"){
      input.value="off"
    }
    else{
      input.value="on"
    }
}
const logOut = () =>{
  window.location = 'index.html'; // If not logged in, navigate back to login page.
}