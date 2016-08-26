function VitascopeSlave(element) {
        this.chosenIndex=-1;
        this.siblings=[];
        this.items=jQuery(element).children('.vita-item').toArray();
        this.element=this.getElement(element);
        this.listenToSibling();
    }

VitascopeSlave.prototype={
        constructor:VitascopeSlave,
        cleanAll:function () {
            this.items.forEach(function (item) {
                if(jQuery(item).hasClass("selected"))
                    jQuery(item).removeClass("selected");
            });
            this.chosenIndex=-1;
        },
        show:function (idx) {
            this.cleanAll();
            if(!jQuery(this.items[idx]).hasClass("selected"))
                jQuery(this.items[idx]).addClass("selected");
            this.chosenIndex=idx;
            jQuery(this.element).trigger({
                type: "show.VitascopeSlave",
                idx:idx
            });
        },
        getElement:function (ele) {
                if ( typeof ele == 'string' ) {
                    return document.querySelector( ele );
                }
                return ele;
        },
        listenToSibling:function () {
            var currentSlave=this;
            if(jQuery(this.element).attr("vita-group")) {
                var groupId =jQuery(this.element).attr("vita-group");
                jQuery('.vita-slave[vita-group='+groupId+']').each(function (idx,element) {
                    if(!jQuery(currentSlave.element).is(element)){
                        jQuery(element).on("show.VitascopeSlave",function () {
                            currentSlave.cleanAll();
                        });
                    }
                });
            }
        }

    };

function VitascopeController(params,element) {
        this.hover=false;
        this.click=true;
        this.autoSelect=false;
        this.chosenIndex=-1;
        this.slaves=[];
        this.element=this.getElement(element);
        this.items=jQuery(element).children('.vita-item').toArray();

        var controller=this;

        if(params["hover"] && typeof params["hover"] ==='boolean')
            this.hover=params["hover"];

        if(params["click"] && typeof params["click"] ==='boolean')
            this.click=params["click"];

        if(params["autoSelect"] && typeof params["autoSelect"] ==='boolean')
            this.autoSelect=params["autoSelect"];

        var slaveIds=jQuery(element).attr("vita-slaves").split(" ");
        slaveIds.forEach(function (slaveId) {
            if(jQuery("#"+slaveId)){
                controller.slaves.push(new VitascopeSlave(jQuery("#"+slaveId)));
            }
            else {
                console.error("Cannot find components with ID "+slaveId);
            }
        });

        if(this.click)
        this.items.forEach(function (item,index) {
            jQuery(item).on("click",function () {
                controller.choose(index);
            });
        });

        if(this.hover)
        this.items.forEach(function (item,index) {
            jQuery(item).hover(function () {
                controller.choose(index);
            });
        });

        if(this.autoSelect){
            this.choose(0);
        }

    }

VitascopeController.prototype={
        constructor:VitascopeController,
        getElement:function (ele) {
        if ( typeof ele == 'string' ) {
            return document.querySelector( ele );
        }
        return ele;
        },
        choose:function (idx) {
            if(idx>=0) {
                this.slaves.forEach(function (slave) {
                    slave.show(idx);
                });
                this.show(idx);
            }
            else
                console.log("Invalid Index "+idx);
        },
        cleanAll:function () {
            this.items.forEach(function (item) {
                if(jQuery(item).hasClass("selected"))
                    jQuery(item).removeClass("selected");
            });
            this.chosenIndex=-1;
        },
        show:function (idx) {
            this.cleanAll();
            if(!jQuery(this.items[idx]).hasClass("selected"))
                jQuery(this.items[idx]).addClass("selected");
            this.chosenIndex=idx;
            jQuery(this.element).trigger({
                type: "show.VitascopeController",
                idx:idx
            });
        },

    };

