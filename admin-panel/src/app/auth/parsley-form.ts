/**
 * Created by Alexander Spazhev on 31.10.2016.
 */

declare let jQuery: any;

function isValidDate(value) {

    if (!value) { return false}

    let [dd,mm, yyyy] = value.split('/');


    if (!((+dd) && (+mm) && (+yyyy))) {
        return false;
    }

//    let dateStr = `${yyyy}-${mm}-${dd}`
//    let dateObj = new Date(dateStr);
    let n_yyyy = +yyyy;
    let n_mm = +mm;

    let dateObj = new Date(+yyyy,(+mm-1),+dd);
    if ((dateObj.getDate() != +dd) || (dateObj.getMonth()+1 != (+mm)) || (dateObj.getFullYear() != (+yyyy))) {
        //console.log(dateObj.getDate(),+dd);
        return false;
    }
    return true;
}

function isValidTime(value) {

    if (!value) { return false}

    let [hh,mm] = value.split(':');

    if (!((+hh) && (+mm))) {
        return false;
    }

    let str = `${hh}:${mm}`
    let dateObj = new Date('2016/01/01 '+str);
    if ((dateObj.getHours() != +hh) || (dateObj.getMinutes() != (+mm)) ) {
        //console.log(hh,mm);
        return false;
    }
    return true;
}


function isValidPrice(value) {

    if (!value) { return false}

    var _value = value.replace(/,/g, "");

//    console.log('_value',_value);

    var val = parseFloat(_value);
    if (isNaN(val)) { return false}

//    console.log('val',val);
    return (val >= 0.50);
}


var parseRequirement = function (requirement) {
    if (isNaN(+requirement))
        return parseInt(jQuery(requirement).val());
    else
        return +requirement;
};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class ParsleyForm {

    public parsley: boolean = true;
    protected $parsleyForm:any = null;

    constructor() {}


    public isValid(group:string = '') {
        if (!this.$parsleyForm) throw new Error("Not parsley form");

        if (group) {
            return this.$parsleyForm.validate({group:group});  // = isValid
        }

        //return this.$parsleyForm.isValid();
        return this.$parsleyForm.validate();

//        console.log('isValid(0)',this.$parsleyForm.validationResult);

        //let res=  this.$parsleyForm.validate();

        //console.log('isValid()',this.$parsleyForm.validationResult,res);

        //return res; //isValid();
    }

    onValidate() {

    }


    onValidated() {

    }

    ngOnInit():void {

        if (!this.parsley) return;

        let $el:any = jQuery('.parsleyjs');
        //console.log($el); // check isArray --> several
        if ($el) {
            this.$parsleyForm = $el.parsley();

            if (this.$parsleyForm) {
            //console.log(this.$parsleyForm);
            // init parsley ....
            this.$parsleyForm.on('form:validate',(formInstance) => {this.onValidate()});
            this.$parsleyForm.on('form:validated',(formInstance) => {this.onValidated()});

            let $p:any = this.$parsleyForm.parent;
            if ($p) {
                // console.log($p);
                let $v:any = $p._validatorRegistry.validators.date;  // or .time
                if (!$v) {
                    console.log('init parsley validators');

                    $p.addValidator('date', {
                        validateString: isValidDate,
                        messages: {
                            en: 'Should be valid date dd/mm/yyyy',
                            fr: "Should be valid date dd/mm/yyyy"
                        }
                    });

                    $p.addValidator('time', {
                        validateString: isValidTime,
                        messages: {
                            en: 'Should be valid time HH:MM',
                            fr: 'Should be valid time HH:MM'
                        }
                    });

                    $p.addValidator('price', {
                        validateString: isValidPrice,
                        messages: {
                            en: 'Price must be at least 50 cents',
                            fr: 'Price must be at least 50 cents'
                        }
                    });

                    $p.addValidator('requiredif',{
                        requirementType: ['string', 'string'],
                        validateString: function (value, requirement1,requirement2) {
                            let req1 = parseRequirement(requirement1);
                            let req2 = parseRequirement(requirement2);
                            //console.log(req1,req2);
                            if (req1 == req2) return /\S/.test(value);
                            return true;

                        },
                        messages: {
                            en: 'Required field',
                            fr: 'Required field'
                        }
                    });

                    $p.addMessage('en', 'required', 'Required field');
                    $p.addMessage('en', 'email', 'Should be valid email');
                }

            }
        }}
    }

}