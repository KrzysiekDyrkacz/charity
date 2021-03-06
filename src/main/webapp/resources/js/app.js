document.addEventListener("DOMContentLoaded", function() {



  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep++;
          this.updateForm();
        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      this.$step.innerText = this.currentStep;
      let current = this.currentStep;

      // TODO: Validation

      switch (this.currentStep) {
        case 1:
          step01();
          break;

          case 2:
          step02();
          break;

          case 3:
          step03();
          break;

          case 4:
          step04();
          break;
      }

      function step01(){
        let btn1 =$('#btn-1')
        btn1.hide()
        let checkboxCat = $('input[name=categoryList]')
        checkboxCat.each(function (index,element){
          $(element).change(function (){
            btn1.show()
          })
        })


      }

      function step02(){
        let btn2 = $('#btn-2')
        btn2.hide()
        let quantityInput =$('#quantity');

        quantityInput.mouseleave(function (){
          if (quantityInput.val()>0){
            btn2.show()
          }else {
            alert("podaj liczbę worków większą od zera")
          }
        })

      }
      function step03(){
        let btn3=$('#btn-3')
        btn3.hide()
        let radioInstitution = $('input[name=institution]')

        radioInstitution.each(function (index,element){
          $(element).change(function (){
            btn3.show()
          })
        })


      }
      function step04(){
        let btn4 = $('#btn-4')
        btn4.hide();
        let arrTrue = [false,false,false,false,false,false];


        let street = $('#street')
        let city = $('#city')
        let zip = $('#zip')
        let phone = $('#numberPhone')
        let data = $('#data')
        let time = $('#time')

        street.blur(function (){
          if (street.val()!==""){
            arrTrue[0]=true;
          }else {
            alert("nazwa ulicy nie może być pusta")
          }
          checkAllInput()
        })

        city.blur(function (){
          if (city.val()!==""){
            arrTrue[1]=true;
          }else {
            alert("nazwa miasta nie może być pusta")
          }
          checkAllInput()
        })

        zip.blur(function (){
          if (zip.val()!==""&& zip.val().length===5){
            arrTrue[2]=true;
          }else {
            alert("kod pocztowy musi mieć 5 cyfr")
          }
          checkAllInput()
        })

        phone.blur(function (){
          if (phone.val()!=="" && phone.val().length===9){
            arrTrue[3]=true;
          }else {
            alert("numer telefonu musi mieć 9 cyfr")
          }
          checkAllInput()
        })

        data.blur(function (){
          if (data.val()!=="" ){
            arrTrue[4]=true;
          }
          checkAllInput()
        })

        time.blur(function (){
          if (time.val()!=="" && time.val().match("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$")){
            arrTrue[5]=true;
          }else {
            alert("podaj poprawną godzine")
          }
          checkAllInput()
          console.log(arrTrue)


        })

        function checkAllInput(){
          if (arrTrue.every(function(element, index, array) {
            return element === true;
          })){
            btn4.show()
          }
        }



      }

      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }
      });

      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
      this.$step.parentElement.hidden = this.currentStep >= 5;

      // TODO: get data from inputs and show them in summary

      /**
       * Category in summary
       */

      let checkboxCategory = $('input[name=categoryList]:checked');
      let categoryResult=$('#category-result');
      let categoryValue = [];

      checkboxCategory.each(function (index, element) {
        categoryValue.push($(element).siblings('span').text())
      })
      categoryResult.text($('#quantity').val() + " worki " +categoryValue);

      /**
       * Foundation in summary
       */
      let radioFoundation =$('input[name=institution]:checked');
      let institution = $('#foundation-result')
      institution.text(radioFoundation.siblings('span').children('.title').text());
      /**
       * Address in summary
       */

      $('#street-result').text($('#street').val());
      $('#city-result').text($('#city').val());
      $('#zipCode-result').text($('#zip').val());
      $('#phone-result').text($('#numberPhone').val());
      /**
       * Data , time and comment in summary
       */
      $('#data-result').text($('#data').val());
      $('#time-result').text($('#time').val())
      $('#comment-result').text($('#comment').val())
    }

  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});
