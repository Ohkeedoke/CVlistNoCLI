new Vue({
  el:'#vue-app',
  data () {
    return {
      name: null,
      surname: null,
      age: null,
      position: null,
      experience: null,
      cvJSON: {
        elements: [],
      },
    }
  },
  methods: {
    sendCv() {
      this.cvJSON.elements.push({
        "name": this.name,
        "surname": this.surname,
        "age": this.age,
        "position": this.position,
        "experience": this.experience,
      });

      this.setLocalStorage();
      this.name = null;
      this.surname = null;
      this.age = null;
      this.position = null;
      this.experience = null;
    },

    updateCv(index) {
      const elements = document.getElementsByClassName('element')[index].childNodes;
      let editButton = document.getElementsByClassName('editButton')[index];

      if (editButton.textContent != 'Save') {
        for (let i = 0; i < elements.length; i++) {
          elements[i].disabled = false;
        }
        editButton.textContent = 'Save';
      } else {
        this.setLocalStorage();
        for (let i = 0; i < elements.length; i++) {
          elements[i].disabled = true;
        }
        editButton.textContent = 'Edit CV';
      }
    },
    deletedCv(index) {
      this.cvJSON.elements.splice(index,1);
      this.setLocalStorage();
    },
    setLocalStorage() {
      localStorage.setItem('cvJSON', JSON.stringify(this.cvJSON));
    },
  },
  mounted() {
    let localData = JSON.parse(localStorage.getItem('cvJSON'))
    if (localData != null) {
      this.cvJSON = localData;
    };
  },
});
