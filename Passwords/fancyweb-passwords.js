class FancyWebPasswords extends HTMLElement{

    get hasValidation(){
        return this.hasAttribute('validation');
    }

    get validation(){
        return (this.hasValidation) ? this.getAttribute('validation') : false;
    }

    get hasType(){
        return this.hasAttribute('type');
    }

    get type(){
        return (this.hasType) ? this.getAttribute('type') : 'single';
    }

    constructor(){

        //Super HTMLElement extender
        super();

        //Define templating variables
        const templateStyle = `<script></script>`;
        const templateHTML = this.render();
        const template = document.createElement('template');

        //Set template innerHTML using "templateHTML" and "templateStyle"
        template.innerHTML = templateStyle+templateHTML;

        //Attach Shadow Dom to Component
        const shadowRoot = this.attachShadow({mode: 'open'});

        //Instantiate and append Component template
        shadowRoot.appendChild(template.content.cloneNode(true));

        //Setup Keyup Event Listenter
        this.addEventListener('keyup', evt =>{
            console.log(evt)
        });

    }

    render(){
        switch(this.type){
            case 'confirm':
                return this.renderConfirm();
            break;
            default:
                return this.renderSingle();
        }
    }

    renderSingle(){
        return `<p>Single</p>`;
    }

    renderConfirm(){
        return `<p>Confirm</p>`;
    }

    validate(testCase){

        /* RegEx	        Description
        *
        *  ^	            The password string will start this way
        *  (?=.*[a-z])	    The string must contain at least 1 lowercase alphabetical character
        *  (?=.*[A-Z])	    The string must contain at least 1 uppercase alphabetical character
        *  (?=.*[0-9])	    The string must contain at least 1 numeric character
        *  (?=.[!@#\$%\^&])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
        *  (?=.{8,})	    The string must be eight characters or longer
        * 
        */

        let validator = false;

        switch(this.validation){
            case "simple":
                //Simple Validation - Dummy condition until values have been setup.
                validator = (this.type !== 'single') ?  true : true;
            break;
            case "medium":
                //Medium Validation
                validator = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})").test(testCase);
            break;
            default:
                //Strong Validation
                 validator = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(testCase);
        }

        return validator;

    }

}

window.customElements.define('fancyweb-password', FancyWebPasswords);