# Vitascope Tabs
## Description:
Tabs that can control multiple slaves, creating one-to-many relationship between tabs and contents.  And different slaves controlled by respective controllers can be put in one window so only one slave could be showed, simulating many-to-many relationship between tabs and contents.
## Features:
* One Tab clicked, multiple contents are showed
* Different groups of tab clicked, contents are showed on the same window
* Automatic selection
* Hover selection
> Tested on Chrome, Safari, Firefox, Opera, iPhone, iPad, Chrome on Google Nexus.

[Detailed description and more demos](http://www-scf.usc.edu/~wenxiaoz/pw/htmls/projects.html)

## How to use:

### 1.Getting started
Load [jQuery](https://jquery.com/) and include Vitascope-Tabs plugin files

```html
<!-- Include style sheet -->
<link rel="stylesheet" type="text/css" href=" Vitascope-tabs/css/Vitascope-tabs.css" />
<!-- Include JavaScript file -->
<script src=" Vitascope-tabs/js/Vitascope-tabs.js" ></script>
```
### 2.Set up HTML
Vitascope-tabs works on a container controller element with a group of vita-item elements. And the attribute named vita-slaves indicates the ids of slaves this controller will control.
And the slave container with the class vita-slave also contains several vita-item elements. When the nth element of controller is chosen, the respective nth element of slave will be showed.

```html
<ul class="vita-controller" vita-slaves="slave1" >
                <li class="vita-item">Item1</li>
                <li class="vita-item">Item2</li>
                <li class="vita-item">Item3</li>
                <li class="vita-item">Item4</li>
            </ul>
<ul class="vita-controller" id="slave1">
                <li class="vita-item">Content1</li>
                <li class="vita-item">Content2</li>
                <li class="vita-item">Content3</li>
                <li class="vita-item">Content4</li>
            </ul>
```
[Demo](http://www-scf.usc.edu/~wenxiaoz/pw/htmls/projects.html#sample-1)

If multiple slaves are under control, use space to split the ids.

```html
<ul class="vita-controller" vita-slaves="slave1 slave2" >
                <li class="vita-item">Item1</li>
                <li class="vita-item">Item2</li>
                <li class="vita-item">Item3</li>
                <li class="vita-item">Item4</li>
            </ul>
<ul class="vita-controller" id="slave1">
                <li class="vita-item">Content1</li>
                <li class="vita-item">Content2</li>
                <li class="vita-item">Content3</li>
                <li class="vita-item">Content4</li>
            </ul>
<ul class="vita-controller" id="slave2">
                <li class="vita-item">ContentA</li>
                <li class="vita-item">ContentB</li>
                <li class="vita-item">ContentC</li>
                <li class="vita-item">ContentD</li>
            </ul>
```
[Demo](http://www-scf.usc.edu/~wenxiaoz/pw/htmls/projects.html#sample-3)

If two slaves controlled by different controller want to be showed on the same window, set the attribute vita-group to the same name.

```html
<ul class="vita-controller" vita-slaves="slave1" >
                <li class="vita-item">Item1</li>
                <li class="vita-item">Item2</li>
                <li class="vita-item">Item3</li>
                <li class="vita-item">Item4</li>
            </ul>
<ul class="vita-controller" vita-slaves="slave2" >
                <li class="vita-item">ItemA</li>
                <li class="vita-item">ItemB</li>
                <li class="vita-item">ItemC</li>
                <li class="vita-item">ItemD</li>
            </ul>
<div class=”vita-group”>
<ul class="vita-controller" id="slave1" vita-group=”group1”>
                <li class="vita-item">Content1</li>
                <li class="vita-item">Content2</li>
                <li class="vita-item">Content3</li>
                <li class="vita-item">Content4</li>
            </ul>
<ul class="vita-controller" id="slave2" vita-group=”group1”>
                <li class="vita-item">ContentA</li>
                <li class="vita-item">ContentB</li>
                <li class="vita-item">ContentC</li>
                <li class="vita-item">ContentD</li>
            </ul>
```
[Demo](http://www-scf.usc.edu/~wenxiaoz/pw/htmls/projects.html#sample-4)

### 3.Call the plugin

* Initialize:
New VitascopeController(params,element)
There are three parameters:

 Params | meaning 
 --- | --- 
| hover | if set to true, the element will be chosen if it is hovered. The default value is false. |
| click | if set to true, the element will be chosen if it is clicked. The default value is true. |
| autoSelect | if set to true, the first slave will be automatically selected, the default value is false.|if set to true, the first slave will be automatically selected, the default value is false.|

```html
jQuery(function ($) {
        var controller1= new VitascopeController({hover:true,click:true,autoSelect:true},$("#sample-1-controller"));
});
```

* Functions:

Class | function | description 
------|----------|------------
VitascopeController | choose(idx) | choose the idxth item of this controller, the index begins from 0
VitascopeController | cleanAll()  | remove the selected item of this controller
VitascopeSlave      | show(idx)   | show the idxth item of this slave, the index begins from 0
VitascopeSlave      | cleanAll()  | remove the selected item of this slave

```html
jQuery(function ($) {
        var controller1= new VitascopeController({hover:true,click:true,autoSelect:true},$("#sample-1-controller"));
       controller1.choose(1);
});
```

* Event binding:

Bind events with jQuery with standard jQuery event methods .on(), .off(), and .one(). 
The show event is triggered when the element is selected, the event name of the controller element is “show.VitascopeController” and that of the slave element is “show.VitascopeSlave”. And the attribute of event is the index of the element.

```html
jQuery(function ($) {
            var controller= new VitascopeController({autoSelect:true},$("#controller-1"));
             $("#controller-1").on('show.VitascopeController',function (evt) {
             console.log("select "+evt.idx);
             });
});
```

[More Demo](http://www-scf.usc.edu/~wenxiaoz/pw/htmls/projects.html#sample-2)

## License:
The MIT License (MIT)
