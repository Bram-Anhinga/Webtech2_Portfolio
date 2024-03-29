/* ---------------------------------------- FRAMEWORK ---------------------------------- */
var $ = function(selector){
	// check if selector is an object already e.g. by passing 'this' on clicks
	if(typeof(selector) == "object")
	{
		return new WrapperElement(selector);
	}

    var selectedItems = document.querySelectorAll(selector);
	var newElement = new WrapperElement(selectedItems);
	return newElement;
}

var WrapperElement = function(element){
    // a wrapper element allow us to extend html dom functionality
    // without changing the behaviour of built-in elements
	
    // this contains the actual selection
    this.element = element;									
    
    // this allows us to see if a selection contains one or more elements
    if(element.length > 1)
    {
        this.isArray = true;
    }
    else
    {
        this.isArray = false;
    }
}

function hasClass(el, className){
    
    return el.element.className.indexOf(''+ className + '') > -1;
}

WrapperElement.prototype.toggleClass = function(className){
    
    if(this.isArray){
                    
        for( var i = 0; i<this.element.length; i++ ){
                        
            if(this.element[i].hasClass(this, className)){
                
                this.element[i].rmvClass(className);
            }
            else{
                
                this.element[i].addClass(className);
                
            }           
        }
    }
    else{
                    
        if(hasClass(this, className)){
                
            this.rmvClass(className);
        }
        else{
                
            this.addClass(className);        
        }
    }
                
    return this;
}

WrapperElement.prototype.addClass = function(className){  
	if(this.isArray)
	{
        // multiple elements, we'll need to loop
		for(var i = 0; i<this.element.length; i++)
		{
			this.element[i].className += "todo-item " + className;
		}
	}
	else
	{
        // just one element, so we can manipulate it without looping
		this.element.className = "todo-item " + className;
	}
    
    // return the original WrapperElement, so that we can chain multiple functions like $("li").addClass("test").toggleClass("something");
	return this;
}

WrapperElement.prototype.rmvClass = function(className){
    if(this.isArray)
	{
        // multiple elements, we'll need to loop
		for(var i = 0; i<this.element.length; i++)
		{
			this.element[i].className = "todo-item prior-high";
		}
	}
	else
	{
        // just one element, so we can manipulate it without looping
		this.element.className = "todo-item prior-high";
	}
    
    // return the original WrapperElement, so that we can chain multiple functions like $("li").addClass("test").toggleClass("something");
	return this;
}

WrapperElement.prototype.prepend = function(item){ 

    if(this.isArray)
	{
        // multiple elements, we'll need to loop
		for(var i = 0; i<this.element.length; i++)
		{
			$("#todo-list").insertBefore(item, this.firstChild );
		}
	}
	else
	{
        // just one element, so we can manipulate it without looping
        
		document.getElementById("todo-list").insertBefore(item, this.firstChild);
	}
    
    // return the original WrapperElement, so that we can chain multiple functions like $("li").addClass("test").toggleClass("something");
	return this;
}

WrapperElement.prototype.keyup = function(action){
	if(this.isArray)
	{
		// multiple elements, we'll need to loop
		for(var i = 0; i<this.element.length; i++)
		{
			this.element[i].addEventListener('keyup', action);
		}
	}
	else
	{
		// just one element, let's go nuts
		this.element[0].addEventListener('keyup', action);
	}
	return this;
}

WrapperElement.prototype.click = function(action){
    if(this.isArray){
                    
        for( var i = 0; i<this.element.length; i++ ){
                        
            this.element[i].addEventListener("click", action);                           
        }
    }
    else{
                    
        this.element.addEventListener("click", action);
    }
                
    return this;
}

WrapperElement.prototype.val = function(value){
    if(this.isArray){
                    
        for( var i = 0; i<this.element.length; i++ ){
                        
            var value = this.element[i].value;                           
        }
    }
    else{
                    
        var value = this.element.value;
    }
                
    return value;
}