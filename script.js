// validator class

class Validator {

    // validationRules = an array of input ids with the validation rules of each input
    constructor (validationRules = {}) {
        this.rules = validationRules;
        this.regex = {
            'alphabets' : /[A-Za-z]+/,
            'numbers' : /[0-9]+/,
            'space' : /[\s]+/,
            'specialCharacters' : /[-@.#&+]+/,
            'underscore' : /[_]+/
        }
        // make more rules for validation such as:
        // underscore, tags 
        this.regexrules = Object.keys(this.regex);
        
    }

    validate () {
        let validationErrors = [];
        Object.entries(this.rules).map(rule => {
            // get the value in the current input 
            let content = document.querySelector(`${this.form} > ${rule[0]}`).value;
            let allowed = rule[1];

            let rules = allowed.split('|');

            //  if the rules includes 'notempty'
            if (rules.includes('notempty')) {
                // check if the input field is empty, return an error if the field is empty
                if (content == null  || content == "")
                {
                    validationErrors.push(`${rule[0]} is not allowed to be empty`);
                }

                // remove the 'notempty' from the rules list
                let index = rules.indexOf('notempty');
                rules.splice(index, 1);
            }

            // remove all the allowed items from the list
            let notallowed = this.regexrules.filter(val => !rules.includes(val));

            // run through the not allowed list, if the array is not empty then chcek if the the input content contains not allowed characters, then show errors.
            // check if the notallowed array is empty, if it is empty that means all values are allowed

            if (notallowed.length > 0) {
                notallowed.forEach(item => {
                    if (content.match(this.regex[item])) {
                        validationErrors.push(`${rule[0]} is not allowed to contain ${item}`);
                    }

                });
            }


          });

          if (validationErrors.length == 0) return false;
          else return validationErrors;
    }
}