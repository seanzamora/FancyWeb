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
        return (this.hasValidation) ? this.getAttribute('type') : 'single';
    }

    constructor(){
        super();
        
        //Setup Keyup Event Listenter
        this.addEventListener('keyup', evt =>{
            console.log(evt)
        });
    }

    renderElement(){
        
    }

}

window.customElements.define('fancyweb-password', FancyWebPasswords);